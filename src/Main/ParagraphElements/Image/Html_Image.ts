import { Maybe } from "../../../Utility/Maybe"
import { IImage } from "./ImageObj"
import { SizeInPixels } from "./SizeUnits"

interface PixelImage{
    sourceUrl:string
    size:SizeInPixels
    link:Maybe<string>
}

export class Html_Image implements PixelImage{
    sourceUrl: string
    size: SizeInPixels
    link: Maybe<string>

    constructor(sourceUrl:string, size:SizeInPixels, link?:string){
        this.sourceUrl = sourceUrl
        this.size = size
        this.link = Maybe.of(link)
    }

    static of(sourceUrl:string, size:SizeInPixels, link?:string):Html_Image{
        return new Html_Image(sourceUrl, size, link)
    }

    static from(image:IImage):Html_Image{
        return Html_Image.of(image.sourceUrl, SizeInPixels.convertDocsSizeToPixelSize(image.size), image.link.unsafeUnwrap())
    }
}