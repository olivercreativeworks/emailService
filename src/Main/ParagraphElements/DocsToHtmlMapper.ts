import { List } from "../../Utility/List"
import { HtmlCreatorMapper } from "../HtmlCreator"
import { Document } from "./Document"
import { Html_Image } from "./Image/Html_Image"
import { ImageMapper } from "./Image/Mapper"
import { ParagraphElement } from "./ParagraphElements"
import { TextRunMapper } from "./TextRun/Mapper"

function concatStrings(str1:string, str2:string):string{
    return str1.concat(str2)
}

export class HtmlMapper3{
    static createHtml(doc:Document<ParagraphElement>):string{
        return doc.compactMap(paragraphElementsToString).reduce(listToParagraph, " ").trim() 

        function listToParagraph(htmlString:string, list:List<string>):string{
            return htmlString.concat( HtmlCreatorMapper.wrapInParagraphTag(list.reduce(concatStrings)) )
        } 
        function paragraphElementsToString(element: ParagraphElement): string{
            return element.type == "image" ? ImageMapper.toHtml(Html_Image.from(element)) : TextRunMapper.createHtml(element)
        }
    }
}