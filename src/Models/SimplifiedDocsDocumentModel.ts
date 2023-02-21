import { Maybe, isSomething } from "../Monads/Maybe"
import { List, toList } from "../Monads/List"
import { DocsTextRunModel, DocsDocumentModel, DocsParagraphModel, DocsParagraphElementModel, DocsBodyContentModel } from "./DocsDocumentModel"

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