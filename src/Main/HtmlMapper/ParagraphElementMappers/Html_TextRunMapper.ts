import { HtmlCreatorMapper } from "../HtmlCreator";
import { ILinkAttributes, LinkAttributes } from "../HtmlAttributes/LinkAttributes";
import { IHtml_TextRun } from "../ParagraphElements/Html_TextRun/Html_TextRun";

type LinkAttributesFn = (link:string) => ILinkAttributes

export class Html_TextRunMapper{
    static toHtml(textRun:IHtml_TextRun, createLinkAttributes:LinkAttributesFn):string{
        const text = textRun.text
        const linkAttributes = textRun.link.map(createLinkAttributes)
        const htmlOutput = HtmlCreatorMapper.createLinkTagElseDefault(text, linkAttributes)
        return htmlOutput
    }
}