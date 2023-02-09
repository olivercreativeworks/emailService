// import { List } from "./Monads/List"
// import { Maybe } from "./Monads/Maybe"
// import { Pipe } from "./Monads/Pipe"
// import { Helper } from "./Monads/HelperFns"
// import { GoogleDocsStructure } from "./gInterface"
// import { MonadDefinitions } from "./Monads/Interfaces"

// type Monad<Value> = MonadDefinitions.Monad<Value>

// function map<A,B>(fn:(value:A) => B){
//     return Helper.map(fn)
// }

// function flatMap<A,B>(fn:(value:A) => Monad<B>){
//     return Helper.flatMap(fn)
// }
// type Document = GoogleDocsStructure.Document
// type Body = GoogleDocsStructure.Body
// type BodyContent = GoogleDocsStructure.BodyContent
// type Paragraph = GoogleDocsStructure.Paragraph
// type TextRun = GoogleDocsStructure.TextRun
// type ParagraphElement = GoogleDocsStructure.ParagraphElement

// class HtmlTextRun{
//     textRun:TextRun
//     constructor(textRun:TextRun){
//         this.textRun = textRun
//     }

//     static fromTextRun(textRun:TextRun){
//         return new HtmlTextRun(textRun)
//     }

//     get htmlString(){
//         return textRunToAnchorTagString(this.textRun)

//         function textRunToAnchorTagString(textRun:TextRun):string{
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
//     const doc = Docs.Documents.get(docId)

//     const htmlMapper = new HtmlMapper()
//     const emailConstructor = new EmailConstructor(htmlMapper)
//     const email = emailConstructor.createEmailHtml(doc)
//     Logger.log("THE EMAILZ")
//     Logger.log(email)
// }

// class EmailConstructor{
//     private htmlMapper:HtmlMapper

//     constructor(x:HtmlMapper){
//         this.htmlMapper = x
//     }

//     createEmailHtml(document:Document):Maybe<string>{
//         return  Pipe.of(this.htmlMapper.mapFromDocument)
//             .addToPipe(map(appendSignatureHtml))
//             .evaluate(document)

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

// class HtmlMapper{
//     mapFromDocument(document:Document){
//         return getDocumentHtml(document)

//         function getDocumentHtml(document:Document):Maybe<string>{
//             return Pipe.of(getDocumentTextRuns)
//                 .addToPipe(map(getTextRunsAsHtmlString))
//                 .evaluate(document)
//         }

//         function getDocumentTextRuns(document:Document): Maybe<List<List<TextRun>>>{
//             return Pipe.of(getBody)
//                 .addToPipe(flatMap(getContent))
//                 .addToPipe(flatMap(getParagraphsFromContent))
//                 .addToPipe(flatMap(getParagraphElementsFromParagraphsList))
//                 .addToPipe(flatMap(getTextRunsList))
//                 .evaluate(document)
//         }

//         function getTextRunsAsHtmlString(textRuns:List<List<TextRun>>){
//             return Pipe.of(getHtmlTextRun)
//                 .addToPipe(getTextAsHtmlParagraphString)
//                 .evaluate(textRuns)
//         }

    
//         function getBody(doc:Document):Maybe<Body>{
//             return Maybe.of(doc.body)
//         }
//         function getContent(body:Body):Maybe<List<BodyContent>>{
//             return Maybe.of(body?.content).map(List.fromArr)
//         }
    
//         function getTextRun(paragraphElement:ParagraphElement):Maybe<TextRun>{
//             return Maybe.of(paragraphElement.textRun)
//         }

        
//         function getTextAsHtmlParagraphString(textRuns:List<List<HtmlTextRun>>): string{
//             return textRuns.map(transformHtmlTextRunsToString)
//                 .map(addHtmlParagraphTags)
//                 .reduce(combineStrings)
            
//             function addHtmlParagraphTags(text:string):string{
//                 return `<p>${text}</p>`
//             }
//         }   

//         function transformHtmlTextRunsToString(htmlTextRuns:List<HtmlTextRun>): string{
//             return htmlTextRuns.reduce(combineStringAndHtmlTextRun, " ").trim()
            
//             function combineStringAndHtmlTextRun(str: string, htmlTextRun:HtmlTextRun):string{
//                 return combineStrings(str, htmlTextRun.htmlString)
//             }
//         }
    
//         function combineStrings(a:string, b:string):string{
//             return a.concat(b)
//         }
    
//         function getHtmlTextRun(textRunsList: List<List<TextRun>>):List<List<HtmlTextRun>>{
//             return textRunsList.map(paragraphOfTextRuns => paragraphOfTextRuns.map(HtmlTextRun.fromTextRun))
//         }
    
//         function getTextRunsList(paragraphElementList:List<List<ParagraphElement>>):Maybe<List<List<TextRun>>>{
//             return paragraphElementList.map(getTextRunsList2).sequence(Maybe.of)
            
//             function getTextRunsList2(paragraphElementList:List<ParagraphElement>):Maybe<List<TextRun>>{
//                 return paragraphElementList.map(getTextRun).sequence(Maybe.of)
//             }
//         }
    
        
//         function getParagraphElementsFromParagraphsList(paragraphs:List<Paragraph>):Maybe<List<List<ParagraphElement>>>{
//             return paragraphs.map(getParagraphElement).sequence(Maybe.of)

//             function getParagraphElement(paragraph:Paragraph):Maybe<List<ParagraphElement>>{
//                 return Maybe.of(paragraph.elements).map(List.fromArr)
//             }
//         }
    
//         function getParagraphsFromContent(bodyContent:List<BodyContent>):Maybe<List<Paragraph>>{
//             return bodyContent.compactMap(getParagraph, paragraph => paragraph.isSomething()).sequence(Maybe.of)
            
//             function getParagraph(bodyContent:BodyContent): Maybe<Paragraph>{
//                 return Maybe.of(bodyContent.paragraph)
//             }
//         }
        
//     }
// }