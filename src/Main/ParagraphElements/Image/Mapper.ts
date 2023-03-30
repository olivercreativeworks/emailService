import { DocsInlineObjectSizeModel } from "../../../Models/DocsDocumentModel"
import { bindClassMethodsToClassInstance } from "../../../Utility/Decorator"
import { IDocsImageMapper, IImageHtmlMapper, DocsImageHtmlMapper } from "./HtmlMapper"
import { SizeInPixels, ISizeInPixels } from "./SizeUnits"
import { IPixelSizeConverter, DocsSizeMapper } from "./SizeUnitsMapper"

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
