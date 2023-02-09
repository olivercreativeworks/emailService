// import { List } from "./Monads/List"
// import { Maybe } from "./Monads/Maybe"
// import { Pipe } from "./Monads/Pipe"
// import { Helper } from "./Monads/HelperFns"
// import { GoogleDocsStructure } from "./GoogleDocsStructure"
// import { MonadDefinitions } from "./Monads/Interfaces"

// type Monad<Value> = MonadDefinitions.Monad<Value>

// function map<A,B>(fn:(value:A) => B){
//     return Helper.map(fn)
// }

// function flatMap<A,B>(fn:(value:A) => Monad<B>){
//     return Helper.flatMap(fn)
// }
// type DocsDocument = GoogleDocsStructure.Document
// type DocsBody = GoogleDocsStructure.Body
// type DocsBodyContent = GoogleDocsStructure.BodyContent
// type DocsParagraph = GoogleDocsStructure.Paragraph
// type DocsTextRun = GoogleDocsStructure.TextRun
// type DocsParagraphElement = GoogleDocsStructure.ParagraphElement

// class Document{
//     doc: DocsDocument

//     constructor(doc:DocsDocument){
//         this.doc = doc
//     }
//     static of(doc:DocsDocument){
//         return new Document(doc)
//     }

//     get body():Maybe<Body>{
//         return Maybe.of(this.doc.body).map(Body.of)
//     }
// }

// class Body{
//     body:DocsBody
//     constructor(body:DocsBody){
//         this.body = body
//     }
//     static of(body:DocsBody){
//         return new Body(body)
//     }

//     get bodyContent():Maybe<BodyContent>{
//         return Maybe.of(this.body.content).map(List.fromArr).map(BodyContent.of)
//     }
// }

// class BodyContent{
//     bodyContent:List<DocsBodyContent>
    
//     constructor(bodyContent:List<DocsBodyContent>){
//         this.bodyContent = bodyContent
//     }
    
//     static of(bodyContent:List<DocsBodyContent>){
//         return new BodyContent(bodyContent)
//     }

//     get paragraphs():Maybe<Paragraphs>{
//         return this.bodyContent.compactMap(getParagraph, paragraph => paragraph.isSomething())
//             .sequence(Maybe.of)
//             .map(Paragraphs.of)
//             // .map(Paragraphs.of)
        
//         function getParagraph(bodyContent:DocsBodyContent): Maybe<Paragraph>{
//             return Maybe.of(bodyContent.paragraph).map(Paragraph.of)
//         }
//     }
// }

// class Paragraphs{
//     paragraphs:List<Paragraph>
//     constructor(paragraphs:List<Paragraph>){
//         this.paragraphs = paragraphs
//     }
//     static of(paragraphs:List<Paragraph>){
//         return new Paragraphs(paragraphs)
//     }

//     get paragraphElements():Maybe<List<ParagraphElements>>{
//         return this.paragraphs.map(paragraph => paragraph.elements).sequence(Maybe.of)
//     }

//     getParagraphTextRuns():Maybe<List<TextRuns>>{
//         return this.paragraphElements.flatMap(getTextRuns)
        
//         function getTextRuns(paragraphElements:List<ParagraphElements>):Maybe<List<TextRuns>>{
//             return paragraphElements.map(elements => elements.textRuns).sequence(Maybe.of)
//         }
//     }

//     getParagraphsAsHtmlString():Maybe<string>{
//         return this.getParagraphTextRuns()
//             .flatMap(textRunsList => textRunsList.map(textRuns => textRuns.getAsHtmlString().map(addHtmlParagraphTags))
//                 .sequence(Maybe.of)
//                 .map(list => list.reduce(combineStrings)))

//         function combineStrings(a:string, b:string):string{
//             return a.concat(b)
//         }
//         function addHtmlParagraphTags(text:string):string{
//             return `<p>${text}</p>`
//         }
//     }
// }

// class Paragraph{
//     paragraph:DocsParagraph
//     constructor(paragraph:DocsParagraph){
//         this.paragraph = paragraph
//     }
//     static of(paragraph:DocsParagraph){
//         return new Paragraph(paragraph)
//     }

//     get elements():Maybe<ParagraphElements>{
//             return Maybe.of(this.paragraph.elements).map(List.fromArr).map(ParagraphElements.of)
//         }
//     }


