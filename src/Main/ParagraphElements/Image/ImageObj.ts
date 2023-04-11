import { DocsInlineObjectSizeModel, DocsInlineObjectElementModel, DocsInlineObjectsModel } from "../../../Models/DocsDocumentModel"
import { Maybe } from "../../../Utility/Maybe"
import { liftA2 } from "../../../Utility/Utility"
import { IElement } from "../ParagraphElements"

export interface IImage extends IElement<"image">{
    sourceUrl:string
    size:DocsInlineObjectSizeModel
    link:Maybe<string>
    type: "image"
}

export class Image implements IImage{
    sourceUrl: string
    size: DocsInlineObjectSizeModel
    link: Maybe<string>
    type: "image"

    constructor(sourceUrl:string, size:DocsInlineObjectSizeModel, link?:string){
        this.sourceUrl = sourceUrl
        this.size = size
        this.link = Maybe.of(link)
        this.type = "image"
    }

    static of(sourceUrl:string, size:DocsInlineObjectSizeModel, link?:string):Image{
        return new Image(sourceUrl, size, link)
    }

    static from(inlineImage: DocsInlineObjectElementModel, props:DocsInlineObjectsModel = {}):Maybe<Image>{
        const objProps = props[inlineImage?.inlineObjectId]?.inlineObjectProperties
        const sourceUrl = objProps?.embeddedObject?.imageProperties?.contentUri
        const size = objProps?.embeddedObject?.size
        const link = inlineImage?.textStyle?.link?.url
        return liftA2(
            (sourceUrl:string) => (size:DocsInlineObjectSizeModel) => Image.of(sourceUrl, size, link), 
            Maybe.of(sourceUrl), 
            Maybe.of(size)
        )
    }
}
