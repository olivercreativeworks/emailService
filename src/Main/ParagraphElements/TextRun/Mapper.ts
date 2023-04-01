import { curryLiftA2 } from "../../../Utility/Maybe";
import { HtmlCreatorMapper } from "../../HtmlCreator";
import { createLinkTagFn } from "../Image/HtmlMapper";
import { ITextRun } from "./TextRun";

export class TextRunMapper{
    static createHtml(textRun:ITextRun, wrapInLinkTagFn: createLinkTagFn = HtmlCreatorMapper.wrapInLinkTag):string{
        return curryLiftA2(wrapInLinkTagFn, textRun.link, textRun.text).orElseGet(() => textRun.text.orElse(""))
    }
}