// class TextRun{
//     textRun:DocsTextRun
//     content:Maybe<string>
//     url:Maybe<string>
//     constructor(textRun:DocsTextRun){
//         this.textRun = textRun
//         this.content = Maybe.of(textRun.content)
//         this.url = Maybe.of(textRun?.textStyle?.link?.url)
//     }

//     static of(textRun:DocsTextRun){
//         return new TextRun(textRun)
//     }

//     get htmlString():Maybe<string>{
//         return this.url.isSomething() ? 
//             Maybe.of((content:string) => (url:string) => makeContentWithUrl(content, url)).ap(this.content).ap(this.url) :
//             this.content

//         function makeContentWithUrl(content:string, url:string):string{
//             return `<a href="${url}", target="_blank">${content}</a>`
//         }
//     }

// }

// class TextRuns{
//     textRuns:List<TextRun>

//     constructor(textRuns:List<TextRun>){
//         this.textRuns = textRuns
//     }

//     static of(textRuns:List<TextRun>){
//         return new TextRuns(textRuns)
//     }
//     getAsHtmlString():Maybe<string>{
//        return this.textRuns.map(textRun => textRun.htmlString)
//         .sequence(Maybe.of)
//         .map(htmlTextRuns => htmlTextRuns.reduce(combineStrings))

//     function combineStrings(a:string, b:string):string{
//         return a.concat(b)
//     }
//     }
    
// }

// class ParagraphElements{
//     paragraphElements: List<DocsParagraphElement>
//     constructor(paragraphElements:List<DocsParagraphElement>){
//         this.paragraphElements = paragraphElements
//     }
//     static of(paragraphElements:List<DocsParagraphElement>){
//         return new ParagraphElements(paragraphElements)
//     }

//     get textRuns():Maybe<TextRuns>{
//         return this.paragraphElements.map(getTextRun).sequence(Maybe.of).map(list => list.map(TextRun.of)).map(TextRuns.of)

//         function getTextRun(paragraphElement:DocsParagraphElement):Maybe<DocsTextRun>{
//             return Maybe.of(paragraphElement.textRun)
//         }
//     }
// }

// class HtmlMapper{
//     mapFromDocument(document:Document):Maybe<string>{
//         return document.body
//             .flatMap(body => body.bodyContent)
//             .flatMap(bodyContent => bodyContent.paragraphs)
//             .flatMap(paragraphs => paragraphs.getParagraphsAsHtmlString())
            
        
//         // return getDocumentHtml(document)

//         // function getDocumentHtml(document:DocsDocument):Maybe<string>{
//         //     return Pipe.of(getDocumentTextRuns)
//         //         .addToPipe(map(getTextRunsAsHtmlString))
//         //         .evaluate(document)
//         // }

//         // function getDocumentTextRuns(document:DocsDocument): Maybe<List<List<DocsTextRun>>>{
//         //     return Pipe.of(getBody)
//         //         .addToPipe(flatMap(getContent))
//         //         .addToPipe(flatMap(getParagraphsFromContent))
//         //         .addToPipe(flatMap(getParagraphElementsFromParagraphsList))
//         //         .addToPipe(flatMap(getTextRunsList))
//         //         .evaluate(document)
//         // }

//         // function getTextRunsAsHtmlString(textRuns:List<List<DocsTextRun>>){
//         //     return Pipe.of(getHtmlTextRun)
//         //         .addToPipe(getTextAsHtmlParagraphString)
//         //         .evaluate(textRuns)
//         // }     
//         // function getTextAsHtmlParagraphString(textRuns:List<List<HtmlTextRun>>): string{
//         //     return textRuns.map(transformHtmlTextRunsToString)
//         //         .map(addHtmlParagraphTags)
//         //         .reduce(combineStrings)
            
//         //     function addHtmlParagraphTags(text:string):string{
//         //         return `<p>${text}</p>`
//         //     }
//         // }   

//         // function transformHtmlTextRunsToString(htmlTextRuns:List<HtmlTextRun>): string{
//         //     return htmlTextRuns.reduce(combineStringAndHtmlTextRun, " ").trim()
            
//         //     function combineStringAndHtmlTextRun(str: string, htmlTextRun:HtmlTextRun):string{
//         //         return combineStrings(str, htmlTextRun.htmlString)
//         //     }
//         // }
    
//         // function combineStrings(a:string, b:string):string{
//         //     return a.concat(b)
//         // }
    
