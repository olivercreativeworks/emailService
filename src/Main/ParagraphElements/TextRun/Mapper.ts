import { HtmlCreatorMapper } from "../../HtmlCreator";
import { ITextRun } from "./TextRun";

export class TextRunMapper{
    static createHtml(textRun:ITextRun):string{
        return textRun.link.map(link => HtmlCreatorMapper.wrapInLinkTag(link, textRun.text)).orElse(textRun.text)
    }
}