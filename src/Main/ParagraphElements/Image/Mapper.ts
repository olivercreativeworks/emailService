import { HtmlImage, HtmlLink, HtmlCreatorMapper } from "../../HtmlCreator"
import { ImageAttributes } from "./Attributes"
import { Html_Image } from "./Html_Image"

export class ImageMapper{
    static toHtml(image:Html_Image):HtmlImage | HtmlLink{
        const imgTag = HtmlCreatorMapper.createImageTag(ImageAttributes.from(image))
        return image.link.map(link => HtmlCreatorMapper.wrapInLinkTag(link, imgTag)).orElse(imgTag)
    }
}