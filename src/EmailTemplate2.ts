// import { CustomDate } from "./CustomDate"
// import { HtmlFormatter } from "./HtmlFormatter"

// interface Email {
//     greeting?:string
//     body?:string[]
//     closing?:string
//     signature?:string
// }

// class HtmlEmailConstructor{
//     readonly greeting?:string
//     readonly body?:string[]
//     readonly closing?:string
//     readonly signature?:string

//     private constructor(email?:Email){
//         this.greeting = email?.greeting
//         this.body = email?.body
//         this.closing = email?.closing
//         this.signature = email?.signature
//     }

//     static createBlankEmail():HtmlEmailConstructor{
//         return new HtmlEmailConstructor()
//     }

//     private updateEmailMessage(update: Partial<{[x in keyof Email]: Email[x] }>){
//         return new HtmlEmailConstructor({...this, ...update})
//     }

//     compose(emailFormatter?:(email:Email) => Email):string{
//         const emailParts = [
//             this?.greeting,
//             "",
//             ...this?.body,
//             "",
//             this?.closing,
//             "",
//             this?.signature
//         ]
//         .filter(x => x)
//         .map(text => `<p>${text}<\p>`)
//         .join("")
//         return emailParts
//     }

//     setGreeting(greeting:string):HtmlEmailConstructor{
//         return this.updateEmailMessage({greeting: greeting})
//     }

//     setClosing(closingMessage: string):HtmlEmailConstructor{
//         return this.updateEmailMessage({closing: closingMessage})
//     }
    
//     setSignature(signature:string):HtmlEmailConstructor{
//         return this.updateEmailMessage({signature:signature})
//     }
    
//     addBodyParagraph(body:string):HtmlEmailConstructor{
//         return this.updateEmailMessage({body: Array.isArray(this.body) ? this.body.concat(body) : [body]})
//     }
// }

// export class EmailTemplate{
//     static create(date:CustomDate, htmlFormatter:HtmlFormatter){
//       const htmlBody = htmlFormatter.buildHtmlBody(
//         EmailTemplate.getGreeting(),
//         ...EmailTemplate.getBodyParagraphs(date, htmlFormatter), 
//         EmailTemplate.getClosing(htmlFormatter), 
//         EmailTemplate.getMySignature()
//       )
//       return {name:"Oliver Allen-Cummings", htmlBody}
//     }
  
//     private static getGreeting(){
//       const emailGreeting = 'Hi team,'
//       return emailGreeting
//     }
  
//     private static getBodyParagraphs(date:CustomDate, htmlFormatter:HtmlFormatter){
//     //   const requirementsDoc = "www.google.com"
//       const requirementsDoc = DriveApp.getFileById('1bZwt67lF79O21aXniSIlXNgZcrsYFKEkz8haewUQYac')
//       const emailBodyText = [ ``,
//         `Please send me any services you have for ${date.month}. It would be great if you could share by the end of the day ${date.getsOneWeekDeadline()}.`, 
//         // `As a reminder, ${htmlFormatter.makeHtmlLink(`here's a list of the info I'll need to record any TA or Education services.`, requirementsDoc)}`
//         `As a reminder, ${htmlFormatter.makeHtmlLink(`here's a list of the info I'll need to record any TA or Education services.`, requirementsDoc.getUrl())}`
//       ]
//       const emailBodyParagraphs = emailBodyText.map(htmlFormatter.makeHtmlParagraph)
//       return emailBodyParagraphs
//     }
  
//     private static getClosing(htmlFormatter:HtmlFormatter){
//       const lineBreak = htmlFormatter.addLineBreak()
//       const emailClosing = `Thanks,${lineBreak}Oliver`
//       return emailClosing
//     }
  
//     static getMySignature(){
//       return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//     }
//   }

// function getMyData(){
//     // return "I am here now"
//     const date = CustomDate.of(new Date())
//     const htmlFormatter = new HtmlFormatter()
//     const requirementsDoc = DriveApp.getFileById('1bZwt67lF79O21aXniSIlXNgZcrsYFKEkz8haewUQYac');
//     const htmlEmail = HtmlEmailConstructor.createBlankEmail()
//           .setGreeting("Hi team,")
//           .addBodyParagraph(`Please send me any services you have for ${date.month}. It would be great if you could share by the end of the day ${date.getsOneWeekDeadline()}`)
//           .addBodyParagraph(`As a reminder, ${htmlFormatter.makeHtmlLink(`here's a list of the info I'll need to record any TA or Education services.`, requirementsDoc.getUrl())}`)
//           .setClosing("Thank you,<br>Oliver")
//           .setSignature(EmailTemplate.getMySignature())
//           .compose()
//     return htmlEmail
// }

// type TextRunner = {content?:string, textStyle?:{link?:{url?:string}}}

// function testing(){
//    const doc = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo').body
// //    Logger.log(doc.content)
// //    Logger.log(doc.content.filter(c => c.paragraph).map(c => c.paragraph.elements))
//    const content = doc.content.filter(c => c.paragraph)
//     .map(content => content.paragraph.elements)
//     // Logger.log("The Content")
//     // content.forEach(Logger.log)
//     const textRuns:TextRunner[][] = content.map(paragraphElements => paragraphElements.map(paragraph => paragraph.textRun))
//     // Logger.log("The Text Runs")
//     // textRuns.forEach(Logger.log)
//     // Logger.log("The Urls")
//     textRuns.forEach(textRun => textRun.forEach(
//         run => {
//             Logger.log(run?.content)
//             Logger.log(run?.textStyle?.link?.url)
//         }
//     ))
//     const paras:TextRunner[] = textRuns.map(textRun => {
//         Logger.log("The current Text Run")
//         Logger.log(textRun)
//         const updatedRun = textRun.reduce((prev:TextRunner, curr:TextRunner):TextRunner =>{
//             const prevUrl = prev?.textStyle?.link?.url
//             const currUrl = curr?.textStyle?.link?.url
//             const modPrev = prevUrl ? makeContentWithUrl(prev.content, prevUrl) : prev.content
//             const modCurr = currUrl ? makeContentWithUrl(curr.content, currUrl) : curr.content
//             return {content: modPrev.concat(modCurr) }
//         })
//         return updatedRun
//     })
//     Logger.log("The paras")
//     paras.forEach(Logger.log)
//     const finalPara = paras.map(x => `<p>${x.content}</p>`).join("")
//     Logger.log(finalPara)

//     const finalParaWithSignature = finalPara.concat(getMySignature())
//     Logger.log(finalParaWithSignature)

//     function getMySignature(){
//         return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//       }

//     function makeContentWithUrl(content:string, url:string):string{
//         return `<a href="${url}", target="_blank">${content}</a>`
//        }
// //     content.map(elements => elements
// //         elements.reduce( 
// //         (previousValue: TextRunner, currentValue: TextRunner, index:number): TextRunner => {
// //             Logger.log(index)
// //             Logger.log(previousValue)
// //             Logger.log(currentValue)
// //             // Logger.log(previousValue.textRun.content)
// //             // Logger.log(currentValue?.textRun?.content)
// //             return {textRun: {content: previousValue.textRun.content.concat(currentValue?.textRun?.content)}}
// //         }
// //         )
// //    )
// //    Logger.log(content)
// //    Logger.log(content[0].textRun.content)
// //    const makeParagraph = content.map(makeHtmlParagraph).filter(x => x).join("")
// //    Logger.log(content)
// //    Logger.log(makeParagraph)
// //    return makeParagraph
    
