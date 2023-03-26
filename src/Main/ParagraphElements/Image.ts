import { DocsInlineObjectElementModel } from "../../Models/DocsDocumentModel"
import { DocsInlineObjectsModel, DocsEmbeddedObjectModel, DocsInlineObjectSizeModel } from "../../Models/DocsInlineObjectModel"
import { Maybe, curryLiftA2, curryA2 } from "../../Monads/Maybe"
import { bindClassMethodsToClassInstance } from "../Decorator"
import { HtmlCreatorMapper } from "../HtmlCreator"
import { IHtmlLinkTagCreator } from "./TextRun"


export class Image{
    sourceUrl:Maybe<string>
    size:Maybe<SizeInPixels>
    link:Maybe<string>

    static toHtml(inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel, mapper:IDocsImageMapper = DocsImageMapper.initialzeWithDefaults()):string{
        const image = Image.of(inlineObj, imageProps, mapper)
        const imageHtml = wrapInImageTag(mapper, image.sourceUrl, image.size)
            .map(imgHtml => wrapInLinkTag(mapper, image.link, Maybe.of(imgHtml)).orElse(imgHtml))
            .orElse(`<img></img>`)
        return imageHtml
    }

    static of(inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel, mapper:IPixelSizeConverter):Image{
        const image = getDocsImage(inlineObj, imageProps)
        const sourceUrl = image.flatMap(getSourceUrl).unsafeUnwrap()
        const size = image.flatMap(image => getSizeInPixels(mapper, image)).unsafeUnwrap()
        const link = getLink(inlineObj).unsafeUnwrap()
        return new Image(sourceUrl, size, link)
    }

    constructor(sourceUrl?:string, size?:SizeInPixels, link?:string){
        this.sourceUrl = Maybe.of(sourceUrl)
        this.size = Maybe.of(size)
        this.link = Maybe.of(link)
    }
}

function wrapInLinkTag(mapper:IHtmlLinkTagCreator, link:Maybe<string>, html:Maybe<string>):Maybe<string>{
    return curryLiftA2(mapper.wrapInLinkTag, link, html)
}
function wrapInImageTag(mapper: IHtmlImageTagCreator, sourceUrl:Maybe<string>, size:Maybe<SizeInPixels> ):Maybe<string>{
    return curryLiftA2(mapper.wrapInImageTag, sourceUrl, size)
}

function getLink(inlineObj:DocsInlineObjectElementModel):Maybe<string>{
    return Maybe.of(inlineObj?.textStyle?.link?.url)
}
function getSourceUrl(embeddedObj:DocsEmbeddedObjectModel):Maybe<string>{
    return Maybe.of(embeddedObj?.imageProperties?.contentUri)
}
    
function getDocsImage(inlineObj:DocsInlineObjectElementModel, imageProps:DocsInlineObjectSizeModel ):Maybe<DocsEmbeddedObjectModel>{
    return Maybe.of(inlineObj?.inlineObjectId).map(id => imageProps[id]?.inlineObjectProperties?.embeddedObject)
}

function getSizeInPixels(mapper:IPixelSizeConverter, embeddedObj:DocsEmbeddedObjectModel): Maybe<SizeInPixels>{
    return Maybe.of(embeddedObj?.size).map(mapper.convertDocsSizeToPixelSize)
}


export class DocsImageMapper implements IDocsImageMapper{
    htmlMapper:IImageHtmlMapper
    sizeMapper: IPixelSizeConverter

    @bindClassMethodsToClassInstance
    static of(htmlMapper:IImageHtmlMapper, sizeMapper: IPixelSizeConverter):DocsImageMapper{
        return new DocsImageMapper(htmlMapper, sizeMapper)
    }

    static initialzeWithDefaults():DocsImageMapper{
        return DocsImageMapper.of(DocsImageHtmlMapper.initializeWithDefaults(), DocsSizeMapper.initializeWithDefaults())
    }

    private constructor(htmlMapper:IImageHtmlMapper, sizeMapper: IPixelSizeConverter){
        this.htmlMapper = htmlMapper
        this.sizeMapper = sizeMapper
    }
    wrapInLinkTag(link:string, text:string): string{
        return this.htmlMapper.wrapInLinkTag(link, text)
    }
    wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string{
        return this.htmlMapper.wrapInImageTag(sourceUrl, sizeInPixels)
    }
    convertDocsSizeToPixelSize(size: DocsInlineObjectSizeModel): ISizeInPixels {
        return this.sizeMapper.convertDocsSizeToPixelSize(size)
    }
}

export type sizeUnits = "pixel"
export interface ISize<unitOfMeasure extends sizeUnits>{
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

export type createImageHtmlFn = (inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel) => string
export interface ImageHtmlMapper{
    createImageHtml:createImageHtmlFn
}


export type createLinkTagFn = (link:string, text:string) => string
export type createImageTagFn = (sourceUrl:string, sizeInPixels:SizeInPixels) => string

export interface IDocsImageMapper extends IImageHtmlMapper, IPixelSizeConverter{}
export interface IImageHtmlMapper extends IHtmlLinkTagCreator, IHtmlImageTagCreator{}
export interface IHtmlImageTagCreator{
    wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string
}
export class DocsImageHtmlMapper implements IImageHtmlMapper{
    wrapInImageTag:createImageTagFn
    wrapInLinkTag: createLinkTagFn
    
    private constructor(createImageTag:createImageTagFn, createLinkTag:createLinkTagFn){
        this.wrapInImageTag = createImageTag
        this.wrapInLinkTag = createLinkTag
    }
    static of(createImageTag:createImageTagFn, createLinkTag:createLinkTagFn):DocsImageHtmlMapper{
        return new DocsImageHtmlMapper(createImageTag, createLinkTag)
    }

    static initializeWithDefaults():DocsImageHtmlMapper{
        return DocsImageHtmlMapper.of(HtmlCreatorMapper.wrapInImageTag, HtmlCreatorMapper.wrapInLinkTag)
    }
}

export class DocsSizeMapper implements IPixelSizeConverter{
    convertDocsSizeToPixelSize: convertDocsSizeToPixelSizeFn

    private constructor(convertDocsSizeToPixelSizeFn:convertDocsSizeToPixelSizeFn){
        this.convertDocsSizeToPixelSize = convertDocsSizeToPixelSizeFn
    }
    static of(convertDocsSizeToPixelSizeFn:convertDocsSizeToPixelSizeFn):DocsSizeMapper{
        return new DocsSizeMapper(convertDocsSizeToPixelSizeFn)
    }

    static initializeWithDefaults():DocsSizeMapper{
        return DocsSizeMapper.of(SizeInPixels.convertDocsSizeToPixelSize)
    }
}

export type convertDocsSizeToPixelSizeFn = (size: DocsInlineObjectSizeModel) => ISizeInPixels

export interface IPixelSizeConverter{
    convertDocsSizeToPixelSize(size:DocsInlineObjectSizeModel):ISizeInPixels
}
