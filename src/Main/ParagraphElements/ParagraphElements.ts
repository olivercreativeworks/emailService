import { DocsParagraphElementModel, DocsDocumentModel, DocsParagraphModel, DocsBodyContentModel } from "../../Models/DocsDocumentModel"
import { List, reduceToList } from "../../Utility/List"
import { Maybe, isSomething } from "../../Utility/Maybe"
import { HtmlParagraph } from "../HtmlCreator"
import { ImageHtmlMapper } from "./Image/HtmlMapper"
import { TextRunHtmlMapper } from "./TextRun/Mapper"



export type Paragraph = List<DocsParagraphElementModel>

export type ParagraphElementHtmlMapper = ImageHtmlMapper & TextRunHtmlMapper


export class DocsDocsDocumentAsMultipleParagraphs{
    static getParagraphs(docsDocument: DocsDocumentModel):Maybe<List<Paragraph>>{
        return getBodyContent(docsDocument)
            .flatMap(toParagraphs)
            .flatMap(toParagraphElements)
        
        function toParagraphElements(paragraphs: List<DocsParagraphModel>): Maybe<List<List<DocsParagraphElementModel>>>{
            return paragraphs.compactMap(toElements, isSomething).sequence(Maybe.of)

            function toElements(paragraph:DocsParagraphModel):Maybe<List<DocsParagraphElementModel>>{
                return Maybe.of(paragraph?.elements).map(reduceToList)
            }
        }

        function getBodyContent(docsDocument:DocsDocumentModel): Maybe<List<DocsBodyContentModel>>{
            return Maybe.of(docsDocument?.body?.content).map(reduceToList)
        }

        function toParagraphs (bodyContent: List<DocsBodyContentModel>): Maybe<List<DocsParagraphModel>>{
            return bodyContent.compactMap(content => Maybe.of(content?.paragraph), isSomething).sequence(Maybe.of)
        }
    }
}

export type wrapInParagraphTagFn = (text:string) => HtmlParagraph


export interface ParagraphHtmlWrapper{
    wrapInParagraphTag: wrapInParagraphTagFn
}