//    function makeHtmlParagraph(paragraphText: {paragraph:{elements:TextRunner[]}}){
//         return `<p>${paragraphText?.paragraph?.elements.reduce(concatParagraphText)}</p>`
//     }
//    function concatParagraphText (currentParagraph:TextRunner, newContent: TextRunner): TextRunner{
//     // Logger.log(newContent)
//     const content = newContent?.textRun?.content
//     const url = newContent?.textRun?.link?.url
//     const currentContent = currentParagraph?.textRun?.content
//     const currentUrl = currentParagraph?.textRun?.link?.url
//     // Logger.log(url)
//     const extraContent = url ? makeContentWithUrl(content, url) : content
//     // Logger.log(extraContent)
//     const newParagraph = extraContent ? 
//                             currentUrl ? {textRun: {content: makeContentWithUrl(currentContent, currentUrl).concat(extraContent)}} :
//                                          {textRun: {content: currentParagraph.textRun.content.concat(extraContent)}} : 
//                             currentParagraph
//     Logger.log(newParagraph)
//     return newParagraph
//     // return extraContent ? currentParagraph.concat( extraContent ) : currentParagraph
//    }

// //    function makeContentWithUrl(content:string, url:string):string{
// //     return `<a href="${url}", target="_blank">${content}</a>`
// //    }
// //    const paragraphElements = content.map(content => content.paragraph.elements)
// //    paragraphElements.forEach(elements => elements.forEach( element => element.textRun.content

// //    ))
// }


//   function printThis() {
//     const date = CustomDate.of(new Date())
//     const htmlFormatter = new HtmlFormatter()
//     const requirementsDoc = DriveApp.getFileById('1bZwt67lF79O21aXniSIlXNgZcrsYFKEkz8haewUQYac');
//       Logger.log(EmailTemplate.create(date, new HtmlFormatter()).htmlBody);
//       Logger.log(HtmlEmailConstructor.createBlankEmail()
//           .setGreeting("Hi team,")
//           .addBodyParagraph(`Please send me any services you have for ${date.month}. It would be great if you could share by the end of the day ${date.getsOneWeekDeadline()}`)
//           .addBodyParagraph(`As a reminder, ${htmlFormatter.makeHtmlLink(`here's a list of the info I'll need to record any TA or Education services.`, requirementsDoc.getUrl())}`)
//           .setClosing("Thank you")
//           .setSignature(EmailTemplate.getMySignature())
//           .compose())
//   }


import { List } from "./Monads/List"
// import { Maybe } from "./Monads/Maybe"
// import { MonadDefinitions } from "./Monads/Interfaces"
// import { Pipe } from "./Monads/Pipe"

// type Monad<A> = MonadDefinitions.Monad<A>

// interface Link{
//     url?:string
// }
// interface TextStyle{
//     link?:Link
// }
// type TextContent = string

// interface TextRun{
//     content?: TextContent
//     textStyle?:TextStyle
// }
// interface HtmlTextRun{
//     textRun:TextRun
//     asHtmlString: string
// }

// interface ParagraphElement{
//     textRun?:TextRun
// }
// interface Paragraph{
//     elements?:ParagraphElement[]
// }

// interface BodyContent{
//     paragraph?:Paragraph
// }

// interface Body{
//     content?:BodyContent[]
// }

// interface Document{
//     body?:Body
// }

// function getDocumentBodyContent(docId:string): List<BodyContent>{
//     return List.fromArr(Docs.Documents.get(docId).body.content)
// }
// // function getParagraphElements(bodyContent:BodyContent): ParagraphElement[]{
// //     return bodyContent?.paragraph?.elements
// // }
// function getTextRuns(paragraphElement:ParagraphElement): TextRun {
//     return paragraphElement.textRun
// }
// function textRunToAnchorTagString(textRun:TextRun):string{
//     const url = textRun?.textStyle?.link?.url
//     const content = textRun.content
//     return url ? makeContentWithUrl(content, url) : content
// }

// function combine(a:string, b:string):string{
//     return a + b
// }

// function addHtmlParagraphTags(text:string):string{
//     return `<p>${text}</p>`
// }

// function getParagraph(bodyContent:BodyContent): Maybe<Paragraph>{
//     return Maybe.of(bodyContent.paragraph)
// }

// // function getParagraphTextRuns(paragraph:Paragraph):Maybe<TextRun[]>{
// //     return getParagraphElements(paragraph).map(elements => elements.map(element => element.textRun))
// // }

// function myTest(docId){
//     const doc = Docs.Documents.get(docId)
//     const email = new DocContentToHtmlConverter(doc).getHtmlEmailWithSignature()
//     Logger.log(email)
// }

// class DocContentToHtmlConverter{
//     doc: Document
//     constructor(doc:Document){
//         this.doc = doc
//     }

//     private getBody():Maybe<Body>{
//         return Maybe.of(this.doc.body)
//     }

//     private getBodyContent():Maybe<List<BodyContent>>{
//         return this.getBody()
//             .map(body => body.content)
//             .map(List.fromArr)
//     }

//     private getParagraphs():Maybe<List<Paragraph>>{
//         return this.getBodyContent().flatMap(this.getParagraphsFromContentList)
//     }

//     private getParagraphElements():Maybe<List<List<ParagraphElement>>>{
//         return this.getParagraphs().flatMap(this.getParagraphElementsFromParagraphsList)
//     }

//     private getTextRun(paragraphElement:ParagraphElement):Maybe<TextRun>{
//         return Maybe.of(paragraphElement.textRun)
//     }

//     private getTextRuns():Maybe<List<List<TextRun>>>{
//         return this.getParagraphElements().flatMap(this.getTextRunsList)
//     }

//     private getHtmlTextRuns():Maybe<List<List<HtmlTextRun>>>{
//         return this.getTextRuns().map(this.getHtmlTextRun)
//     }

//     private getHtmlParagraphs():Maybe<List<string>>{
//         return this.getHtmlTextRuns()
//             .map(htmlTextRunsList => htmlTextRunsList.map(this.transformHtmlTextRunsToString))
//             .map(stringHtmlTextRuns => stringHtmlTextRuns.map(this.addHtmlParagraphTags))
//     }
//     private getTextAsHtmlString():Maybe<string>{
//         return this.getHtmlParagraphs().map(stringParagraphs => stringParagraphs.reduce(this.combineStrings))
//     }

//     getHtmlEmailWithSignature():Maybe<string>{
//         return this.getTextAsHtmlString().map(this.appendSignatureHtml)
//     }

//     private appendSignatureHtml(text:string):string{
//         return this.combineStrings(text, this.getMySignature())
//     }

//     private getMySignature(){
//         return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//       }

//     private transformHtmlTextRunsToString(htmlTextRuns:List<HtmlTextRun>): string{
//         return htmlTextRuns.reduce(this.combineStringAndHtmlTextRun, " ").trim()
//     }
//     // getHtmlParagraphs(){
//     //     return this.getHtmlTextRuns().map(htmlTextRunsList => htmlTextRunsList.reduce(
//     //         (initial:string, curr:List<HtmlTextRun>) => initial.concat(curr.reduce(
//     //             (initial: string, curr:HtmlTextRun) => initial.concat(curr.asHtmlString), "")),
//     //             ""
//     //     ))
//     // }
//     private htmlTextRunsToStringParagraph(stringParagraph: string, htmlTextRuns:List<HtmlTextRun>){
//         return htmlTextRuns.reduce(this.combineStringAndHtmlTextRun, stringParagraph)
//     }
    
//     private combineStringAndHtmlTextRun(str: string, htmlTextRun:HtmlTextRun):string{
//         return this.combineStrings(str, htmlTextRun.asHtmlString)
//     }

//     private combineStrings(a:string, b:string):string{
//         return a.concat(b)
//     }

//     private getHtmlTextRun(textRunsList: List<List<TextRun>>):List<List<HtmlTextRun>>{
//         return textRunsList.map(innerList => innerList.map(this.enhanceTextRuns))
//     }

//     private enhanceTextRuns(textRun:TextRun): HtmlTextRun{
//         return { textRun, asHtmlString: this.textRunToAnchorTagString(textRun)}
//     }

