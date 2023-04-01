import { DocsTextRunModel } from "../../../Models/DocsDocumentModel"
import { Maybe } from "../../../Utility/Maybe"

export interface ITextRun{
    text:Maybe<string>
    link:Maybe<string>
}
export class TextRun implements ITextRun{
    text:Maybe<string>
    link:Maybe<string>

    constructor(text?:string, link?:string){
        this.text = Maybe.of(text)
        this.link = Maybe.of(link)
    }

    static of(docsTextRunModel: DocsTextRunModel):TextRun{
        const text = docsTextRunModel?.content
        const link = docsTextRunModel?.textStyle?.link?.url
        return new TextRun(text, link)
    }
}
