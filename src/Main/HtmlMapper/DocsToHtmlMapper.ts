import { List } from "../../Utility/List"
import { HtmlCreatorMapper } from "./HtmlCreator"
import { Document } from "../InterfaceLayer/Document"
import { ParagraphElement } from "../InterfaceLayer/ParagraphElements"
import { Html_ParagraphElement, IHtml_ParagragraphElement } from "./ParagraphElements/Html_ParagraphElements"
import { Html_ParagraphElementMapper } from "./ParagraphElementMappers/Html_ParagraphElementMapper"

function concatStrings(str1:string, str2:string):string{
    return str1.concat(str2)
}

export class HtmlMapper3{
    static createHtml(doc:Document<ParagraphElement>):string{
        return doc.compactMap(Html_ParagraphElement.from).compactMap(Html_ParagraphElementMapper.toHtml).reduce(listToParagraph, " ").trim()

        function listToParagraph(htmlString:string, list:List<string>):string{
            return htmlString.concat( HtmlCreatorMapper.createTag("p", list.reduce(concatStrings)) )
        }
    }
}