//     private getTextRunsList2(paragraphElementList:List<ParagraphElement>):Maybe<List<TextRun>>{
//         return paragraphElementList.map(this.getTextRun).sequence(Maybe.of)
//     }

//     private getTextRunsList(paragraphElementList:List<List<ParagraphElement>>):Maybe<List<List<TextRun>>>{
//         return paragraphElementList.map(this.getTextRunsList2).sequence(Maybe.of)
//     }
    
//     private getX(){
//         return this.getParagraphElements().map(x => x.map(y => y.map(element => element.textRun)))
//     }

//     private getParagraphElement(paragraph:Paragraph):Maybe<List<ParagraphElement>>{
//         return Maybe.of(paragraph.elements).map(List.fromArr)
//     }

//     private getParagraphElementsFromParagraphsList(paragraphs:List<Paragraph>):Maybe<List<List<ParagraphElement>>>{
//         return paragraphs.map(this.getParagraphElement).sequence(Maybe.of)
//     }

//     private isSomething<A>(value: Maybe<A>){
//         return value.isSomething()
//     }

//     private getParagraphsFromContentList(bodyContent:List<BodyContent>):Maybe<List<Paragraph>>{
//         return bodyContent.map(this.getParagraph)
//             .filter(isSomething)
//             .sequence(Maybe.of)
//     }

//     private getParagraph(bodyContent:BodyContent): Maybe<Paragraph>{
//         return Maybe.of(bodyContent.paragraph)
//     }

//     private getDocumentBodyContent(docId:string): List<BodyContent>{
//         return List.fromArr(Docs.Documents.get(docId).body.content)
//     }


//     private textRunToAnchorTagString(textRun:TextRun):string{
//         const url = textRun?.textStyle?.link?.url
//         const content = textRun.content
//         return url ? makeContentWithUrl(content, url) : content
//     }
    
//     private combine(a:string, b:string):string{
//         return a + b
//     }
    
//     private addHtmlParagraphTags(text:string):string{
//         return `<p>${text}</p>`
//     }
    

    
// }

// function testingzzz(docId:string){
//     Logger.log("Hey there")
//     const content = getDocumentBodyContent(docId)
//         .map(getParagraph)
//         .map(flatMapMonad(getParagraphTextRuns))
//         .map(mapMonad(textRunsToString(textRunToAnchorTagString)))
//         .map(mapMonad(addHtmlParagraphTags))
//         .reduce((x, y) => Maybe.of(a => b => combine(a,b)).ap(x).ap(y))
//         .map(x => x.concat(getMySignature()))

//     //     .compactMap(getParagraph, isSomething)
//     //     .compactMap(mapMonad(getParagraphTextRuns), isSomething)
//     //     .

//     //  .compactMap(getParagraph)
//     //  .compactMap(getParagraphTextRuns)
//     //  .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
//     //  .map(addHtmlParagraphTags)
//     //  .reduce(combine)
//     //  .concat(getMySignature())
 
//     Logger.log(content)
//    }

// function toHtml(textRun:TextRun):string{
//     const content = textRun?.content
//     const url = textRun?.textStyle?.link
//     return
// }

// function getParagraphElements(paragraph:Paragraph):Maybe<ParagraphElement[]>{
//     return Maybe.of(paragraph.elements)
// }

// function getElementTextRun(paragraphElement:ParagraphElement):Maybe<TextRun>{
//     return Maybe.of(paragraphElement.textRun)
// }

// function getElementTextRuns(elements:Array<ParagraphElement>): Array<Maybe<TextRun>>{
//     return elements.map(getElementTextRun)
// }

// function toList<A>(list:List<A>, value:A):List<A>{
//     return list.concat(value)
// }

// //    .compactMap(getParagraph)
// // .compactMap(getParagraphTextRuns)
// // .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
// // .map(addHtmlParagraphTags)
// // .reduce(combine)
// // .concat(getMySignature())

// function getParagraphTextRuns(paragraph:Paragraph):Maybe<TextRun[]>{
//     Pipe.of(getParagraphElements)
//     .addToPipe()


//         // .map(getElementTextRuns)
//         // .map(x => x.filter(y => !(y.isNothing())))
//         // .map(List.fromArr)
//         // .addToPipe(x => x.sequence(List.of).map(x => x.join()))
//         // .addToPipe(x => x.sequence(Maybe.of))
//         // .map(x => x.asArray())
//         // .evaluate(paragraph)
// }

// function getBodyContentTextRuns(bodyContent:BodyContent){
//     return Pipe.of(getParagraph).addToPipe(getParagraphTextRuns).evaluate(bodyContent)
// }

// function isSomething<A>(x:Maybe<A>):boolean{
//     return x.isSomething()
// }

// function mapMonad<A,B>(fn:(value:A) => B):typeof $map{
//     return $map
//     function $map(maybeMonad:Maybe<A>):Maybe<B>
//     function $map<C>(monad:{map: (fn:(value:A)=>B)=>C}): C{
//         return monad.map(fn)
//     }
// }

// function flatMapMonad<A,B>(fn:(value:A) => Monad<B>):typeof $flatMap{
//     return $flatMap
    
//     function $flatMap(maybeMonad:Maybe<A>):Maybe<B>
//     function $flatMap(monad:Monad<A>): Monad<B>{
//         return monad.flatMap(fn)
//     }
// }

// function formatTextRuns(formatFn:(textRuns:TextRun[]) => string): typeof $formatTextRuns{
//     return $formatTextRuns

//     function  $formatTextRuns(textRuns:TextRun[]){
//         return formatFn(textRuns)
//     }
// }

// function formatAndCombineTextRuns(...fns:Array<(textRun:string) => string>){
//     const formatFn = Pipe.of()


//     return (textRuns:TextRun[]) => fns.reduce( (prevFn, currFn) => value => currFn(prevFn(value)),  

//     )
// }

// function textRunsToString(formatFn:(textRun:TextRun) => string = (x=>`${x}`)):(textRun:TextRun[]) => string{
//     return (textRuns:TextRun[]) => textRuns.map(formatFn).reduce(combine)
// }



// // function testingzzz(docId:string){
// //     Logger.log("Hey there")
// //     const content = getDocumentBodyContent(docId)
// //         .map(getParagraph)
// //         .map(flatMapMonad(getParagraphTextRuns))
// //         .map(mapMonad(textRunsToString(textRunToAnchorTagString)))
// //         .map(mapMonad(addHtmlParagraphTags))
// //         .reduce((x, y) => Maybe.of(a => b => combine(a,b)).ap(x).ap(y))
// //         .map(x => x.concat(getMySignature()))

// //     //     .compactMap(getParagraph, isSomething)
// //     //     .compactMap(mapMonad(getParagraphTextRuns), isSomething)
// //     //     .

// //     //  .compactMap(getParagraph)
// //     //  .compactMap(getParagraphTextRuns)
// //     //  .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
// //     //  .map(addHtmlParagraphTags)
// //     //  .reduce(combine)
// //     //  .concat(getMySignature())
 
// //     Logger.log(content)
// //    }


// function testing(docId:string){
//     const content = getDocumentBodyContent(docId)
//      .compactMap(getParagraph)
//      .compactMap(getParagraphTextRuns)
//      .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
//      .map(addHtmlParagraphTags)
//      .reduce(combine)
//      .concat(getMySignature())
 
//     Logger.log(content)
//    }



// // function compose<A,B>(finalFn:(value:any) => A, ...otherFns:Function[]):(initialInput:A) => B{
// //     return initialInput => {
// //         return fns.reduceRight((curr, fn) => fn(curr), initialInput)
// //     }
// // }

// // function reduce(fn):(arr:[]) => any
// // function reduce(fn, initial):(arr:[]) => any
// // function reduce(fn, initial?:any){
// //     return arr => initial ? arr.reduce(fn, initial) : arr.reduce(fn) 
// // }

