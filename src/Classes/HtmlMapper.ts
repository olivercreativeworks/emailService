import { HtmlMapper } from "../Interfaces/HtmlMapper"
import { Document, TextRun, ParagraphElement, ParagraphAsSubunit, Paragraph } from "../Interfaces/DocumentStructure"
import { Maybe } from "../Monads/Maybe"
import { List } from "../Monads/List"


export class DocumentToHtmlMapper implements HtmlMapper{
    mapFromDocument(document:Document):Maybe<string>{
        return DocumentToHtmlMapper.getDocumentParagraphs(document)
        .flatMap(DocumentToHtmlMapper.getParagraphsAsHtmlString)     
    }

    private static getDocumentParagraphs(document:Document):Maybe<List<Paragraph>>{
        return document.body
        .flatMap(body => body.bodyContent)
        .flatMap(bodyContent => bodyContent.paragraphs)
    }

    private static getParagraphsAsHtmlString(paragraphs:List<Paragraph>):Maybe<string>{
        return DocumentToHtmlMapper.getParagraphsAsTextRuns(paragraphs)
            .flatMap(DocumentToHtmlMapper.combineParagraphTextRunsIntoHtmlString)
    }

    private static combineParagraphTextRunsIntoHtmlString(textRunsList: List<ParagraphAsSubunit<TextRun>>):Maybe<string>{
        return textRunsList.map(DocumentToHtmlMapper.textRunsToHtmlParagraphString)
                .sequence(Maybe.of)
                .map((list:List<string>) => list.reduce(DocumentToHtmlMapper.combineStrings))
    }

    private static textRunsToHtmlParagraphString(textRuns:ParagraphAsSubunit<TextRun>): Maybe<string>{
        return DocumentToHtmlMapper.getTextRunsAsHtmlString(textRuns).map(DocumentToHtmlMapper.addHtmlParagraphTags)
    }

    private static getParagraphsAsTextRuns(paragraphs:List<Paragraph>):Maybe<List<ParagraphAsSubunit<TextRun>>>{
        return DocumentToHtmlMapper.getParagraphElements(paragraphs).flatMap(DocumentToHtmlMapper.getParagraphElementsTextRuns)
    }

    private static getParagraphElements(paragraphs:List<Paragraph>):Maybe<List<ParagraphAsSubunit<ParagraphElement>>>{
        return paragraphs.map(paragraph => paragraph.elements).sequence(Maybe.of)
    }

    private static getParagraphElementsTextRuns(paragraphElements: List<ParagraphAsSubunit<ParagraphElement>>):Maybe<List<ParagraphAsSubunit<TextRun>>>{
        return paragraphElements.map(DocumentToHtmlMapper.getParagraphTextRun).sequence(Maybe.of)
        
    }
    private static getParagraphTextRun(paragraphElements: ParagraphAsSubunit<ParagraphElement>):Maybe<ParagraphAsSubunit<TextRun>>{
        return paragraphElements.map(element => element.textRun).sequence(Maybe.of)        
    }

    private static combineStrings(a:string, b:string):string{
        return a.concat(b)
    }
    
    private static addHtmlParagraphTags(text:string):string{
        return `<p>${text}</p>`
    }

    private static getTextRunsAsHtmlString(textRuns:ParagraphAsSubunit<TextRun>):Maybe<string>{
        return textRuns.map(DocumentToHtmlMapper.mapTextRunToHtmlString)
        .sequence(Maybe.of)
        .map(htmlTextRuns => htmlTextRuns.reduce(DocumentToHtmlMapper.combineStrings))
    }

    private static mapTextRunToHtmlString(textRun: TextRun):Maybe<string>{
        return textRun.url.isSomething() ? 
            Maybe.of((content:string) => (url:string) => DocumentToHtmlMapper.makeContentWithUrl(content, url)).ap(textRun.content).ap(textRun.url) :
            textRun.content
    }

    private static makeContentWithUrl(content:string, url:string):string{
        return `<a href="${url}", target="_blank">${content}</a>`
    }

}