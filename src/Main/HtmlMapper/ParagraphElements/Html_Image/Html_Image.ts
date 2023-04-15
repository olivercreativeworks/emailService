import { Maybe } from "../../../../Utility/Maybe"
import { IHtml_ParagraphElementType } from "../Html_ParagraphElements"
import { ISizeInPixels } from "./Html_Image_SizeUnits"

export interface IHtml_Image{
    sourceUrl:string
    size:ISizeInPixels
    link:Maybe<string>
}

export class Html_Image implements IHtml_Image, IHtml_ParagraphElementType<"html_image">{
    sourceUrl: string
    size: ISizeInPixels
    link: Maybe<string>
    type: "html_image"

    constructor(sourceUrl:string, size:ISizeInPixels, link:Maybe<string>){
        this.sourceUrl = sourceUrl
        this.size = size
        this.link = link
        this.type = "html_image"
    }

    static of(sourceUrl:string, size:ISizeInPixels, link:Maybe<string>):Html_Image{
        return new Html_Image(sourceUrl, size, link)
    }
}