// interface mappable<A>{
//     map<B>(fn:map<A, B>): mappable<B>
// }

// interface map<A,B> {
//     (value:A): B
// }
// interface reduce<A, B> {
//     (prevValue:A, currValue?:B): A
// }
// interface reduceable<A>{
//     reduce<B>(fn:reduce<B,A>, initialValue?:B):B
// }

// interface composeableFunction<A,B,C>{
//     (lastFn:(val:B) => C, firstFn:(val:A)=>B): C
// }
// // function map<A,B>(fn:map<A,B>): (list:List<A>) => List<B>
// // function map<A,B>(fn:map<A,B>): (arr:Array<A>) => Array<B>
// // function map(fn:any): (mappableItem:any) => any{
// //     return mappableItem => mappableItem.map(fn)
// // }
// interface bigComposeableFunction<A,B,C,D>{
//     (lastFn:(val:C) => D, firstFn:composeableFunction<A,B,C>):D
// }
// function $composeMe(){
//         return 4
//     }

// interface composeable{
//     function<A extends Function[]>(...fns:A): typeof fns.reduceRight
// }
// const m:composeable = (...args)=> args.reduceRight()
// function toStr(x:number){
//     return "hello"
// }
// function withGoodbybe(x:string){
//     return x + " goodbye"
// }
// const arrOfFuncs = [withGoodbybe, toStr]
// const e = arrOfFuncs.reduceRight((prevVal, currFn) => currFn(prevVal) , 3)

// function mee(a:typeof withGoodbybe, b:typeof toStr){
//     const args:Array<typeof arguments> = Array.from(arguments)
//     const r = arguments[0]
//     return args.reduceRight((prev, curr) => curr(prev), 3) 
// }

// function composeL<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
//     return fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
// }
// function composeM<R,V,W>(fn1: (a: R) => V, ...fns: Array<(a: W) => R>) {
//     return fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
// }
// const me3 = composeL(toStr, withGoodbybe)(6)
// function compose<A,B,C>(fn:composeableFunction<A,B,C>, ...otherFns:[]){
//     otherFns.red
// }
// // function  composeA<A,B>(lastFn:(val:any) => B, firstFn:(val:A)=>any):(initialValue:A) => B{
// //     return initialValue => lastFn(firstFn(initialValue))
// // }


// function map<A,B>(fn:map<A,B>): typeof $map{
//     return $map

//     function $map(maybe:Maybe<A>):Maybe<B>
//     function $map(arr:Array<A>): Array<B>
//     function $map(list:List<A>): List<B>
//     function $map(mappableItem:mappable<A>):mappable<B>{
//         return mappableItem.map(fn)
//     }
// }

// function reduce<A,B>(fn:reduce<A,B>): typeof $reduce{
//     return $reduce

//     function $reduce(list:List<A>, initialValue?:B):B
//     function $reduce(list:List<A>):A
//     function $reduce(arr:Array<A>, initialValue?:B):B
//     function $reduce(arr:Array<A>):A
//     function $reduce(reduceableItem:any, initialValue?:any):any{
//         return initialValue ? reduceableItem.reduce(fn, initialValue) : reduceableItem.reduce(fn)
//     }
// }


// function giveMeStr<A>(x:number): (second:Array<A>) => number
// function giveMeStr<A>(x:number): (second:List<A>) => string
// function giveMeStr(x:any):any{
//     return second => x
// }

// //https://stackoverflow.com/questions/48892283/typescript-overload-considers-only-one-of-the-overloaded-signatures
// // typescript overloads do not work well when returning functions
// function base<A>(x:number):typeof giveYouResult{
//     return giveYouResult
//     function giveYouResult(second:Array<A>): number
//     function giveYouResult(second:List<A>):string
//     function giveYouResult(second:any): any{
//         return x
//     }
// }
// // giveMeStr(3, [4]).toExponential()
// // giveMeStr(3, List.of(4)).at
// // giveMeStr(3)(List.fromArr([3]))
// // base(3)(List.fromArr([3]))


// // function reduce<A,B>(fn:reduce<A,B>): (list:List<A>, initialValue?:B) => B
// // function reduce<A,B>(fn:reduce<A,B>): (list:List<A>, initialValue?:B) => B
// // function reduce<A,B>(fn:reduce<A,B>): (arr:Array<A>, initialValue?:A) => A
// // function reduce<A,B>(fn:reduce<A,B>): (arr:Array<A>, initialValue?:A) => A
// // function reduce<A,B>(fn:reduce<A,B>):(reduceableItem:reduceable<B>, initialValue?:any) => any{
// //     return (reduceableItem:reduceable<B>, initialValue?:A) => initialValue ? reduceableItem.reduce(fn, initialValue) : reduceableItem.reduce(fn)
// // }

// const arr = [1,2,3]

// function combineIntoAnchorTags(textRuns:TextRun[]):string{
//     map(textRunToAnchorTagString,)(textRuns)
//     const add = (x:number,y:number) => x + y
//     reduce(add)(List.fromArr(arr), 0)

//     // map(textRunToAnchorTagString, textRuns)
//     const combo = composeA(reduce(combine), textRunToAnchorTagString)
//     return textRuns.map()
// }



// function testing2(docId:string){
//    const content = getDocumentBodyContent(docId)
//     .compactMap(getParagraph)
//     .compactMap(getParagraphTextRuns)
//     .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
//     .map(addHtmlParagraphTags)
//     .reduce(combine)
//     .concat(getMySignature())

//    Logger.log(content)
//   }

//   function getMySignature(){
//     return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//   }

// function makeContentWithUrl(content:string, url:string):string{
//     return `<a href="${url}", target="_blank">${content}</a>`
//     }



// // export type ExtractFunctionArguments<Fn> = Fn extends  ( ...args: infer P ) => any  ? P : never
// // export type ExtractFunctionReturnValue<Fn> = Fn extends  ( ...args: any[] ) => infer P  ? P : never
// // type BooleanSwitch<Test, T = true, F = false> = Test extends true ? T : F
// // export type AnyFunction = ( ...args: any[] ) => any
// // type Arbitrary = 'It was 1554792354 seconds since Jan 01, 1970 when I wrote this' 
// // type IsAny<O, T = true, F = false> = Arbitrary extends O
// //   ? any extends O
// //     ? T
// //     : F
// //   : F
    
// // type Pipe<Fns extends any[], IsPipe = true, PreviousFunction = void, InitalParams extends any[] = any[], ReturnType = any> = {
// //     'next': ( ( ..._: Fns ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
// //         ? PreviousFunction extends void
// //             ? Pipe<Next, IsPipe, First, ExtractFunctionArguments<First>, ExtractFunctionReturnValue<First> >
// //             : ReturnType extends ExtractFunctionArguments<First>[0]
// //             ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First> >
// //             : IsAny<ReturnType> extends true
// //                 ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First> >
// //                 : {
// //                 ERROR: ['Return type ', ReturnType , 'does comply with the input of', ExtractFunctionArguments<First>[0]],
// //                 POSITION: ['Position of problem for input arguments is at', Fns['length'], 'from the', BooleanSwitch<IsPipe, 'end', 'beginning'> , 'and the output of function to the ', BooleanSwitch<IsPipe, 'left', 'right'>],
// //                 }
// //         : never
// //     'done': ( ...args: InitalParams ) => ReturnType,
// //     }[
// //     Fns extends []
// //         ? 'done'
// //         : 'next'
// //     ]

// // const pipe:Pipe = (...fns){
// //     return fns.reduce(())
// // }




// // function getNum(x: number):number{
// //     return x
// // }
// // function toString(x: number):string{
// //     return x.toString()
// // }
// // function concatToHello(x:string):string{
// //     return x.concat("Hello")
// // }

