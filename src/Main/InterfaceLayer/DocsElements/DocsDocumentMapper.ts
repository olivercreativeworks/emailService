import { List } from "../../../Utility/List"
import { Maybe, MaybeUtility } from "../../../Utility/Maybe"
import { DocsDocumentModel, DocsParagraphElementModel, DocsInlineObjectsModel } from "../../Models/DocsDocumentModel"
import { DocsDocsDocument } from "./DocsDocsDocument"
import { DocsDocument } from "./DocsDocument"
import { IDocsParagraphElement, DocsParagraphElementMaker } from "./ParagraphElements"

export class DocsDocumentMapper{
    static from(doc:DocsDocumentModel):Maybe<DocsDocument<IDocsParagraphElement>>{
        const docs = DocsDocsDocument.of(doc)
        return createDocument( docs.elements, docs.inlineImageObj ).flatMap(toParagraphElements)

        function createDocument(elements:Maybe<List<List<DocsParagraphElementModel>>>, inlineObj:Maybe<DocsInlineObjectsModel>): Maybe<DocsDocument<DocsParagraphElementModel>>{
            return elements.map(elements => DocsDocument.fromList(elements, inlineObj.unsafeUnwrap()))
        }  

        function toParagraphElements(document:DocsDocument<DocsParagraphElementModel>):Maybe<DocsDocument<IDocsParagraphElement>>{
            return document.compactMapWithInlineObj($toParagraphElements, MaybeUtility.isSomething).sequence(Maybe.of, Maybe.of)
            
            function $toParagraphElements(inlineObj:DocsInlineObjectsModel):(element:DocsParagraphElementModel) => Maybe<IDocsParagraphElement>{
                return (element:DocsParagraphElementModel) => DocsParagraphElementMaker.from(element, inlineObj)
            }
        }
    } 
}