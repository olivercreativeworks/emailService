import { HtmlCreatorMapper } from "../HtmlCreator/HtmlCreator"
import { ImageAttributes } from "../HtmlAttributes/ImageAttributes"
import { IHtml_Image } from "../ParagraphElements/Html_Image/Html_Image"
import { ILinkAttributes } from "../HtmlAttributes/LinkAttributes"

type LinkAttributesFn = (link:string) => ILinkAttributes

export class Html_ImageMapper{
    static toHtml(image:IHtml_Image, createLinkAttributes:LinkAttributesFn):string{
        const imgTag = HtmlCreatorMapper.createTag("img", null, ImageAttributes.from(image))
        const linkAttributes = image.link.map(createLinkAttributes)
        const htmlOutput = HtmlCreatorMapper.createLinkTagElseDefault(imgTag, linkAttributes)
        return htmlOutput
    }
}