// // function testingPipe(){
// //     console.log(
// //         Pipe.of(getNum)
// //             .addToPipe(toString)
// //             .addToPipe(concatToHello)
// //             .evaluate(3)
// //     )
// //     console.log(
// //        Compose.of(concatToHello)
// //         .compose(toString)
// //         .compose(getNum)
// //         .evaluate(300)
// //     )
// //     // console.log(
// //     //     Compose.of(
// //     //         concatToHello,
// //     //         toString,
// //     //         getNum
// //     //     )
// //     // )

// // }

// // function compose<A, B>(fn1: (value:any) => A, ...args: [...Array<(value:unknown) => unknown>, (value:B) => any]){
// //     return args.reduceRight((prev, curr) => value => curr(prev(value)), fn1)
// // }

// // compose()

// // function pipe(...args:[(value: unknown) => unknown, (value:string) => number]){
// //     return args.reduce((prev, curr) => prev.addToPipe(curr), Pipe.of(x => x))
// // }

// import { List } from "./Monads/List"
// import { Maybe } from "./Monads/Maybe"
// import { MonadDefinitions } from "./Monads/Interfaces"
// import { Pipe } from "./Monads/Pipe"

// type Monad<A> = MonadDefinitions.Monad<A>

// interface Link{
//     url?:string
// }
// interface TextStyle{
//     link?:Link
// }
// type TextContent = string

// interface TextRun{
//     content?: TextContent
//     textStyle?:TextStyle
// }
// interface HtmlTextRun{
//     textRun:TextRun
//     asHtmlString: string
// }

// interface ParagraphElement{
//     textRun?:TextRun
// }
// interface Paragraph{
//     elements?:ParagraphElement[]
// }

// interface BodyContent{
//     paragraph?:Paragraph
// }

// interface Body{
//     content?:BodyContent[]
// }

// interface Document{
//     body?:Body
// }

// function getDocumentBodyContent(docId:string): List<BodyContent>{
//     return List.fromArr(Docs.Documents.get(docId).body.content)
// }
// // function getParagraphElements(bodyContent:BodyContent): ParagraphElement[]{
// //     return bodyContent?.paragraph?.elements
// // }
// function getTextRuns(paragraphElement:ParagraphElement): TextRun {
//     return paragraphElement.textRun
// }
// function textRunToAnchorTagString(textRun:TextRun):string{
//     const url = textRun?.textStyle?.link?.url
//     const content = textRun.content
//     return url ? makeContentWithUrl(content, url) : content
// }

// function combine(a:string, b:string):string{
//     return a + b
// }

// function addHtmlParagraphTags(text:string):string{
//     return `<p>${text}</p>`
// }

// function getParagraph(bodyContent:BodyContent): Maybe<Paragraph>{
//     return Maybe.of(bodyContent.paragraph)
// }

// // function getParagraphTextRuns(paragraph:Paragraph):Maybe<TextRun[]>{
// //     return getParagraphElements(paragraph).map(elements => elements.map(element => element.textRun))
// // }

// function myTest(docId){
//     const doc = Docs.Documents.get(docId)
//     // const email = new DocContentToHtmlConverter(doc).getHtmlEmailWithSignature()
//     // const email = HtmlMapper.mapFromDocument(doc)
//     const htmlMapper = new HtmlMapper()
//     const emailConstructor = new EmailConstructor(htmlMapper)
//     const email = emailConstructor.createEmailHtml(doc)
//     Logger.log("THE EMAIL")
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
//                 .addToPipe(flatMap(getParagraphsFromContentList))
//                 .addToPipe(flatMap(getParagraphElementsFromParagraphsList))
//                 .addToPipe(flatMap(getTextRunsList))
//                 .evaluate(document)
//         }

//         function getTextRunsAsHtmlString(textRuns:List<List<TextRun>>){
//             return Pipe.of(getHtmlTextRun)
//                 .addToPipe(getTextAsHtmlParagraphString)
//                 .evaluate(textRuns)
//         }
//         // const pipeFn = Pipe.of(getBody)
//         //     .addToPipe(flatMap(getContent))
//         //     .addToPipe(flatMap(getParagraphsFromContentList))
//         //     .addToPipe(flatMap(getParagraphElementsFromParagraphsList))
//         //     .addToPipe(flatMap(getTextRunsList))
//         //     .addToPipe(map(getHtmlTextRun))
//         //     .addToPipe(map(getTextAsHtmlParagraphString))
//         //     .addToPipe(map(appendSignatureHtml))

//         // return pipeFn.evaluate(document)
//         // return getHtmlEmailWithSignature()
//         function getTextRunsAsHtmlTextRuns(textRuns:List<List<TextRun>>){
//             return textRuns.map()
//         }
//         function getDoc(){
//             return Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo')
//         }
    
//         function getBody(doc:Document = getDoc()):Maybe<Body>{
//             return Maybe.of(doc.body)
//         }
//         function getContent(body:Body):Maybe<List<BodyContent>>{
//             return Maybe.of(body?.content).map(List.fromArr)
//         }
    
//         function getBodyContent():Maybe<List<BodyContent>>{
//             return getBody()
//                 .map(body => body.content)
//                 .map(List.fromArr)
//         }
    
//         function getParagraphs():Maybe<List<Paragraph>>{
//             return getBodyContent().flatMap(getParagraphsFromContentList)
//         }
    
//         function getParagraphElements():Maybe<List<List<ParagraphElement>>>{
//             return getParagraphs().flatMap(getParagraphElementsFromParagraphsList)
//         }
    
//         function getTextRun(paragraphElement:ParagraphElement):Maybe<TextRun>{
//             return Maybe.of(paragraphElement.textRun)
//         }
    
//         function getTextRuns():Maybe<List<List<TextRun>>>{
//             return getParagraphElements().flatMap(getTextRunsList)
//         }
    
//         function getHtmlTextRuns():Maybe<List<List<HtmlTextRun>>>{
//             return getTextRuns().map(getHtmlTextRun)
//         }
        
//         function getTextAsHtmlParagraphString(textRuns:List<List<HtmlTextRun>>): string{
//             return textRuns.map(transformHtmlTextRunsToString)
//                 .map(addHtmlParagraphTags)
//                 .reduce(combineStrings)
//         }

//         function getHtmlParagraphs():Maybe<List<string>>{
//             return getHtmlTextRuns()
//                 .map(htmlTextRunsList => htmlTextRunsList.map(transformHtmlTextRunsToString))
//                 .map(stringHtmlTextRuns => stringHtmlTextRuns.map(addHtmlParagraphTags))
//         }
//         function getTextAsHtmlString():Maybe<string>{
//             return getHtmlParagraphs().map(stringParagraphs => stringParagraphs.reduce(combineStrings))
//         }
    
//         function getHtmlEmailWithSignature():Maybe<string>{
//             return getTextAsHtmlString().map(appendSignatureHtml)
//         }
    
//         function appendSignatureHtml(text:string):string{
//             return combineStrings(text, getMySignature())
//         }

//         // function combineStrings(a:string, b:string):string{
//         //     return a.concat(b)
//         // }
    
//         function getMySignature(){
//             return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//           }
    
//         function transformHtmlTextRunsToString(htmlTextRuns:List<HtmlTextRun>): string{
//             return htmlTextRuns.reduce(combineStringAndHtmlTextRun, " ").trim()
//         }
//         // getHtmlParagraphs(){
//         //     return getHtmlTextRuns().map(htmlTextRunsList => htmlTextRunsList.reduce(
//         //         (initial:string, curr:List<HtmlTextRun>) => initial.concat(curr.reduce(
//         //             (initial: string, curr:HtmlTextRun) => initial.concat(curr.asHtmlString), "")),
//         //             ""
//         //     ))
//         // }
//         function htmlTextRunsToStringParagraph(stringParagraph: string, htmlTextRuns:List<HtmlTextRun>){
//             return htmlTextRuns.reduce(combineStringAndHtmlTextRun, stringParagraph)
//         }
        
