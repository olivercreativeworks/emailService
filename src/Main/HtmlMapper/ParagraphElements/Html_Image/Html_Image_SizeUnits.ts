type sizeUnits = "pixel"

interface ISize<unitOfMeasure extends sizeUnits>{
    height:number
    width:number
    unit:unitOfMeasure
}
export type ISizeInPixels = ISize<"pixel">