import { DocsInlineObjectsModel, DocsParagraphElementModel } from "../../Models/DocsDocumentModel"
import { Maybe, MaybeUtility } from "../../Utility/Maybe"
import { Image, IImage } from "./ImageObj"
import { TextRun, ITextRun } from "./TextRun"

export class ParagraphElementMaker{
    static from( element:DocsParagraphElementModel, inlineObj?:DocsInlineObjectsModel ): Maybe<ParagraphElement>{
        return MaybeUtility.orElseGet(
            () => Image.from(element?.inlineObjectElement, inlineObj) as Maybe<ParagraphElement>,
            () => TextRun.from(element?.textRun) as Maybe<ParagraphElement>
        )()
    }
}

export type ParagraphElement = ITextRun | IImage

type ParagraphElementTypes = "textRun" | "image"

export interface IElement<A extends ParagraphElementTypes>{
    type: A
}