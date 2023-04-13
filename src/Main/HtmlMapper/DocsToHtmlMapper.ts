import { List } from "../../Utility/List"
import { HtmlCreatorMapper } from "./HtmlCreator"
import { Document } from "../InterfaceLayer/Document"
import { Html_Image } from "./ParagraphElements/Html_Image"
import { Html_ImageMapper } from "./ParagraphElementMappers/Html_ImageMapper"
import { ParagraphElement } from "../InterfaceLayer/ParagraphElements"
import { Html_TextRunMapper } from "./ParagraphElementMappers/Html_TextRunMapper"
import { Html_TextRun } from "./ParagraphElements/Html_TextRun"
import { LinkAttributes } from "./HtmlAttributes/LinkAttributes"

function concatStrings(str1:string, str2:string):string{
    return str1.concat(str2)
}

export class HtmlMapper3{
    static createHtml(doc:Document<ParagraphElement>):string{
        return doc.compactMap(paragraphElementsToString).reduce(listToParagraph, " ").trim() 

        function listToParagraph(htmlString:string, list:List<string>):string{
            return htmlString.concat( HtmlCreatorMapper.createTag("p", list.reduce(concatStrings)) )
        } 
        function paragraphElementsToString(element: ParagraphElement): string{
            return element.type == "image" ? 
                Html_ImageMapper.toHtml(Html_Image.from(element), LinkAttributes.from) : 
                Html_TextRunMapper.createHtml(Html_TextRun.from(element), LinkAttributes.from)
        }
    }
}