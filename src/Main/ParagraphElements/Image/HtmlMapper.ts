import { DocsInlineObjectElementModel, DocsInlineObjectsModel } from "../../../Models/DocsDocumentModel"
import { HtmlCreatorMapper } from "../../HtmlCreator"
import { IHtmlLinkTagCreator } from "../TextRun/Mapper"
import { SizeInPixels } from "./SizeUnits"
import { IPixelSizeConverter } from "./SizeUnitsMapper"

export type createLinkTagFn = (link:string, text:string) => string
export type createImageTagFn = (sourceUrl:string, sizeInPixels:SizeInPixels) => string


export type createImageHtmlFn = (inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel) => string
export interface ImageHtmlMapper{
    createImageHtml:createImageHtmlFn
}

export interface IDocsImageMapper extends IImageHtmlMapper, IPixelSizeConverter{}
export interface IImageHtmlMapper extends IHtmlLinkTagCreator, IHtmlImageTagCreator{}
export interface IHtmlImageTagCreator{
    wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string
}

export class DocsImageHtmlMapper implements IImageHtmlMapper{
    wrapInImageTag: createImageTagFn
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


