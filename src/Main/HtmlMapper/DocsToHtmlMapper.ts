import { List } from "../../Utility/List"
import { HtmlCreatorMapper } from "./HtmlCreator"
import { Document } from "../InterfaceLayer/Document"
import { Html_Image } from "./Html_Image"
import { ImageMapper } from "./ImageMapper"
import { ParagraphElement } from "../InterfaceLayer/ParagraphElements"
import { TextRunMapper } from "./TextRunMapper"

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
            return element.type == "image" ? ImageMapper.toHtml(Html_Image.from(element)) : TextRunMapper.createHtml(element)
        }
    }
}