import { DocsInlineObjectsModel, DocsParagraphElementModel } from "../../Models/DocsDocumentModel"
import { Maybe, orElseGet } from "../../Utility/Maybe"
import { Image, IImage } from "./Image/ImageObj"
import { TextRun, ITextRun } from "./TextRun/TextRun"

export class ParagraphElementMaker{
    static from( element:DocsParagraphElementModel, inlineObj?:DocsInlineObjectsModel ): Maybe<ParagraphElement>{
        return orElseGet(
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