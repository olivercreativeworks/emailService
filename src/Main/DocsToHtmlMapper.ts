import { DocsDocumentModel, DocsParagraphElementModel, DocsInlineObjectElementModel } from "../Models/DocsDocumentModel";
import { DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel";
import { concatStrings } from "../Models/UtilityFunctions";
import { List } from "../Monads/List";
import { Maybe, curryLiftA2 } from "../Monads/Maybe";
import { bindClassMethodsToClassInstance } from "./Decorator";
import { HtmlCreatorMapper } from "./HtmlCreator";
import { ImageHtmlMapper, createImageHtmlFn, Image } from "./ParagraphElements/Image";
import { DocsDocsDocumentAsMultipleParagraphs, Paragraph, ParagraphElementHtmlMapper, ParagraphHtmlWrapper, wrapInParagraphTagFn } from "./ParagraphElements/ParagraphElements";
import { TextRunHtmlMapper, createTextRunHtmlFn, TextRun } from "./ParagraphElements/TextRun";
import { documentContentToHtmlMapper } from "./src";
import { HtmlParagraph } from "./Email";


export class DocsToHtmlMapper{
    static docToHtml(docsDocument:DocsDocumentModel, mapper:documentContentToHtmlMapper = HtmlMapper3.createHtml):Maybe<HtmlParagraph>{
        return DocsDocsDocumentAsMultipleParagraphs.getParagraphs(docsDocument)
            .map(paragraphs => mapper(paragraphs, docsDocument?.inlineObjects))
    }
    
    static concatDocs(...docs:DocsDocumentModel[]):Maybe<HtmlParagraph>{
        return docsToHtml(docs).map(concatHtml)
        
            function docsToHtml(docs:Array<DocsDocumentModel>):Maybe<List<HtmlParagraph>>{
                return List.fromArr(docs).map(DocsToHtmlMapper.docToHtml).sequence(Maybe.of)
            }
            function concatHtml(lists: List<HtmlParagraph>):HtmlParagraph{
                return lists.reduce(concatStrings)
            }
    }
}

export interface IHtmlMapperConfigObj extends ImageHtmlMapper, TextRunHtmlMapper, ParagraphHtmlWrapper{}


class HtmlMapper3{
    static createHtml(documentContent:List<Paragraph>, imageProps?:DocsInlineObjectsModel, mapper:IHtmlMapperConfigObj = HtmlMapperConfigObj.initializeWithDefaults()):HtmlParagraph{
        return documentContent.map(paragraphToString(mapper, Maybe.of(imageProps)))
            .map(mapper.wrapInParagraphTag)
            .reduce(concatStrings)
        
        function paragraphToString(mapper: ParagraphElementHtmlMapper, imageProps:Maybe<DocsInlineObjectsModel>):(paragraph:Paragraph) => string{
            return (paragraph:Paragraph) => paragraph.map(mapElementToHtml(mapper, imageProps)).reduce(concatStrings)
        }

        function mapElementToHtml(mapper: ParagraphElementHtmlMapper, imageProps:Maybe<DocsInlineObjectsModel>):(paragraphElement: DocsParagraphElementModel) => string {
            return (paragraphElement:DocsParagraphElementModel) => createImageHtml(mapper, paragraphElement, imageProps)
                .orElseGet(() => createTextRunHtml(mapper, paragraphElement).orElse("") );
        }

        function createTextRunHtml(mapper:TextRunHtmlMapper, paragraphElement:DocsParagraphElementModel):Maybe<string>{
            return Maybe.of(paragraphElement?.textRun).map(mapper.createTextRunHtml)
        }

        function createImageHtml(mapper: ImageHtmlMapper, paragraphElement:DocsParagraphElementModel,imageProps:Maybe<DocsInlineObjectsModel>):Maybe<string>{
            return curryLiftA2(mapper.createImageHtml, getInlineObjectElement(paragraphElement), imageProps)
        }

        function getInlineObjectElement(paragraphElement:DocsParagraphElementModel):Maybe<DocsInlineObjectElementModel>{
            return Maybe.of(paragraphElement?.inlineObjectElement)
        }
    }
}


class HtmlMapperConfigObj implements IHtmlMapperConfigObj{
    wrapInParagraphTag: wrapInParagraphTagFn;
    createImageHtml: createImageHtmlFn;
    createTextRunHtml: createTextRunHtmlFn;

    constructor(wrapInParagraphTagFn: wrapInParagraphTagFn, createImageHtmlFn:createImageHtmlFn, createTextRunHtmlFn:createTextRunHtmlFn){
        this.wrapInParagraphTag = wrapInParagraphTagFn
        this.createImageHtml = createImageHtmlFn
        this.createTextRunHtml = createTextRunHtmlFn
    }

    @bindClassMethodsToClassInstance
    static of(wrapInParagraphTagFn: wrapInParagraphTagFn, createImageHtmlFn:createImageHtmlFn, createTextRunHtmlFn:createTextRunHtmlFn):HtmlMapperConfigObj{
        return new HtmlMapperConfigObj(wrapInParagraphTagFn, createImageHtmlFn, createTextRunHtmlFn)
    }
    
    static initializeWithDefaults():HtmlMapperConfigObj{
        return HtmlMapperConfigObj.of(HtmlCreatorMapper.wrapInParagraphTag, Image.toHtml, TextRun.createHtml)
    }
}