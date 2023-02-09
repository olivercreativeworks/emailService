import { List } from "./Monads/List"
import { Maybe } from "./Monads/Maybe"
import { GoogleDocsStructure } from "./GoogleDocsStructure"

type DocsDocument = GoogleDocsStructure.Document
type DocsBody = GoogleDocsStructure.Body
type DocsBodyContent = GoogleDocsStructure.BodyContent
type DocsParagraph = GoogleDocsStructure.Paragraph
type DocsTextRun = GoogleDocsStructure.TextRun
type DocsParagraphElement = GoogleDocsStructure.ParagraphElement


    export class Document{
        doc: DocsDocument
    
        constructor(doc:DocsDocument){
            this.doc = doc
        }
        static of(doc:DocsDocument){
            return new Document(doc)
        }
    
        get body():Maybe<Body>{
            return Maybe.of(this.doc.body).map(Body.of)
        }

        getDocumentContentAsHtmlString():Maybe<string>{
            return this.body
                .flatMap(body => body.bodyContent)
                .flatMap(bodyContent => bodyContent.paragraphs)
                .flatMap(paragraphs => paragraphs.getParagraphsAsHtmlString())  
        }
    }
    
    export class Body{
        body:DocsBody
        constructor(body:DocsBody){
            this.body = body
        }
        static of(body:DocsBody){
            return new Body(body)
        }
    
        get bodyContent():Maybe<BodyContent>{
            return Maybe.of(this.body.content).map(List.fromArr).map(BodyContent.of)
        }
    }
    
    export class BodyContent{
        bodyContent:List<DocsBodyContent>
        
        constructor(bodyContent:List<DocsBodyContent>){
            this.bodyContent = bodyContent
        }
        
        static of(bodyContent:List<DocsBodyContent>){
            return new BodyContent(bodyContent)
        }
    
        get paragraphs():Maybe<Paragraphs>{
            return this.bodyContent.compactMap(getParagraph, paragraph => paragraph.isSomething())
                .sequence(Maybe.of)
                .map(Paragraphs.of)
            
            function getParagraph(bodyContent:DocsBodyContent): Maybe<Paragraph>{
                return Maybe.of(bodyContent.paragraph).map(Paragraph.of)
            }
        }
    }
    
    export class Paragraphs{
        paragraphs:List<Paragraph>
        constructor(paragraphs:List<Paragraph>){
            this.paragraphs = paragraphs
        }
        static of(paragraphs:List<Paragraph>){
            return new Paragraphs(paragraphs)
        }
    
        get paragraphElements():Maybe<List<ParagraphElements>>{
            return this.paragraphs.map(paragraph => paragraph.elements).sequence(Maybe.of)
        }
    
        getParagraphTextRuns():Maybe<List<TextRuns>>{
            return this.paragraphElements.flatMap(getTextRuns)
            
            function getTextRuns(paragraphElements:List<ParagraphElements>):Maybe<List<TextRuns>>{
                return paragraphElements.map(elements => elements.textRuns).sequence(Maybe.of)
            }
        }
    
        getParagraphsAsHtmlString():Maybe<string>{
            return this.getParagraphTextRuns()
                .flatMap(textRunsList => textRunsList.map(textRuns => textRuns.getAsHtmlString().map(addHtmlParagraphTags))
                    .sequence(Maybe.of)
                    .map(list => list.reduce(combineStrings)))
    
            function combineStrings(a:string, b:string):string{
                return a.concat(b)
            }
            function addHtmlParagraphTags(text:string):string{
                return `<p>${text}</p>`
            }
        }
    }
    
    export class Paragraph{
        paragraph:DocsParagraph
        constructor(paragraph:DocsParagraph){
            this.paragraph = paragraph
        }
        static of(paragraph:DocsParagraph){
            return new Paragraph(paragraph)
        }
    
        get elements():Maybe<ParagraphElements>{
                return Maybe.of(this.paragraph.elements).map(List.fromArr).map(ParagraphElements.of)
            }
        }
    
    
    export class ParagraphElements{
        paragraphElements: List<DocsParagraphElement>
        constructor(paragraphElements:List<DocsParagraphElement>){
            this.paragraphElements = paragraphElements
        }
        static of(paragraphElements:List<DocsParagraphElement>){
            return new ParagraphElements(paragraphElements)
        }
    
        get textRuns():Maybe<TextRuns>{
            return this.paragraphElements.map(getTextRun).sequence(Maybe.of).map(list => list.map(TextRun.of)).map(TextRuns.of)
    
            function getTextRun(paragraphElement:DocsParagraphElement):Maybe<DocsTextRun>{
                return Maybe.of(paragraphElement.textRun)
            }
        }
    }

    export class TextRuns{
        textRuns:List<TextRun>
    
        constructor(textRuns:List<TextRun>){
            this.textRuns = textRuns
        }
    
        static of(textRuns:List<TextRun>){
            return new TextRuns(textRuns)
        }
        getAsHtmlString():Maybe<string>{
           return this.textRuns.map(textRun => textRun.htmlString)
            .sequence(Maybe.of)
            .map(htmlTextRuns => htmlTextRuns.reduce(combineStrings))
    
            function combineStrings(a:string, b:string):string{
                return a.concat(b)
            }
        }
        
    }

    export class TextRun{
        textRun:DocsTextRun
        content:Maybe<string>
        url:Maybe<string>
        constructor(textRun:DocsTextRun){
            this.textRun = textRun
            this.content = Maybe.of(textRun.content)
            this.url = Maybe.of(textRun?.textStyle?.link?.url)
        }
    
        static of(textRun:DocsTextRun){
            return new TextRun(textRun)
        }
    
        get htmlString():Maybe<string>{
            return this.url.isSomething() ? 
                Maybe.of((content:string) => (url:string) => makeContentWithUrl(content, url)).ap(this.content).ap(this.url) :
                this.content
    
            function makeContentWithUrl(content:string, url:string):string{
                return `<a href="${url}", target="_blank">${content}</a>`
            }
        }
    
    }