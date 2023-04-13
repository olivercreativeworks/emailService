import { HtmlCreatorMapper } from "./HtmlCreator";
import { ITextRun } from "../InterfaceLayer/TextRun";
import { LinkAttributes } from "./LinkAttributes";

export class TextRunMapper{
    static createHtml(textRun:ITextRun):string{
        return HtmlCreatorMapper.createLinkTagElseDefault(textRun.text, textRun.link.map(LinkAttributes.from).unsafeUnwrap())
        // return textRun.link.map(link => HtmlCreatorMapper.createTag("a", textRun.text, LinkAttributes.from(link))).orElse(textRun.text)
    }
}