import { SizeInPixels } from "./SizeUnits"

export interface IAttributes{
    src:string
    height:number
    width:number
}

interface Image{
    sourceUrl: string
    size: SizeInPixels
}

export class ImageAttributes implements IAttributes{
    src: string
    height: number
    width: number

    constructor(sourceUrl: string, height: number, width:number){
        this.src = sourceUrl
        this.height = height
        this.width = width
    }

    static of(sourceUrl: string, height: number, width:number):ImageAttributes{
        return new ImageAttributes(sourceUrl, height, width)
    }

    static from(image: Image):ImageAttributes{
        const sourceUrl = image.sourceUrl
        const height = image.size.height
        const width = image.size.width
        return ImageAttributes.of(sourceUrl, height, width)
    }
}