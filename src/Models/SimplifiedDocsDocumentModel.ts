import { Maybe, isSomething } from "../Monads/Maybe"
import { List, toList } from "../Monads/List"
import { DocsTextRunModel, DocsDocumentModel, DocsParagraphModel, DocsParagraphElementModel, DocsBodyContentModel } from "./DocsDocumentModel"
import { DocsInlineObjectElementModel, $DocsInlineObjectModel, DocsInlineObjectsModel } from "./DocsInlineObjectModel"
import { InlineImage } from "./DocumentModel"

export interface SimpleDocsDocumentModel{
    textRuns:Maybe<List<List<DocsTextRunModel>>>
}

export class SimplifiedDocsDocument implements SimpleDocsDocumentModel{
    private document:DocsDocumentModel
    
    private constructor(docsDocument: DocsDocumentModel){
        this.document = docsDocument
    }
    
    static of(document:DocsDocumentModel){
        return new SimplifiedDocsDocument(document)
    }

    get inlineObjects():Maybe<DocsInlineObjectsModel>{
        return Maybe.of(this.document.inlineObjects)
    }

    get paragraphElements():Maybe<List<List<DocsParagraphElementModel>>>{
        return this.paragraphs.flatMap(getParagraphElements)
        
        function getParagraphElements(paragraphs:List<DocsParagraphModel>):Maybe<List<List<DocsParagraphElementModel>>>{
            return paragraphs.compactMap(paragraph => 
                Maybe.of(paragraph.elements).map(elements => elements.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>())))
                , isSomething)
                .sequence(Maybe.of)
        }
        
        function getTextRuns(paragraphElements: List<List<DocsParagraphElementModel>>):Maybe<List<List<DocsTextRunModel>>>{
            return paragraphElements.map($getTextRuns).sequence(Maybe.of)
        
            function $getTextRuns(elements: List<DocsParagraphElementModel>): Maybe<List<DocsTextRunModel>>{
                return elements.compactMap( element => Maybe.of(element.textRun), isSomething).sequence(Maybe.of)
            }
        }

        function getInlineObjects(paragraphElements:List<List<DocsParagraphElementModel>>):Maybe<List<List<DocsInlineObjectElementModel>>>{
            return paragraphElements.map($getInlineObjects).sequence(Maybe.of)

            function $getInlineObjects(elements: List<DocsParagraphElementModel>):Maybe<List<DocsInlineObjectElementModel>>{
                return elements.compactMap(element => Maybe.of(element.inlineObjectElement), isSomething).sequence(Maybe.of)
            }
        }

        function getInlineObjectsAndTextRuns(paragraphElements:List<List<DocsParagraphElementModel>>){
            return 
        }
    }

    

    get textRuns():Maybe<List<List<DocsTextRunModel>>>{
        const textRuns = this.paragraphs
            .flatMap(getParagraphElements)
            .flatMap(getTextRuns)
        return textRuns
        
        function getParagraphElements(paragraphs:List<DocsParagraphModel>):Maybe<List<List<DocsParagraphElementModel>>>{
            return paragraphs.compactMap(paragraph => 
                Maybe.of(paragraph.elements).map(elements => elements.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>())))
                , isSomething)
                .sequence(Maybe.of)
        }
        
        function getTextRuns(paragraphElements: List<List<DocsParagraphElementModel>>):Maybe<List<List<DocsTextRunModel>>>{
            return paragraphElements.map($getTextRuns).sequence(Maybe.of)
        
            function $getTextRuns(elements: List<DocsParagraphElementModel>): Maybe<List<DocsTextRunModel>>{
                return elements.compactMap( element => Maybe.of(element.textRun), isSomething).sequence(Maybe.of)
            }
        }

        function getInlineObjects(paragraphElements:List<List<DocsParagraphElementModel>>):Maybe<List<List<DocsInlineObjectElementModel>>>{
            return paragraphElements.map($getInlineObjects).sequence(Maybe.of)

            function $getInlineObjects(elements: List<DocsParagraphElementModel>):Maybe<List<DocsInlineObjectElementModel>>{
                return elements.compactMap(element => Maybe.of(element.inlineObjectElement), isSomething).sequence(Maybe.of)
            }
        }

        function getInlineObjectsAndTextRuns(paragraphElements:List<List<DocsParagraphElementModel>>){
            return 
        }
    }

    private get paragraphs():Maybe<List<DocsParagraphModel>>{
        return this.bodyContent.flatMap(getParagraphs)
        
        function getParagraphs(docsBodyContentList:List<DocsBodyContentModel>):Maybe<List<DocsParagraphModel>>{
            return docsBodyContentList.compactMap( content => Maybe.of(content.paragraph), isSomething ).sequence(Maybe.of)
        }
    }

    private get bodyContent():Maybe<List<DocsBodyContentModel>>{
        return Maybe.of(this.document.body)
            .map(body => body.content)
            .map(bodyContent => bodyContent.reduce(toList, List.fromArr(Array<DocsBodyContentModel>())))
        }       
    }