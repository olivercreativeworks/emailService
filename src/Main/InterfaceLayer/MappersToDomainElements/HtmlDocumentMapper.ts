import { List_2D } from "../../../Utility/List_2D";
import { Maybe } from "../../../Utility/Maybe";
import { Document } from "../../Document";
import { IHtml_ParagragraphElement } from "../../HtmlMapper/ParagraphElements/Html_ParagraphElements";
import { DocsDocumentModel } from "../../Models/DocsDocumentModel";
import { DocsDocument } from "../DocsElements/DocsDocument";
import { DocsDocumentMapper } from "../DocsElements/DocsDocumentMapper";
import { IDocsParagraphElement } from "../DocsElements/ParagraphElements";
import { DocsParagraphElementToHtml_ParagraphElementMapper } from "./Html_ParagraphElementsMapper";


export class DocsToHtmlDocumentMapper{
    static from(doc:DocsDocumentModel):Maybe<Document<IHtml_ParagragraphElement>>{
        return DocsDocumentMapper.from(doc).map(toHtmlElements).map(Document.of)

        function toHtmlElements(doc:DocsDocument<IDocsParagraphElement>):List_2D<IHtml_ParagragraphElement>{
            return doc.$value.compactMap(DocsParagraphElementToHtml_ParagraphElementMapper.from)
        }
    }
}