//         function combineStringAndHtmlTextRun(str: string, htmlTextRun:HtmlTextRun):string{
//             return combineStrings(str, htmlTextRun.asHtmlString)
//         }
    
//         function combineStrings(a:string, b:string):string{
//             return a.concat(b)
//         }
    
//         function getHtmlTextRun(textRunsList: List<List<TextRun>>):List<List<HtmlTextRun>>{
//             return textRunsList.map(innerList => innerList.map(enhanceTextRuns))
//         }
    
//         function enhanceTextRuns(textRun:TextRun): HtmlTextRun{
//             return { textRun, asHtmlString: textRunToAnchorTagString(textRun)}
//         }
    
//         function getTextRunsList2(paragraphElementList:List<ParagraphElement>):Maybe<List<TextRun>>{
//             return paragraphElementList.map(getTextRun).sequence(Maybe.of)
//         }
    
//         function getTextRunsList(paragraphElementList:List<List<ParagraphElement>>):Maybe<List<List<TextRun>>>{
//             return paragraphElementList.map(getTextRunsList2).sequence(Maybe.of)
//         }
        
//         function getX(){
//             return getParagraphElements().map(x => x.map(y => y.map(element => element.textRun)))
//         }
    
//         function getParagraphElement(paragraph:Paragraph):Maybe<List<ParagraphElement>>{
//             return Maybe.of(paragraph.elements).map(List.fromArr)
//         }
    
//         function getParagraphElementsFromParagraphsList(paragraphs:List<Paragraph>):Maybe<List<List<ParagraphElement>>>{
//             return paragraphs.map(getParagraphElement).sequence(Maybe.of)
//         }
    
//         function isSomething<A>(value: Maybe<A>){
//             return value.isSomething()
//         }
    
//         function getParagraphsFromContentList(bodyContent:List<BodyContent>):Maybe<List<Paragraph>>{
//             return bodyContent.map(getParagraph)
//                 .filter(isSomething)
//                 .sequence(Maybe.of)
//         }
    
//         function getParagraph(bodyContent:BodyContent): Maybe<Paragraph>{
//             return Maybe.of(bodyContent.paragraph)
//         }
    
//         function getDocumentBodyContent(docId:string): List<BodyContent>{
//             return List.fromArr(Docs.Documents.get(docId).body.content)
//         }
    
    
//         function textRunToAnchorTagString(textRun:TextRun):string{
//             const url = textRun?.textStyle?.link?.url
//             const content = textRun.content
//             return url ? makeContentWithUrl(content, url) : content
//         }
        
//         function combine(a:string, b:string):string{
//             return a + b
//         }
        
//         function addHtmlParagraphTags(text:string):string{
//             return `<p>${text}</p>`
//         }
    
//         function makeContentWithUrl(content:string, url:string):string{
//             return `<a href="${url}", target="_blank">${content}</a>`
//             }
//     }
// }

// class DocContentToHtmlConverter{
//     doc: Document
//     constructor(doc:Document){
//         this.doc = doc
//     }

//     private getBody():Maybe<Body>{
//         return Maybe.of(this.doc.body)
//     }

//     private getBodyContent():Maybe<List<BodyContent>>{
//         return this.getBody()
//             .map(body => body.content)
//             .map(List.fromArr)
//     }

//     private getParagraphs():Maybe<List<Paragraph>>{
//         return this.getBodyContent().flatMap(this.getParagraphsFromContentList)
//     }

//     private getParagraphElements():Maybe<List<List<ParagraphElement>>>{
//         return this.getParagraphs().flatMap(this.getParagraphElementsFromParagraphsList)
//     }

//     private getTextRun(paragraphElement:ParagraphElement):Maybe<TextRun>{
//         return Maybe.of(paragraphElement.textRun)
//     }

//     private getTextRuns():Maybe<List<List<TextRun>>>{
//         return this.getParagraphElements().flatMap(this.getTextRunsList)
//     }

//     private getHtmlTextRuns():Maybe<List<List<HtmlTextRun>>>{
//         return this.getTextRuns().map(this.getHtmlTextRun)
//     }

//     private getHtmlParagraphs():Maybe<List<string>>{
//         return this.getHtmlTextRuns()
//             .map(htmlTextRunsList => htmlTextRunsList.map(this.transformHtmlTextRunsToString))
//             .map(stringHtmlTextRuns => stringHtmlTextRuns.map(this.addHtmlParagraphTags))
//     }
//     private getTextAsHtmlString():Maybe<string>{
//         return this.getHtmlParagraphs().map(stringParagraphs => stringParagraphs.reduce(this.combineStrings))
//     }

//     getHtmlEmailWithSignature():Maybe<string>{
//         return this.getTextAsHtmlString().map(this.appendSignatureHtml)
//     }

//     private appendSignatureHtml(text:string):string{
//         return this.combineStrings(text, this.getMySignature())
//     }

//     private getMySignature(){
//         return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//       }

//     private transformHtmlTextRunsToString(htmlTextRuns:List<HtmlTextRun>): string{
//         return htmlTextRuns.reduce(this.combineStringAndHtmlTextRun, " ").trim()
//     }
//     // getHtmlParagraphs(){
//     //     return this.getHtmlTextRuns().map(htmlTextRunsList => htmlTextRunsList.reduce(
//     //         (initial:string, curr:List<HtmlTextRun>) => initial.concat(curr.reduce(
//     //             (initial: string, curr:HtmlTextRun) => initial.concat(curr.asHtmlString), "")),
//     //             ""
//     //     ))
//     // }
//     private htmlTextRunsToStringParagraph(stringParagraph: string, htmlTextRuns:List<HtmlTextRun>){
//         return htmlTextRuns.reduce(this.combineStringAndHtmlTextRun, stringParagraph)
//     }
    
//     private combineStringAndHtmlTextRun(str: string, htmlTextRun:HtmlTextRun):string{
//         return this.combineStrings(str, htmlTextRun.asHtmlString)
//     }

//     private combineStrings(a:string, b:string):string{
//         return a.concat(b)
//     }

//     private getHtmlTextRun(textRunsList: List<List<TextRun>>):List<List<HtmlTextRun>>{
//         return textRunsList.map(innerList => innerList.map(this.enhanceTextRuns))
//     }

//     private enhanceTextRuns(textRun:TextRun): HtmlTextRun{
//         return { textRun, asHtmlString: this.textRunToAnchorTagString(textRun)}
//     }

//     private getTextRunsList2(paragraphElementList:List<ParagraphElement>):Maybe<List<TextRun>>{
//         return paragraphElementList.map(this.getTextRun).sequence(Maybe.of)
//     }

//     private getTextRunsList(paragraphElementList:List<List<ParagraphElement>>):Maybe<List<List<TextRun>>>{
//         return paragraphElementList.map(this.getTextRunsList2).sequence(Maybe.of)
//     }
    
//     private getX(){
//         return this.getParagraphElements().map(x => x.map(y => y.map(element => element.textRun)))
//     }

//     private getParagraphElement(paragraph:Paragraph):Maybe<List<ParagraphElement>>{
//         return Maybe.of(paragraph.elements).map(List.fromArr)
//     }

//     private getParagraphElementsFromParagraphsList(paragraphs:List<Paragraph>):Maybe<List<List<ParagraphElement>>>{
//         return paragraphs.map(this.getParagraphElement).sequence(Maybe.of)
//     }

//     private isSomething<A>(value: Maybe<A>){
//         return value.isSomething()
//     }

//     private getParagraphsFromContentList(bodyContent:List<BodyContent>):Maybe<List<Paragraph>>{
//         return bodyContent.map(this.getParagraph)
//             .filter(isSomething)
//             .sequence(Maybe.of)
//     }

