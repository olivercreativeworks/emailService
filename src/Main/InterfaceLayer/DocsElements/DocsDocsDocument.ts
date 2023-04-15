import { List } from "../../../Utility/List"
import { Maybe, MaybeUtility } from "../../../Utility/Maybe"
import { DocsDocumentModel, DocsParagraphElementModel, DocsBodyContentModel, DocsInlineObjectsModel } from "../../Models/DocsDocumentModel"

export interface IDocsDocsDocument{
    doc:DocsDocumentModel
    elements: Maybe<List<List<DocsParagraphElementModel>>>
    inlineImageObj: Maybe<DocsInlineObjectsModel>
}

export class DocsDocsDocument implements IDocsDocsDocument{
    doc: DocsDocumentModel

    constructor(doc: DocsDocumentModel){
        this.doc = doc
    }

    static of(doc:DocsDocumentModel):DocsDocsDocument{
        return new DocsDocsDocument(doc)
    }

    get elements():Maybe<List<List<DocsParagraphElementModel>>>{
        return getContent(this.doc).flatMap($getElements)

        function $getElements(contentList:List<DocsBodyContentModel>):Maybe<List<List<DocsParagraphElementModel>>>{
            return contentList.compactMap($$getElements, MaybeUtility.isSomething).sequence(Maybe.of)
        }
        function getContent(doc:DocsDocumentModel):Maybe<List<DocsBodyContentModel>>{
            return Maybe.of(doc.body?.content).map(List.fromArr)
        }

        function $$getElements(content:DocsBodyContentModel):Maybe<List<DocsParagraphElementModel>>{
            return Maybe.of(content.paragraph?.elements).map(List.fromArr)
        }
    }

    get inlineImageObj(): Maybe<DocsInlineObjectsModel>{
        return Maybe.of(this.doc.inlineObjects)
    }
}