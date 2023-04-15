import { List } from "../../../Utility/List"
import { HtmlCreatorMapper } from "../../HtmlMapper/HtmlCreator/HtmlCreator"
import { Html_ParagraphElementMapper } from "../../HtmlMapper/ParagraphElementMappers/Html_ParagraphElementMapper"
import { IHtml_ParagragraphElement } from "../../HtmlMapper/ParagraphElements/Html_ParagraphElements"

export class DocsStringMapper{
    static elementsToHtml(elements:IHtml_ParagragraphElement):string{
        return Html_ParagraphElementMapper.toHtml(elements)
    }
    static paragraphsToHtml(htmlString:string, paragraphs:List<string>):string{
        return htmlString.concat( HtmlCreatorMapper.createTag("p", paragraphs.reduce(concatStrings)) )
        
        function concatStrings(str1:string, str2:string):string{
            return str1.concat(str2)
        }
    }
}