//     private getParagraph(bodyContent:BodyContent): Maybe<Paragraph>{
//         return Maybe.of(bodyContent.paragraph)
//     }

//     private getDocumentBodyContent(docId:string): List<BodyContent>{
//         return List.fromArr(Docs.Documents.get(docId).body.content)
//     }


//     private textRunToAnchorTagString(textRun:TextRun):string{
//         const url = textRun?.textStyle?.link?.url
//         const content = textRun.content
//         return url ? makeContentWithUrl(content, url) : content
//     }
    
//     private combine(a:string, b:string):string{
//         return a + b
//     }
    
//     private addHtmlParagraphTags(text:string):string{
//         return `<p>${text}</p>`
//     }
    

    
// }

// function testingzzz(docId:string){
//     Logger.log("Hey there")
//     const content = getDocumentBodyContent(docId)
//         .map(getParagraph)
//         .map(flatMap(getParagraphTextRuns))
//         .map(map(textRunsToString(textRunToAnchorTagString)))
//         .map(map(addHtmlParagraphTags))
//         .reduce((x, y) => Maybe.of(a => b => combine(a,b)).ap(x).ap(y))
//         .map(x => x.concat(getMySignature()))

//     //     .compactMap(getParagraph, isSomething)
//     //     .compactMap(mapMonad(getParagraphTextRuns), isSomething)
//     //     .

//     //  .compactMap(getParagraph)
//     //  .compactMap(getParagraphTextRuns)
//     //  .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
//     //  .map(addHtmlParagraphTags)
//     //  .reduce(combine)
//     //  .concat(getMySignature())
 
//     Logger.log(content)
//    }

// function toHtml(textRun:TextRun):string{
//     const content = textRun?.content
//     const url = textRun?.textStyle?.link
//     return
// }

// function getParagraphElements(paragraph:Paragraph):Maybe<ParagraphElement[]>{
//     return Maybe.of(paragraph.elements)
// }

// function getElementTextRun(paragraphElement:ParagraphElement):Maybe<TextRun>{
//     return Maybe.of(paragraphElement.textRun)
// }

// function getElementTextRuns(elements:Array<ParagraphElement>): Array<Maybe<TextRun>>{
//     return elements.map(getElementTextRun)
// }

// function toList<A>(list:List<A>, value:A):List<A>{
//     return list.concat(value)
// }

// //    .compactMap(getParagraph)
// // .compactMap(getParagraphTextRuns)
// // .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
// // .map(addHtmlParagraphTags)
// // .reduce(combine)
// // .concat(getMySignature())

// function getParagraphTextRuns(paragraph:Paragraph):Maybe<TextRun[]>{
//     Pipe.of(getParagraphElements)
//     .addToPipe()


//         // .map(getElementTextRuns)
//         // .map(x => x.filter(y => !(y.isNothing())))
//         // .map(List.fromArr)
//         // .addToPipe(x => x.sequence(List.of).map(x => x.join()))
//         // .addToPipe(x => x.sequence(Maybe.of))
//         // .map(x => x.asArray())
//         // .evaluate(paragraph)
// }

// function getBodyContentTextRuns(bodyContent:BodyContent){
//     return Pipe.of(getParagraph).addToPipe(getParagraphTextRuns).evaluate(bodyContent)
// }

// function isSomething<A>(x:Maybe<A>):boolean{
//     return x.isSomething()
// }

// function map<A,B>(fn:(value:A) => B):typeof $map{
//     return $map
//     function $map(maybeMonad:Maybe<A>):Maybe<B>
//     function $map<C>(monad:{map: (fn:(value:A)=>B)=>C}): C{
//         return monad.map(fn)
//     }
// }

// function flatMap<A,B>(fn:(value:A) => Monad<B>):typeof $flatMap{
//     return $flatMap
    
//     function $flatMap(maybeMonad:Maybe<A>):Maybe<B>
//     function $flatMap(monad:Monad<A>): Monad<B>{
//         return monad.flatMap(fn)
//     }
// }

// function formatTextRuns(formatFn:(textRuns:TextRun[]) => string): typeof $formatTextRuns{
//     return $formatTextRuns

//     function  $formatTextRuns(textRuns:TextRun[]){
//         return formatFn(textRuns)
//     }
// }

// function formatAndCombineTextRuns(...fns:Array<(textRun:string) => string>){
//     const formatFn = Pipe.of()


//     return (textRuns:TextRun[]) => fns.reduce( (prevFn, currFn) => value => currFn(prevFn(value)),  

//     )
// }

// function textRunsToString(formatFn:(textRun:TextRun) => string = (x=>`${x}`)):(textRun:TextRun[]) => string{
//     return (textRuns:TextRun[]) => textRuns.map(formatFn).reduce(combine)
// }



// // function testingzzz(docId:string){
// //     Logger.log("Hey there")
// //     const content = getDocumentBodyContent(docId)
// //         .map(getParagraph)
// //         .map(flatMapMonad(getParagraphTextRuns))
// //         .map(mapMonad(textRunsToString(textRunToAnchorTagString)))
// //         .map(mapMonad(addHtmlParagraphTags))
// //         .reduce((x, y) => Maybe.of(a => b => combine(a,b)).ap(x).ap(y))
// //         .map(x => x.concat(getMySignature()))

// //     //     .compactMap(getParagraph, isSomething)
// //     //     .compactMap(mapMonad(getParagraphTextRuns), isSomething)
// //     //     .

// //     //  .compactMap(getParagraph)
// //     //  .compactMap(getParagraphTextRuns)
// //     //  .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
// //     //  .map(addHtmlParagraphTags)
// //     //  .reduce(combine)
// //     //  .concat(getMySignature())
 
// //     Logger.log(content)
// //    }


// function testing(docId:string){
//     const content = getDocumentBodyContent(docId)
//      .compactMap(getParagraph)
//      .compactMap(getParagraphTextRuns)
//      .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
//      .map(addHtmlParagraphTags)
//      .reduce(combine)
//      .concat(getMySignature())
 
//     Logger.log(content)
//    }



// // function compose<A,B>(finalFn:(value:any) => A, ...otherFns:Function[]):(initialInput:A) => B{
// //     return initialInput => {
// //         return fns.reduceRight((curr, fn) => fn(curr), initialInput)
// //     }
// // }

// // function reduce(fn):(arr:[]) => any
// // function reduce(fn, initial):(arr:[]) => any
// // function reduce(fn, initial?:any){
// //     return arr => initial ? arr.reduce(fn, initial) : arr.reduce(fn) 
// // }

// interface mappable<A>{
//     map<B>(fn:map<A, B>): mappable<B>
// }

// interface map<A,B> {
//     (value:A): B
// }
// interface reduce<A, B> {
//     (prevValue:A, currValue?:B): A
// }
// interface reduceable<A>{
//     reduce<B>(fn:reduce<B,A>, initialValue?:B):B
// }

// interface composeableFunction<A,B,C>{
//     (lastFn:(val:B) => C, firstFn:(val:A)=>B): C
// }
// // function map<A,B>(fn:map<A,B>): (list:List<A>) => List<B>
// // function map<A,B>(fn:map<A,B>): (arr:Array<A>) => Array<B>
// // function map(fn:any): (mappableItem:any) => any{
// //     return mappableItem => mappableItem.map(fn)
// // }
// interface bigComposeableFunction<A,B,C,D>{
//     (lastFn:(val:C) => D, firstFn:composeableFunction<A,B,C>):D
// }
// function $composeMe(){
//         return 4
//     }

// interface composeable{
//     function<A extends Function[]>(...fns:A): typeof fns.reduceRight
// }
// const m:composeable = (...args)=> args.reduceRight()
// function toStr(x:number){
//     return "hello"
// }
// function withGoodbybe(x:string){
//     return x + " goodbye"
// }
// const arrOfFuncs = [withGoodbybe, toStr]
// const e = arrOfFuncs.reduceRight((prevVal, currFn) => currFn(prevVal) , 3)

