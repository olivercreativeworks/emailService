import { DocsDocumentModel, DocsParagraphElementModel, DocsInlineObjectsModel, DocsBodyContentModel } from "../../Models/DocsDocumentModel"
import { List } from "../../Utility/List"
import { Maybe, MaybeUtility } from "../../Utility/Maybe"
import { Document } from "./Document"
import { ParagraphElement, ParagraphElementMaker } from "./ParagraphElements"


export class DocsDocument{
    static createDocsDocument<A>(doc:DocsDocumentModel):Maybe<Document<ParagraphElement>>{
        return $createDocument( getElements(doc), getInlineObj(doc) ).flatMap(toParagraphElements)

        function $createDocument(elements:Maybe<List<List<DocsParagraphElementModel>>>, inlineObj:Maybe<DocsInlineObjectsModel>): Maybe<Document<DocsParagraphElementModel>>{
            return elements.map(elements => Document.fromList(elements, inlineObj.unsafeUnwrap()))
        }
        
        function getInlineObj(doc:DocsDocumentModel):Maybe<DocsInlineObjectsModel>{
            return Maybe.of(doc?.inlineObjects)
        }
        
        function getElements(doc:DocsDocumentModel):Maybe<List<List<DocsParagraphElementModel>>>{
            return getContent(doc).flatMap($getElements)

            function $getElements(contentList:List<DocsBodyContentModel>):Maybe<List<List<DocsParagraphElementModel>>>{
                return contentList.compactMap(content => Maybe.of(content?.paragraph?.elements).map(List.fromArr), MaybeUtility.isSomething).sequence(Maybe.of)
            }
            function getContent(doc:DocsDocumentModel):Maybe<List<DocsBodyContentModel>>{
                return Maybe.of(doc?.body?.content).map(List.fromArr)
            }
        }

        function toParagraphElements(document:Document<DocsParagraphElementModel>):Maybe<Document<ParagraphElement>>{
            return document.compactMapWithInlineObj($toParagraphElements, MaybeUtility.isSomething).sequence(Maybe.of, Maybe.of)
            
            function $toParagraphElements(inlineObj:DocsInlineObjectsModel):(element:DocsParagraphElementModel) => Maybe<ParagraphElement>{
                return (element:DocsParagraphElementModel) => ParagraphElementMaker.from(element, inlineObj)
            }
        }
    } 
}












