import { DocsInlineObjectSizeModel } from "../../../Models/DocsDocumentModel"

type sizeUnits = "pixel"
interface ISize<unitOfMeasure extends sizeUnits>{
    height:number
    width:number
    unit: unitOfMeasure
}
export type ISizeInPixels = ISize<"pixel">

export class SizeInPixels implements ISizeInPixels{
    height:number
    width:number
    unit: "pixel" = "pixel"

    static of(width:number, height:number):SizeInPixels{
        return new SizeInPixels(width, height)
    }
    static convertDocsSizeToPixelSize(size:DocsInlineObjectSizeModel):SizeInPixels{
        const widthInPoints = size?.width?.magnitude
        const heightInPoints = size?.height?.magnitude
        return SizeInPixels.of( SizeInPixels.convertPointSizetoPixelSize(widthInPoints), SizeInPixels.convertPointSizetoPixelSize(heightInPoints) )
    }
    private static convertPointSizetoPixelSize(pointSize:number):number{
        return pointSize * (4/3)
    }
    constructor(width:number, height:number){
        this.height = height
        this.width = width
    }
}