// function mee(a:typeof withGoodbybe, b:typeof toStr){
//     const args:Array<typeof arguments> = Array.from(arguments)
//     const r = arguments[0]
//     return args.reduceRight((prev, curr) => curr(prev), 3) 
// }

// function composeL<R>(fn1: (a: R) => R, ...fns: Array<(a: R) => R>) {
//     return fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
// }
// function composeM<R,V,W>(fn1: (a: R) => V, ...fns: Array<(a: W) => R>) {
//     return fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
// }
// const me3 = composeL(toStr, withGoodbybe)(6)
// function compose<A,B,C>(fn:composeableFunction<A,B,C>, ...otherFns:[]){
//     otherFns.red
// }
// // function  composeA<A,B>(lastFn:(val:any) => B, firstFn:(val:A)=>any):(initialValue:A) => B{
// //     return initialValue => lastFn(firstFn(initialValue))
// // }


// // function map<A,B>(fn:map<A,B>): typeof $map{
// //     return $map

// //     function $map(maybe:Maybe<A>):Maybe<B>
// //     function $map(arr:Array<A>): Array<B>
// //     function $map(list:List<A>): List<B>
// //     function $map(mappableItem:mappable<A>):mappable<B>{
// //         return mappableItem.map(fn)
// //     }
// // }

// function reduce<A,B>(fn:reduce<A,B>): typeof $reduce{
//     return $reduce

//     function $reduce(list:List<A>, initialValue?:B):B
//     function $reduce(list:List<A>):A
//     function $reduce(arr:Array<A>, initialValue?:B):B
//     function $reduce(arr:Array<A>):A
//     function $reduce(reduceableItem:any, initialValue?:any):any{
//         return initialValue ? reduceableItem.reduce(fn, initialValue) : reduceableItem.reduce(fn)
//     }
// }


// function giveMeStr<A>(x:number): (second:Array<A>) => number
// function giveMeStr<A>(x:number): (second:List<A>) => string
// function giveMeStr(x:any):any{
//     return second => x
// }

// //https://stackoverflow.com/questions/48892283/typescript-overload-considers-only-one-of-the-overloaded-signatures
// // typescript overloads do not work well when returning functions
// function base<A>(x:number):typeof giveYouResult{
//     return giveYouResult
//     function giveYouResult(second:Array<A>): number
//     function giveYouResult(second:List<A>):string
//     function giveYouResult(second:any): any{
//         return x
//     }
// }
// // giveMeStr(3, [4]).toExponential()
// // giveMeStr(3, List.of(4)).at
// // giveMeStr(3)(List.fromArr([3]))
// // base(3)(List.fromArr([3]))


// // function reduce<A,B>(fn:reduce<A,B>): (list:List<A>, initialValue?:B) => B
// // function reduce<A,B>(fn:reduce<A,B>): (list:List<A>, initialValue?:B) => B
// // function reduce<A,B>(fn:reduce<A,B>): (arr:Array<A>, initialValue?:A) => A
// // function reduce<A,B>(fn:reduce<A,B>): (arr:Array<A>, initialValue?:A) => A
// // function reduce<A,B>(fn:reduce<A,B>):(reduceableItem:reduceable<B>, initialValue?:any) => any{
// //     return (reduceableItem:reduceable<B>, initialValue?:A) => initialValue ? reduceableItem.reduce(fn, initialValue) : reduceableItem.reduce(fn)
// // }

// const arr = [1,2,3]

// function combineIntoAnchorTags(textRuns:TextRun[]):string{
//     map(textRunToAnchorTagString,)(textRuns)
//     const add = (x:number,y:number) => x + y
//     reduce(add)(List.fromArr(arr), 0)

//     // map(textRunToAnchorTagString, textRuns)
//     const combo = composeA(reduce(combine), textRunToAnchorTagString)
//     return textRuns.map()
// }



// function testing2(docId:string){
//    const content = getDocumentBodyContent(docId)
//     .compactMap(getParagraph)
//     .compactMap(getParagraphTextRuns)
//     .map(textRuns => textRuns.map(textRunToAnchorTagString).reduce(combine))
//     .map(addHtmlParagraphTags)
//     .reduce(combine)
//     .concat(getMySignature())

//    Logger.log(content)
//   }

//   function getMySignature(){
//     return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
//   }

// function makeContentWithUrl(content:string, url:string):string{
//     return `<a href="${url}", target="_blank">${content}</a>`
//     }



// // export type ExtractFunctionArguments<Fn> = Fn extends  ( ...args: infer P ) => any  ? P : never
// // export type ExtractFunctionReturnValue<Fn> = Fn extends  ( ...args: any[] ) => infer P  ? P : never
// // type BooleanSwitch<Test, T = true, F = false> = Test extends true ? T : F
// // export type AnyFunction = ( ...args: any[] ) => any
// // type Arbitrary = 'It was 1554792354 seconds since Jan 01, 1970 when I wrote this' 
// // type IsAny<O, T = true, F = false> = Arbitrary extends O
// //   ? any extends O
// //     ? T
// //     : F
// //   : F
    
// // type Pipe<Fns extends any[], IsPipe = true, PreviousFunction = void, InitalParams extends any[] = any[], ReturnType = any> = {
// //     'next': ( ( ..._: Fns ) => any ) extends ( ( _: infer First, ..._1: infer Next ) => any )
// //         ? PreviousFunction extends void
// //             ? Pipe<Next, IsPipe, First, ExtractFunctionArguments<First>, ExtractFunctionReturnValue<First> >
// //             : ReturnType extends ExtractFunctionArguments<First>[0]
// //             ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First> >
// //             : IsAny<ReturnType> extends true
// //                 ? Pipe<Next, IsPipe, First, InitalParams, ExtractFunctionReturnValue<First> >
// //                 : {
// //                 ERROR: ['Return type ', ReturnType , 'does comply with the input of', ExtractFunctionArguments<First>[0]],
// //                 POSITION: ['Position of problem for input arguments is at', Fns['length'], 'from the', BooleanSwitch<IsPipe, 'end', 'beginning'> , 'and the output of function to the ', BooleanSwitch<IsPipe, 'left', 'right'>],
// //                 }
// //         : never
// //     'done': ( ...args: InitalParams ) => ReturnType,
// //     }[
// //     Fns extends []
// //         ? 'done'
// //         : 'next'
// //     ]

// // const pipe:Pipe = (...fns){
// //     return fns.reduce(())
// // }




// // function getNum(x: number):number{
// //     return x
// // }
// // function toString(x: number):string{
// //     return x.toString()
// // }
// // function concatToHello(x:string):string{
// //     return x.concat("Hello")
// // }

// // function testingPipe(){
// //     console.log(
// //         Pipe.of(getNum)
// //             .addToPipe(toString)
// //             .addToPipe(concatToHello)
// //             .evaluate(3)
// //     )
// //     console.log(
// //        Compose.of(concatToHello)
// //         .compose(toString)
// //         .compose(getNum)
// //         .evaluate(300)
// //     )
// //     // console.log(
// //     //     Compose.of(
// //     //         concatToHello,
// //     //         toString,
// //     //         getNum
// //     //     )
// //     // )

// // }

// // function compose<A, B>(fn1: (value:any) => A, ...args: [...Array<(value:unknown) => unknown>, (value:B) => any]){
// //     return args.reduceRight((prev, curr) => value => curr(prev(value)), fn1)
// // }

// // compose()

// // function pipe(...args:[(value: unknown) => unknown, (value:string) => number]){
// //     return args.reduce((prev, curr) => prev.addToPipe(curr), Pipe.of(x => x))
// // }