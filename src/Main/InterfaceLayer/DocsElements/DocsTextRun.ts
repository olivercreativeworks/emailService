import { DocsTextRunModel } from "../../Models/DocsDocumentModel"
import { Maybe } from "../../../Utility/Maybe"
import { IDocsElement } from "./ParagraphElements"

export interface IDocsTextRun extends IDocsElement<"textRun">{
    text:string
    link:Maybe<string>
    type: "textRun"
}


export class DocsTextRun implements IDocsTextRun{
    text: string
    link: Maybe<string>
    type: "textRun"

    constructor(text:string, link?:string){
        this.text = text
        this.link = Maybe.of(link)
        this.type = "textRun"
    }

    static of(text:string, link?:string):DocsTextRun{
        return new DocsTextRun(text, link)
    }

    static from(docsTextRun: DocsTextRunModel):Maybe<DocsTextRun>{
        const text = docsTextRun?.content
        const link = docsTextRun?.textStyle?.link?.url
        return Maybe.of(text).map( (text: string) => DocsTextRun.of(text, link) )
    }
}