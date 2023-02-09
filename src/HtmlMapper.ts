import { Document } from "./DocumentStructure"
import { Maybe } from "./Monads/Maybe"

export class DocumentToHtmlMapper implements HtmlMapper{
    mapFromDocument(document:Document):Maybe<string>{
        return document.body
            .flatMap(body => body.bodyContent)
            .flatMap(bodyContent => bodyContent.paragraphs)
            .flatMap(paragraphs => paragraphs.getParagraphsAsHtmlString())        
    }
}

export interface HtmlMapper{
    mapFromDocument(document:Document): Maybe<string>
}