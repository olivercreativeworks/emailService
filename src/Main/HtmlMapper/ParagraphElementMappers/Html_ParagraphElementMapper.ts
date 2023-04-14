import { LinkAttributes } from "../HtmlAttributes/LinkAttributes";
import { IHtml_ParagragraphElement, IImageElement, ITextElement } from "../ParagraphElements/Html_ParagraphElements";
import { Html_ImageMapper } from "./Html_ImageMapper";
import { Html_TextRunMapper } from "./Html_TextRunMapper";

export class Html_ParagraphElementMapper{
    static toHtml(element:IHtml_ParagragraphElement):string{
        return element.type == "html_image" ? imageToString(element) : textRunToString(element)

        function imageToString(image:IImageElement):string{
            return Html_ImageMapper.toHtml(image, LinkAttributes.from)
        }

        function textRunToString(textRun:ITextElement):string{
            return Html_TextRunMapper.toHtml(textRun, LinkAttributes.from)
        }
    }
}