import { List } from "../../Utility/List"
import { HtmlCreatorMapper } from "./HtmlCreator"
import { Document } from "../InterfaceLayer/Document"
import { Html_Image } from "./ParagraphElements/Html_Image/Html_Image"
import { Html_ImageMapper } from "./ParagraphElementMappers/Html_ImageMapper"
import { ParagraphElement } from "../InterfaceLayer/ParagraphElements"
import { Html_TextRunMapper } from "./ParagraphElementMappers/Html_TextRunMapper"
import { Html_TextRun } from "./ParagraphElements/Html_TextRun/Html_TextRun"
import { LinkAttributes } from "./HtmlAttributes/LinkAttributes"
import { IHtml_ParagragraphElement, IImageElement, ITextElement } from "./ParagraphElements/Html_ParagraphElements"

function concatStrings(str1:string, str2:string):string{
    return str1.concat(str2)
}

export class HtmlMapper3{
    static createHtml(doc:Document<ParagraphElement>):string{
        return doc.compactMap(paragraphElementToHtml_ParagraphElement).compactMap(Html_ParagraphElementToString).reduce(listToParagraph, " ").trim()

        function listToParagraph(htmlString:string, list:List<string>):string{
            return htmlString.concat( HtmlCreatorMapper.createTag("p", list.reduce(concatStrings)) )
        }
        function paragraphElementToHtml_ParagraphElement(element:ParagraphElement):IHtml_ParagragraphElement{
            return element.type == "image" ? Html_Image.from(element) : Html_TextRun.from(element)
        }
        
        function Html_ParagraphElementToString(element:IHtml_ParagragraphElement):string{
            return element.type == "html_image" ? imageToString(element) : textRunToString(element)
        }
        
        function imageToString(image:IImageElement):string{
            return Html_ImageMapper.toHtml(image, LinkAttributes.from)
        }

        function textRunToString(textRun:ITextElement):string{
            return Html_TextRunMapper.toHtml(textRun, LinkAttributes.from)
        }
    }
}

