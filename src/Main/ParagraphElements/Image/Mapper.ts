import { DocsInlineObjectElementModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel } from "../../../Models/DocsDocumentModel"
import { bindClassMethodsToClassInstance } from "../../../Utility/Decorator"
import { Maybe, curryLiftA2 } from "../../../Utility/Maybe"
import { HtmlImage, HtmlLink } from "../../HtmlCreator"
import { createImageHtmlFn, createLinkTagFn, DocsImageHtmlMapper, IDocsImageMapper, IHtmlImageTagCreator, IImageHtmlMapper } from "./HtmlMapper"
import { IImage, Image } from "./ImageObj"
import { ISizeInPixels, SizeInPixels } from "./SizeUnits"
import { IPixelSizeConverter, DocsSizeMapper } from "./SizeUnitsMapper"

type createImageTagFn = (sourceUrl:string, sizeInPixels:SizeInPixels) => HtmlImage

class ImageMapper{
    static toHtml(image:IImage, createImageTagFn:createImageTagFn, createLinkTagFn:createLinkTagFn):string{
        const imageHtml = curryLiftA2(createImageTagFn, image.sourceUrl, image.size)
        return curryLiftA2(createLinkTagFn, image.link, imageHtml).orElseGet(() => imageHtml.orElse(""))
    }
}
