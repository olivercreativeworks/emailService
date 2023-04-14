import { Maybe } from "../../../../Utility/Maybe"
import { IImage } from "../../../InterfaceLayer/ImageObj"
import { IHtml_ParagraphElementType } from "../Html_ParagraphElements"
import { SizeInPixels } from "./Html_Image_SizeUnits"

export interface IHtml_Image{
    sourceUrl:string
    size:SizeInPixels
    link:Maybe<string>
}

export class Html_Image implements IHtml_Image, IHtml_ParagraphElementType<"html_image">{
    sourceUrl: string
    size: SizeInPixels
    link: Maybe<string>
    type: "html_image"

    constructor(sourceUrl:string, size:SizeInPixels, link?:string){
        this.sourceUrl = sourceUrl
        this.size = size
        this.link = Maybe.of(link)
        this.type = "html_image"
    }

    static of(sourceUrl:string, size:SizeInPixels, link?:string):Html_Image{
        return new Html_Image(sourceUrl, size, link)
    }

    static from(image:IImage):Html_Image{
        return Html_Image.of(image.sourceUrl, SizeInPixels.convertDocsSizeToPixelSize(image.size), image.link.unsafeUnwrap())
    }
}