import { HtmlCreatorMapper } from "./HtmlCreator"
import { ImageAttributes } from "./ImageAttributes"
import { Html_Image } from "./Html_Image"
import { LinkAttributes } from "./LinkAttributes"

export class ImageMapper{
    static toHtml(image:Html_Image):string{
        return HtmlCreatorMapper.createLinkTagElseDefault(null, image.link.map(LinkAttributes.from).unsafeUnwrap(), "img", ImageAttributes.from(image))
        // const imgTag = HtmlCreatorMapper.createTag("img", null, ImageAttributes.from(image))
        // return image.link.map(link => HtmlCreatorMapper.createTag("a", imgTag, LinkAttributes.from(link))).orElse(imgTag)
    }
}