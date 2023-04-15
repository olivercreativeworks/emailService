import { Html_TextRun } from "../../HtmlMapper/ParagraphElements/Html_TextRun/Html_TextRun";
import { IDocsTextRun } from "../DocsElements/DocsTextRun";

export class DocsTextRunToHtml_TextRunMapper{
    static from(textRun: IDocsTextRun):Html_TextRun{
        return Html_TextRun.of(textRun.text, textRun.link)
    }
}