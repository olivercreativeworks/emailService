import { Maybe } from "../../../Utility/Maybe"
import { ITextRun } from "../../InterfaceLayer/TextRun"

export interface IHtml_TextRun{
    text:string
    link:Maybe<string>
}

export class Html_TextRun implements IHtml_TextRun{
    text: string
    link: Maybe<string>

    constructor(text:string, link:Maybe<string>){
        this.text = text
        this.link = link
    }

    static of(text:string, link:Maybe<string>):Html_TextRun{
        return new Html_TextRun(text, link)
    }

    static from(textRun: ITextRun):Html_TextRun{
        return Html_TextRun.of(textRun.text, textRun.link)
    }
}