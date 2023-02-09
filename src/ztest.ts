import { List } from "./Monads/List"
import { Maybe } from "./Monads/Maybe"
import { MonadDefinitions } from "./Monads/Interfaces"
import { Pipe } from "./Monads/Pipe"

type Monad<A> = MonadDefinitions.Monad<A>

interface Link{
    url?:string
}
interface TextStyle{
    link?:Link
}
type TextContent = string

interface TextRun{
    content?: TextContent
    textStyle?:TextStyle
}
interface HtmlTextRun{
    textRun:TextRun
    asHtmlString: string
}

interface ParagraphElement{
    textRun?:TextRun
}
interface Paragraph{
    elements?:ParagraphElement[]
}

interface BodyContent{
    paragraph?:Paragraph
}

interface Body{
    content?:BodyContent[]
}

interface Document{
    body?:Body
}

    function getDoc(){
        return Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo')
    }

    function getBody(doc:Document = getDoc()):Maybe<Body>{
        return Maybe.of(doc.body)
    }

    function getBodyContent():Maybe<List<BodyContent>>{
        return getBody()
            .map(body => body.content)
            .map(List.fromArr)
    }

    function getParagraphs():Maybe<List<Paragraph>>{
        return getBodyContent().flatMap(getParagraphsFromContentList)
    }

    function getParagraphElements():Maybe<List<List<ParagraphElement>>>{
        return getParagraphs().flatMap(getParagraphElementsFromParagraphsList)
    }

    function getTextRun(paragraphElement:ParagraphElement):Maybe<TextRun>{
        return Maybe.of(paragraphElement.textRun)
    }

    function getTextRuns():Maybe<List<List<TextRun>>>{
        return getParagraphElements().flatMap(getTextRunsList)
    }

    function getHtmlTextRuns():Maybe<List<List<HtmlTextRun>>>{
        return getTextRuns().map(getHtmlTextRun)
    }

    function getHtmlParagraphs():Maybe<List<string>>{
        return getHtmlTextRuns()
            .map(htmlTextRunsList => htmlTextRunsList.map(transformHtmlTextRunsToString))
            .map(stringHtmlTextRuns => stringHtmlTextRuns.map(addHtmlParagraphTags))
    }
    function getTextAsHtmlString():Maybe<string>{
        return getHtmlParagraphs().map(stringParagraphs => stringParagraphs.reduce(combineStrings))
    }

    function getHtmlEmailWithSignature():Maybe<string>{
        return getTextAsHtmlString().map(appendSignatureHtml)
    }

    function appendSignatureHtml(text:string):string{
        return combineStrings(text, getMySignature())
    }

    function getMySignature(){
        return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
      }

    function transformHtmlTextRunsToString(htmlTextRuns:List<HtmlTextRun>): string{
        return htmlTextRuns.reduce(combineStringAndHtmlTextRun, " ").trim()
    }
    // getHtmlParagraphs(){
    //     return getHtmlTextRuns().map(htmlTextRunsList => htmlTextRunsList.reduce(
    //         (initial:string, curr:List<HtmlTextRun>) => initial.concat(curr.reduce(
    //             (initial: string, curr:HtmlTextRun) => initial.concat(curr.asHtmlString), "")),
    //             ""
    //     ))
    // }
    function htmlTextRunsToStringParagraph(stringParagraph: string, htmlTextRuns:List<HtmlTextRun>){
        return htmlTextRuns.reduce(combineStringAndHtmlTextRun, stringParagraph)
    }
    
    function combineStringAndHtmlTextRun(str: string, htmlTextRun:HtmlTextRun):string{
        return combineStrings(str, htmlTextRun.asHtmlString)
    }

    function combineStrings(a:string, b:string):string{
        return a.concat(b)
    }

    function getHtmlTextRun(textRunsList: List<List<TextRun>>):List<List<HtmlTextRun>>{
        return textRunsList.map(innerList => innerList.map(enhanceTextRuns))
    }

    function enhanceTextRuns(textRun:TextRun): HtmlTextRun{
        return { textRun, asHtmlString: textRunToAnchorTagString(textRun)}
    }

    function getTextRunsList2(paragraphElementList:List<ParagraphElement>):Maybe<List<TextRun>>{
        return paragraphElementList.map(getTextRun).sequence(Maybe.of)
    }

    function getTextRunsList(paragraphElementList:List<List<ParagraphElement>>):Maybe<List<List<TextRun>>>{
        return paragraphElementList.map(getTextRunsList2).sequence(Maybe.of)
    }
    
    function getX(){
        return getParagraphElements().map(x => x.map(y => y.map(element => element.textRun)))
    }

    function getParagraphElement(paragraph:Paragraph):Maybe<List<ParagraphElement>>{
        return Maybe.of(paragraph.elements).map(List.fromArr)
    }

    function getParagraphElementsFromParagraphsList(paragraphs:List<Paragraph>):Maybe<List<List<ParagraphElement>>>{
        return paragraphs.map(getParagraphElement).sequence(Maybe.of)
    }

    function isSomething<A>(value: Maybe<A>){
        return value.isSomething()
    }

    function getParagraphsFromContentList(bodyContent:List<BodyContent>):Maybe<List<Paragraph>>{
        return bodyContent.map(getParagraph)
            .filter(isSomething)
            .sequence(Maybe.of)
    }

    function getParagraph(bodyContent:BodyContent): Maybe<Paragraph>{
        return Maybe.of(bodyContent.paragraph)
    }

    function getDocumentBodyContent(docId:string): List<BodyContent>{
        return List.fromArr(Docs.Documents.get(docId).body.content)
    }


    function textRunToAnchorTagString(textRun:TextRun):string{
        const url = textRun?.textStyle?.link?.url
        const content = textRun.content
        return url ? makeContentWithUrl(content, url) : content
    }
    
    function combine(a:string, b:string):string{
        return a + b
    }
    
    function addHtmlParagraphTags(text:string):string{
        return `<p>${text}</p>`
    }

    function makeContentWithUrl(content:string, url:string):string{
        return `<a href="${url}", target="_blank">${content}</a>`
        }
    

    
