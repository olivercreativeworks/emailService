import { Maybe } from "../../../../Utility/Maybe"
import { IHtml_ParagraphElementType } from "../Html_ParagraphElements"

export interface IHtml_TextRun{
    text:string
    link:Maybe<string>
}

export class Html_TextRun implements IHtml_TextRun, IHtml_ParagraphElementType<"html_textRun">{
    text: string
    link: Maybe<string>
    type: "html_textRun"

    constructor(text:string, link:Maybe<string>){
        this.text = text
        this.link = link
        this.type = "html_textRun"
    }

    static of(text:string, link:Maybe<string>):Html_TextRun{
        return new Html_TextRun(text, link)
    }
}