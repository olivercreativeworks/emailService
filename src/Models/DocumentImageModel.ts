import { Maybe } from "../Monads/Maybe"
import { DocsEmbeddedObjectModel } from "./DocsInlineObjectModel"
import { OptionalProps } from "./UtilityTypes"
import { DocsInlineObjectsModel } from "./DocsInlineObjectModel"
import { DocsInlineObjectElementModel } from "./DocsDocumentModel"

export interface IInlineImage{
    imageSourceUrl:Maybe<string>
    url:Maybe<string>
    size:Maybe<IPixelDimensions>
}
// export interface IInlineImage{
//     imageSourceUrl:Maybe<string>
//     url:Maybe<string>
//     size:Maybe<IImageDimensions<SizeUnit>>
// }



export interface IImageDimensions<Unit extends SizeUnit>{
    width: ISize<Unit>
    height:ISize<Unit>
}

interface ISize<UnitOfMeasure extends SizeUnit>{ 
    magnitude:number
    unit:UnitOfMeasure
}

const SizeUnitSource = {
    pixel: "pixel",
    PT: "PT"
} as const

export type SizeUnit = keyof typeof SizeUnitSource
type SpecificSizeUnit<A extends SizeUnit> =   Extract<SizeUnit, A>

type Point = SpecificSizeUnit<"PT">
type Pixel = SpecificSizeUnit<"pixel">


export type IPixelDimensions = IImageDimensions<Pixel>

export class PixelSize implements ISize<Pixel>{
    magnitude: number
    unit: Pixel = "pixel"

    constructor(magnitude:number){
        this.magnitude = magnitude
    }

    static of(magnitude: number): PixelSize{
        return new PixelSize(magnitude)
    }
    
    static fromPoint(size:ISize<Point>):PixelSize{
        return PixelSize.of(size.magnitude * (4/3))
    }
}

type IPointDimensions = IImageDimensions<Point>

export class PixelDimensions implements IPixelDimensions{
    width: ISize<Pixel>
    height: ISize<Pixel>

    constructor(width:ISize<Pixel>, height:ISize<Pixel>){
        this.width = width
        this.height = height
    }

    static of(width:number, height:number, pixelMapper:(magnitude:number) => ISize<Pixel> = PixelSize.of):IPixelDimensions{
        return new PixelDimensions(pixelMapper(width), pixelMapper(height))
    }
    static fromPointDimensions(pointDimensions:IPointDimensions, pixelMapper:(pointSize:ISize<Point>) => ISize<Pixel> = PixelSize.fromPoint):IPixelDimensions{
        return new PixelDimensions( pixelMapper(pointDimensions.width), pixelMapper(pointDimensions.height) )
    }
}

type InlineImageOptions= OptionalProps<IInlineImage>
interface IInlineImageOptions extends InlineImageOptions{
}

export class InlineImage implements IInlineImage{
    imageSourceUrl: Maybe<string>
    url: Maybe<string>
    size: Maybe<IPixelDimensions>

    constructor(imageSourceUrl:string, options:IInlineImageOptions){
        this.imageSourceUrl = Maybe.of(imageSourceUrl)
        this.url = Maybe.of(options.url)
        this.size = Maybe.of(options.size)
    }

    static of(imageSourceUrl:string, options:IInlineImageOptions={}):InlineImage{
        return new InlineImage(imageSourceUrl, options)
    }    
}

type PointToPixelMapper = (pointDimensions: IPointDimensions) => IPixelDimensions

export class InlineImageOptionsMapper implements IInlineImageOptions{
    imageSourceUrl?: string
    url?: string
    size?: IPixelDimensions
    
    private constructor(imageSourceUrl:string, url:string, size:IPixelDimensions){
        this.imageSourceUrl = imageSourceUrl
        this.url = url
        this.size = size
    }

    static fromDocs(inlineObjectsModel:DocsInlineObjectsModel, inlineObjectElement:DocsInlineObjectElementModel, pointToPixelMapper:PointToPixelMapper = PixelDimensions.fromPointDimensions): Maybe<IInlineImageOptions>{
        const embeddedObject = InlineImageOptionsMapper.getEmbeddedObject(inlineObjectsModel, inlineObjectElement)
        return embeddedObject.map( embeddedObj => InlineImageOptionsMapper.mapToOptions(embeddedObj, inlineObjectElement, pointToPixelMapper))
    }

    private static getEmbeddedObject(inlineObjectsModel: DocsInlineObjectsModel, inlineObjectElement:DocsInlineObjectElementModel): Maybe<DocsEmbeddedObjectModel>{
        const objectId = inlineObjectElement?.inlineObjectId
        return Maybe.of(objectId).map(id => inlineObjectsModel[id]?.inlineObjectProperties?.embeddedObject)
    }
    
    private static mapToOptions(embeddedObject:DocsEmbeddedObjectModel, inlineObjectElement:DocsInlineObjectElementModel, pointToPixelMapper:PointToPixelMapper): IInlineImageOptions{
        const url = inlineObjectElement?.textStyle?.link?.url
        const imageSourceUrl = embeddedObject?.imageProperties?.contentUri
        const size = Maybe.of(embeddedObject?.size).map(pointToPixelMapper).unsafeUnwrap()
        return new InlineImageOptionsMapper(imageSourceUrl, url, size)
    } 
}