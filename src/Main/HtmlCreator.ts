import { DocsDocumentModel, DocsParagraphElementModel, DocsInlineObjectElementModel } from "../Models/DocsDocumentModel";
import { DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel";
import { concatStrings } from "../Models/UtilityFunctions";
import { HtmlParagraph } from "./Email";

import { ImageHtmlMapper, SizeInPixels } from "./ParagraphElements/Image";
import { ParagraphHtmlWrapper } from "./ParagraphElements/ParagraphElements";
import { TextRunHtmlMapper } from "./ParagraphElements/TextRun";


export class HtmlCreatorMapper{
    static wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string{
        return `<img src="${sourceUrl}", height="${sizeInPixels.height}", width="${sizeInPixels.width}"></img>`
    }
    static wrapInLinkTag (link:string, text:string): string{
        return `<a href="${link}" target="_blank">${text}</a>`
    }
    static wrapInParagraphTag(text:string):HtmlParagraph{
        return `<p>${text}</p>`
    }
}
