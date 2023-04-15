import { DocsInlineObjectsModel, DocsParagraphElementModel } from "../../Models/DocsDocumentModel"
import { Maybe, MaybeUtility } from "../../../Utility/Maybe"
import { DocsImage, IDocsImage } from "./DocsImage"
import { DocsTextRun, IDocsTextRun } from "./DocsTextRun"

export class DocsParagraphElementMaker{
    static from( element:DocsParagraphElementModel, inlineObj?:DocsInlineObjectsModel ): Maybe<IDocsParagraphElement>{
        return MaybeUtility.orElseGet(
            () => DocsImage.from(element?.inlineObjectElement, inlineObj) as Maybe<IDocsParagraphElement>,
            () => DocsTextRun.from(element?.textRun) as Maybe<IDocsParagraphElement>
        )()
    }
}

export type IDocsParagraphElement = IDocsTextRun | IDocsImage

type IDocsParagraphElementTypes = "textRun" | "image"

export interface IDocsElement<A extends IDocsParagraphElementTypes>{
    type: A
}