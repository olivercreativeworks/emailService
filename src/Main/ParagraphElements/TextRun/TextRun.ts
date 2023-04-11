import { DocsTextRunModel } from "../../../Models/DocsDocumentModel"
import { Maybe } from "../../../Utility/Maybe"
import { IElement } from "../ParagraphElements"

export interface ITextRun extends IElement<"textRun">{
    text:string
    link:Maybe<string>
    type: "textRun"
}


export class TextRun implements ITextRun{
    text: string
    link: Maybe<string>
    type: "textRun"

    constructor(text:string, link?:string){
        this.text = text
        this.link = Maybe.of(link)
        this.type = "textRun"
    }

    static of(text:string, link?:string):TextRun{
        return new TextRun(text, link)
    }

    static from(docsTextRun: DocsTextRunModel):Maybe<TextRun>{
        const text = docsTextRun?.content
        const link = docsTextRun?.textStyle?.link?.url
        return Maybe.of(text).map( (text: string) => TextRun.of(text, link) )
    }
}