//         // function getHtmlTextRun(textRunsList: List<List<DocsTextRun>>):List<List<HtmlTextRun>>{
//         //     return textRunsList.map(paragraphOfTextRuns => paragraphOfTextRuns.map(HtmlTextRun.fromTextRun))
//         // }
    
       
    
        

    
        
        
//     }
// }

// class HtmlTextRun{
//     textRun:DocsTextRun
//     constructor(textRun:DocsTextRun){
//         this.textRun = textRun
//     }

//     static fromTextRun(textRun:DocsTextRun){
//         return new HtmlTextRun(textRun)
//     }

//     get htmlString(){
//         return textRunToAnchorTagString(this.textRun)

//         function textRunToAnchorTagString(textRun:DocsTextRun):string{
//             const url = textRun?.textStyle?.link?.url
//             const content = textRun.content
//             return url ? makeContentWithUrl(content, url) : content
//         }

//         function makeContentWithUrl(content:string, url:string):string{
//             return `<a href="${url}", target="_blank">${content}</a>`
//             }
//     }
// }

// function myTest(docId){
//     const doc = Document.of(Docs.Documents.get(docId))

//     const htmlMapper = new HtmlMapper()
//     const emailConstructor = new EmailConstructor(htmlMapper)
//     const email = emailConstructor.createEmailHtmlFromDocument(doc)
//     Logger.log("THE EMAILZ!!!!!")
//     Logger.log(email)

//     GmailApp.sendEmail(
//         // recipeient: string, subject:string, body:string , options:googleappsscript.gmail.gmailadvancedoptions
//     )
// }

// interface EmailOptions{
//     recipeient:string
//     subject:string
//     body?:string
//     senderDisplayName?:string
//     htmlBody?:string
// }

// class GmailEmailOptions{
//     name?:string
//     htmlBody?:string

//     constructor(options:GmailEmailOptions){
//         this.name = options.name
//         this.htmlBody = this?.htmlBody
//     }
//     static of(options:GmailEmailOptions):GmailEmailOptions{
//         return new GmailEmailOptions(options)
//     }
// }

// type EmailSender<A extends EmailOptions> = (email:A) => void
// type OptionsMapper<A> = (options: EmailOptions) => A 

// class Email<TemplateType extends EmailOptions>{
//     private options: Maybe<TemplateType>
//     private sendFn:EmailSender<TemplateType>
//     private optionsMapper:OptionsMapper<TemplateType>

//     private constructor(options:TemplateType, optionsMapper:OptionsMapper<TemplateType>, sender:EmailSender<TemplateType>){
//         this.options = Maybe.of(options)
//         this.sendFn = sender
//         this.optionsMapper = optionsMapper
//     }

//     static createTemplate<A extends EmailOptions>(optionsMapper:OptionsMapper<A>, sender:EmailSender<A>):Email<A>{
//         return new Email(null, optionsMapper, sender)
//     }

//     populateTemplate(options:EmailOptions):Email<TemplateType>{
//         const mappedOptions = this.optionsMapper(options)
//         return new Email(mappedOptions, this.optionsMapper, this.sendFn)
//     }

//     send(){
//         this.options.map(this.sendFn)
//     }
// }

// // class EmailOptions{
// //     recipeient:string
// //     subject: string
// //     body?:string
// // }

// interface EmailCretaor{
//     createEmailFromDocument(document:Document): Email
// }

// class EmailConstructor<TemplateType extends EmailOptions>{
//     private htmlMapper:HtmlMapper
//     private emailTemplate: Email<TemplateType>

//     constructor(x:HtmlMapper, emailTemplate:Email<TemplateType>){
//         this.htmlMapper = x
//         this.emailTemplate = emailTemplate
//     }

//     of(x:HtmlMapper,emailTemplate:Email<TemplateType>):EmailConstructor<TemplateType>{
//         return new EmailConstructor(x, emailTemplate)
//     }


//     createEmailHtmlFromDocument(document:Document, recipeient, subject, otherOptions?:EmailOptions):Maybe<Email<TemplateType>>{
//         const html = this.htmlMapper.mapFromDocument(document).map(appendSignatureHtml)
//         const email = html.map((htmlBody:string) => this.emailTemplate.populateTemplate({recipeient, subject, htmlBody}))
//         return email

//         function appendSignatureHtml(text:string):string{
//             return combineStrings(text, getMySignature())
//         }

//         function combineStrings(a:string, b:string):string{
//             return a.concat(b)
//         }
    
//         function getMySignature(){
//             return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//         }
//     }
// }
