import { DocsInlineObjectSizeModel, DocsInlineObjectElementModel, DocsInlineObjectsModel } from "../../Models/DocsDocumentModel"
import { Maybe } from "../../../Utility/Maybe"
import { Utility } from "../../../Utility/Utility"
import { IDocsElement as IDocsElement } from "./ParagraphElements"

export interface IDocsImage extends IDocsElement<"image">{
    sourceUrl:string
    size:DocsInlineObjectSizeModel
    link:Maybe<string>
    type: "image"
}

export class DocsImage implements IDocsImage{
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

    static of(sourceUrl:string, size:DocsInlineObjectSizeModel, link?:string):DocsImage{
        return new DocsImage(sourceUrl, size, link)
    }

    static from(inlineImage: DocsInlineObjectElementModel, props:DocsInlineObjectsModel = {}):Maybe<DocsImage>{
        const objProps = props[inlineImage?.inlineObjectId]?.inlineObjectProperties
        const sourceUrl = objProps?.embeddedObject?.imageProperties?.contentUri
        const size = objProps?.embeddedObject?.size
        const link = inlineImage?.textStyle?.link?.url
        return Utility.liftA2(
            (sourceUrl:string) => (size:DocsInlineObjectSizeModel) => DocsImage.of(sourceUrl, size, link), 
            Maybe.of(sourceUrl), 
            Maybe.of(size)
        )
    }
}
