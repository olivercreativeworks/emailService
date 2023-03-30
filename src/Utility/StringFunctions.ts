import { HtmlParagraph } from "../Main/HtmlCreator";

export function concatStrings(str1:HtmlParagraph, str2:HtmlParagraph):HtmlParagraph
export function concatStrings(str1:string, str2:string):string{
    return str1.concat(str2)
}