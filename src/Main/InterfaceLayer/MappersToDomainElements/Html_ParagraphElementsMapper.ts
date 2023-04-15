import { IHtml_ParagragraphElement } from "../../HtmlMapper/ParagraphElements/Html_ParagraphElements";
import { IDocsParagraphElement } from "../DocsElements/ParagraphElements";
import { DocsImageToHtml_ImageMapper } from "./Html_ImageMapper";
import { DocsTextRunToHtml_TextRunMapper } from "./Html_TextRunMapper";

export class DocsParagraphElementToHtml_ParagraphElementMapper{
    static from(element:IDocsParagraphElement):IHtml_ParagragraphElement{
        return element.type == "image" ? DocsImageToHtml_ImageMapper.from(element) : DocsTextRunToHtml_TextRunMapper.from(element)
    }
}