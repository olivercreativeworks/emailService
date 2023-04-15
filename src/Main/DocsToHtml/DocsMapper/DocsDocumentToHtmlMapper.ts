import { Document } from "../../Document"
import { IHtml_ParagragraphElement } from "../../HtmlMapper/ParagraphElements/Html_ParagraphElements"
import { DocsStringMapper } from "./DocsToStringMapper"

export class DocsDocumentToHtmlMapper{
    static createHtml(doc:Document<IHtml_ParagragraphElement>):string{
        return doc.compactMap(DocsStringMapper.elementsToHtml).reduce(DocsStringMapper.paragraphsToHtml, " ").trim()
    }
}

