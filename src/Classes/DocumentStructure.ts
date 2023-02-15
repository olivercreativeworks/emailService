import { List, toList } from "../Monads/List"
import { Maybe } from "../Monads/Maybe"
import { UnwrapMaybe } from "../Monads/Maybe"
import { isSomething } from "../Monads/Maybe"
import { DocsDocument, DocsBody, DocsBodyContent, DocsParagraph, DocsTextRun, DocsParagraphElement } from "../Interfaces/GoogleDocsStructure"
import { MyHtmlMapper } from "./HtmlMapper"
// import { Document, Body, BodyContent, Paragraph, ParagraphElement, TextRun } from "../Interfaces/DocumentStructure"


// interface Document{
//     paragraphs:List<Paragraph>
// }
// interface Paragraph{
//     textRuns:List<TextRun>
// }

// interface TextRun{
//     text:string
//     url:string
// }
// type WrapPropsInMaybe<Type> = {
    //     [x in keyof Type]: Maybe<Type[x]>
// }

// type SafeDocument = WrapPropsInMaybe<Document>
// type SafeParagraph = WrapPropsInMaybe<Paragraph>
// type SafeTextRun = WrapPropsInMaybe<TextRun>

// type DocumentOptions = Partial<Document>
// type ParagraphOptions = Partial<Paragraph>
// type TextRunOptions = Partial<TextRun>

// interface Document<Subunit>{
//     subunit:Subunit
// }
// interface Paragraph<Subunit>{
    //     subunit:Subunit
    // }
    
// interface TextRun{
//     text:string
//     url:string
// }

// interface Document<ParagraphType>{
//     paragraphs:List<ParagraphType>
// }
// interface Paragraph<TextRunType>{
//     textRuns:List<TextRunType>
// }

// interface TextRun{
//     text:string
//     url:string
// }
interface Document{
    paragraphs:Maybe<List<Paragraph>>
}
interface Paragraph{
    textRuns:Maybe<List<TextRun>>
}

interface TextRun{
    text:Maybe<string>
    url:Maybe<string>
}

function buildMyDocz(){
    const textrunMapper:(content:DocsTextRun) => ITextRunOptions = (content:DocsTextRun) =>{
        const url = content?.textStyle?.link?.url
        const text = content.content
        return {url, text}
    }
    const parabuilder = (mapper: (content:DocsTextRun) => ITextRunOptions) => (content:List<DocsTextRun>) => CMyParagraph.buildParagraph(CMyTextRun.buildTextRun, content.map(mapper))
    const docBuilder = (content:List<List<DocsTextRun>>) => CMyDocument.buildDocument(parabuilder(textrunMapper), content)
    const fromDocsMapper = (mapper: (doc:DocsDocument) => List<List<DocsTextRun>>) => (doc:DocsDocument) => docBuilder(mapper(doc))
    const finalMapper = (doc:DocsDocument) => Maybe.of(fromDocsMapper)
                                                    .ap(Maybe.of((docs:DocsDocument) => (myMapper(docs).orElse(null))))
                                                    .ap(Maybe.of(doc)) 
    
    const docId = '1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo'
    const docsDoc = Docs.Documents.get(docId)
    const result = finalMapper(docsDoc)
    Logger.log(result.orElse("Something went wrong..."))
    
    const theHtmlMapper = new MyHtmlMapper()
    const docAsString = result.flatMap(
        document => document.paragraphs.flatMap(
            paragraphs => paragraphs.map(
                paragraph => paragraph.textRuns.map(
                    textRuns => textRuns.map(
                        textRun => textRun.url.isSomething() ? theHtmlMapper.addLinkTags(textRun.url.orElse(null), textRun.text.orElse(null)) : textRun.text.orElse(null)
                        )
                        )
                        ).sequence(Maybe.of)
                        )
                        )
    Logger.log(docAsString)       
    const docWithParagraphTags = docAsString.map(doc => doc.map( paragraph => paragraph.reduce(concat)).map(theHtmlMapper.addParagraphTags)).map(paragraph => paragraph.reduce(concat))
    Logger.log(docWithParagraphTags.orElse("Something DEFINITELY went wrong..."))
    
    function concat(prev:string, curr:string):string{
        return prev.concat(curr)
    }
    function textRunToHtmlString(mapper: (textRun:TextRun) => string): typeof $textRunToHtmlString {
        return $textRunToHtmlString

        function $textRunToHtmlString(textRun:TextRun):string{
            return mapper(textRun)
        }
    }
    // const doc = 

    function myMapper(doc:DocsDocument):Maybe<List<List<DocsTextRun>>>{
        const textRuns = getBody(doc)
            .flatMap(getBodyContent)
            .flatMap(getDocsParagraphs)
            .flatMap(getElementsForEachParagraph)
            .flatMap(getTextRunsForEachParagraph)

        Logger.log("The Text Runs")
        Logger.log(textRuns)
        return textRuns
        
        function getBody(doc:DocsDocument):Maybe<DocsBody>{
            return Maybe.of(doc.body)
        }
        
        function getBodyContent(body:DocsBody):Maybe<List<DocsBodyContent>>{
            return Maybe.of(body.content).map(List.fromArr)
        }
        
        function getDocsParagraphs(bodyContent:List<DocsBodyContent>):Maybe<List<DocsParagraph>>{
            Logger.log("in docsparafun")
            return bodyContent.compactMap(getDocsParagraph, isSomething).sequence(Maybe.of)
            
            function getDocsParagraph(bodyContent:DocsBodyContent): Maybe<DocsParagraph>{
                Logger.log(bodyContent.paragraph)
                return Maybe.of(bodyContent.paragraph)
            }
        }
        function getElementsForEachParagraph(paragraphs:List<DocsParagraph>):Maybe<List<List<DocsParagraphElement>>>{
            return paragraphs.compactMap(getDocsParagraphElements, isSomething).sequence(Maybe.of)
            
            function getDocsParagraphElements(paragraph:DocsParagraph):Maybe<List<DocsParagraphElement>>{
                return Maybe.of(paragraph.elements).map(List.fromArr)
            }
        }

        function getTextRunsForEachParagraph(elementsForEachParagraph:List<List<DocsParagraphElement>>):Maybe<List<List<DocsTextRun>>>{
            return elementsForEachParagraph.compactMap(getTextRunsForOneParagraph, isSomething).sequence(Maybe.of)
            
            function getTextRunsForOneParagraph(elementsForOneParagraph:List<DocsParagraphElement>):Maybe<List<DocsTextRun>>{
                return elementsForOneParagraph.compactMap(getTextRun, isSomething).sequence(Maybe.of)
            }
            
            function getTextRun(paragraphElement:DocsParagraphElement):Maybe<DocsTextRun>{
                return Maybe.of(paragraphElement.textRun)
            }
        }

    }


    // const doc = docBuilder(List.of(List.fromArr(["happy", "birthday", "happy", "to", "you"])))
    // Logger.log(doc.paragraphs.orElse("Empty Document"))
    // const docBuilder = CMyDocument.buildDocument(
    //     (content: string) => CMyParagraph.buildParagraph(
    //         CMyTextRun.buildTextRun,
    //         List.fromArr([{url:content+"url", text:content+"text"}, {url:content, text:content}])
    //     ),
    //     List.fromArr(["happy", "birthday","to", "you"])
    // )
}
// function buildMyDoc(){
//     // create a document with one paragraph
//     const textrunbuilder = CMyTextRun.buildTextRun
//     const textrunoptions:List<ITextRunOptions> = List.fromArr([
//         {url: "happy", text:"birthday"},
//         {url: "happy1", text:"birthday1"},
//         {url: "happy2", text:"birthday2"},
//         {url: "happy3", text:"birthday3"},
//         {url: "happy4", text:"birthday4"}
//     ])
//     const textrunMapper:(content:string) => ITextRunOptions = (content:string) =>( {url:content+"url", text:content+"text"})
    
//     const parabuilder = (mapper: (content:string) => ITextRunOptions) => (content:List<string>) => CMyParagraph.buildParagraph(textrunbuilder, content.map(mapper))

//     const docBuilder = (content:List<List<string>>) => CMyDocument.buildDocument(parabuilder(textrunMapper), content)
//     const doc = docBuilder(List.of(List.fromArr(["happy", "birthday", "happy", "to", "you"])))
//     Logger.log(doc.paragraphs.orElse("Empty Document"))
//     // const docBuilder = CMyDocument.buildDocument(
//     //     (content: string) => CMyParagraph.buildParagraph(
//     //         CMyTextRun.buildTextRun,
//     //         List.fromArr([{url:content+"url", text:content+"text"}, {url:content, text:content}])
//     //     ),
//     //     List.fromArr(["happy", "birthday","to", "you"])
//     // )
// }
 

// type DocumentMapper = (x:DocsDocument) => Document
interface Mapper<FromType, ToDocumentType>{
    mapper:(x:FromType) => ToDocumentType
    mapFrom(type: FromType): ToDocumentType
}

type DocumentMapper<FromType> = Mapper<FromType, Document> 

class CMyDocumentMapper<FromType> implements DocumentMapper<FromType> {
    mapper: (x:FromType) => Document
    constructor(x: (x:FromType) => Document){
        this.mapper = x
    }
    mapFrom(type: FromType): Document {
        return this.mapper(type)
    }
}

// type TDocsToDocumentMapper = (doc:DocsDocument) => Document

// class DocsToDocumentMapper{
//     static mapFromDocsToDocument(doc:DocsDocument, ):Document{
//         const 
//         return
//     }
// }



class CMyDocument implements Document{
    paragraphs: Maybe<List<Paragraph>>
    constructor(paragraphs:List<Paragraph>){
        this.paragraphs = Maybe.of(paragraphs)
    }
    static buildDocument<A>(safeParagraphBuilder:(x:A) => Paragraph, content:List<A>):Document{
        const paragraphs = content.map(safeParagraphBuilder)
        return new CMyDocument(paragraphs)
    }
}

class CMyParagraph implements Paragraph{
    textRuns: Maybe<List<TextRun>>
    private constructor(textRuns:List<TextRun>){
        this.textRuns = Maybe.of(textRuns)
    }
    static buildParagraph<A>(textRunBuilder:(x:A) => TextRun, content:List<A>):Paragraph{
        const textRuns = content.map(textRunBuilder)
        return new CMyParagraph(textRuns)
    }
}

type UnwrapProps<WrappedProp> = {
    [x in keyof WrappedProp] : WrappedProp[x] extends Maybe<unknown> ? UnwrapMaybe<WrappedProp[x]> : WrappedProp[x]
}

type UnwrapedTextRun = UnwrapProps<TextRun>
type TextRunOptions = Partial<UnwrapedTextRun>
interface ITextRunOptions extends TextRunOptions{
}

class CMyTextRun implements TextRun{
    text: Maybe<string>
    url: Maybe<string>
    private constructor(options: ITextRunOptions){
        this.text = Maybe.of(options.text)
        this.url = Maybe.of(options.url)
    }
    static buildTextRun(options: ITextRunOptions){
        return new CMyTextRun(options)
    }
}

// function paragraphBuilder<A>(content: A, textRunBuilder:(x:A)=> TextRun):Paragraph{
//     return Maybe.of(List.of(textRunBuilder(content)))
// }

// function doocumentBuider(textRuns: List<List<TextRun>>, l:DocsDocument):Document{
//     return GoogleDocsToMyDocumentMapper.mapToDocument(l)
// }

// // interface DocumentMapper<FromType, ToDocumentType>{
// //     mapper:(x:FromType) => ToDocumentType
// //     mapToDocument(doc: FromType): ToDocumentType
// // }

// class MyDocumentMapper<T extends DocsDocument, U extends Document> implements DocumentMapper<T, U>{
//     mapper: (x:T) => U

//     constructor(mapperFn:(DocsDocument) => Document){
//         this.mapper = mapperFn
//     }

//     mapToDocument(doc: DocsDocument): Document {
//        return this.mapper(doc)
//     }

//     private static toDocument(paragraphs:List<Paragraph>):Document{
//         return {paragraphs: Maybe.of(paragraphs)}
//     }
//     private static toParagraph(textRuns:List<TextRun>):Paragraph{
//         return {textRuns: Maybe.of(textRuns)}
//     }
//     private static toTextRun()
    
//     private static getParagraph(content: List<DocsBodyContent>):List<Paragraph>{
//         const paragraphElements = content.map(
//             bodyContent => Maybe.of(bodyContent.paragraph)
//         ).sequence(Maybe.of)
//         .flatMap(paragraphs => paragraphs.map(
//             paragraph => Maybe.of(paragraph.elements).map(List.fromArr)
//         ).sequence(Maybe.of)
//         )

//         return

        
//     }

    
//     // private static getTextRuns(paragraphElement: ): Maybe<List<TextRun>>{
//     //     return 
//     // }
// }


// export class DocumentToHtmlMapper{
//     mapFromDocument(document:Document):Maybe<string>{
//         return DocumentToHtmlMapper.getDocumentParagraphs(document)
//         .flatMap(DocumentToHtmlMapper.getParagraphsAsHtmlString)     
//     }

//     private static getDocumentParagraphs(document:Document):Maybe<List<Paragraph>>{
//         return document.body
//         .flatMap(body => body.bodyContent)
//         .flatMap(bodyContent => bodyContent.paragraphs)
//     }

//     private static getParagraphsAsHtmlString(paragraphs:List<Paragraph>):Maybe<string>{
//         return DocumentToHtmlMapper.getParagraphsAsTextRuns(paragraphs)
//             .flatMap(DocumentToHtmlMapper.combineParagraphTextRunsIntoHtmlString)
//     }

//     private static combineParagraphTextRunsIntoHtmlString(textRunsList: List<ParagraphAsSubunit<TextRun>>):Maybe<string>{
//         return textRunsList.map(DocumentToHtmlMapper.textRunsToHtmlParagraphString)
//                 .sequence(Maybe.of)
//                 .map((list:List<string>) => list.reduce(DocumentToHtmlMapper.combineStrings))
//     }

//     private static textRunsToHtmlParagraphString(textRuns:ParagraphAsSubunit<TextRun>): Maybe<string>{
//         return DocumentToHtmlMapper.getTextRunsAsHtmlString(textRuns).map(DocumentToHtmlMapper.addParagraphTags)
//     }

//     private static getParagraphsAsTextRuns(paragraphs:List<Paragraph>):Maybe<List<ParagraphAsSubunit<TextRun>>>{
//         return DocumentToHtmlMapper.getParagraphElements(paragraphs).flatMap(DocumentToHtmlMapper.getParagraphElementsTextRuns)
//     }

//     private static getParagraphElements(paragraphs:List<Paragraph>):Maybe<List<ParagraphAsSubunit<ParagraphElement>>>{
//         return paragraphs.map(paragraph => paragraph.elements).sequence(Maybe.of)
//     }

//     private static getParagraphElementsTextRuns(paragraphElements: List<ParagraphAsSubunit<ParagraphElement>>):Maybe<List<ParagraphAsSubunit<TextRun>>>{
//         return paragraphElements.map(DocumentToHtmlMapper.getParagraphTextRun).sequence(Maybe.of)
        
//     }
//     private static getParagraphTextRun(paragraphElements: ParagraphAsSubunit<ParagraphElement>):Maybe<ParagraphAsSubunit<TextRun>>{
//         return paragraphElements.map(element => element.textRun).sequence(Maybe.of)        
//     }

//     private static combineStrings(a:string, b:string):string{
//         return a.concat(b)
//     }
    
//     private static addParagraphTags(text:string):string{
//         return `<p>${text}</p>`
//     }

//     private static getTextRunsAsHtmlString(textRuns:ParagraphAsSubunit<TextRun>):Maybe<string>{
//         return textRuns.map(DocumentToHtmlMapper.mapTextRunToHtmlString)
//         .sequence(Maybe.of)
//         .map(htmlTextRuns => htmlTextRuns.reduce(DocumentToHtmlMapper.combineStrings))
//     }

//     private static mapTextRunToHtmlString(textRun: TextRun):Maybe<string>{
//         return textRun.url.isSomething() ? 
//             Maybe.of((content:string) => (url:string) => DocumentToHtmlMapper.addLinkTags(content, url)).ap(textRun.content).ap(textRun.url) :
//             textRun.content
//     }

//     private static addLinkTags(content:string, url:string):string{
//         return `<a href="${url}", target="_blank">${content}</a>`
//     }

// }

// export class MyDocument implements Document{
//     doc: DocsDocument

//     constructor(doc:DocsDocument){
//         this.doc = doc
//     }
//     static of(doc:DocsDocument){
//         return new MyDocument(doc)
//     }

//     get body():Maybe<MyBody>{
//         return Maybe.of(this.doc.body).map(MyBody.of)
//     }
// }

// export class MyBody implements Body{
//     body:DocsBody
//     constructor(body:DocsBody){
//         this.body = body
//     }
//     static of(body:DocsBody){
//         return new MyBody(body)
//     }

//     get bodyContent():Maybe<MyBodyContent>{
//         return Maybe.of(this.body.content).map(List.fromArr).map(MyBodyContent.of)
//     }
// }

// export class MyBodyContent implements BodyContent{
//     bodyContent:List<DocsBodyContent>
    
//     constructor(bodyContent:List<DocsBodyContent>){
//         this.bodyContent = bodyContent
//     }
    
//     static of(bodyContent:List<DocsBodyContent>){
//         return new MyBodyContent(bodyContent)
//     }

//     get paragraphs():Maybe<List<MyParagraph>>{
//         return this.bodyContent.compactMap(getParagraph, paragraph => paragraph.isSomething())
//             .sequence(Maybe.of)
        
//         function getParagraph(bodyContent:DocsBodyContent): Maybe<MyParagraph>{
//             return Maybe.of(bodyContent.paragraph).map(MyParagraph.of)
//         }
//     }
// }

// export class MyParagraph implements Paragraph{
//     paragraph:DocsParagraph
//     constructor(paragraph:DocsParagraph){
//         this.paragraph = paragraph
//     }
//     static of(paragraph:DocsParagraph){
//         return new MyParagraph(paragraph)
//     }

//     get elements():Maybe<List<MyParagraphElement>>{
//             return Maybe.of(this.paragraph.elements).map(mapDocsElementsToParagraphElements)
           
//             function mapDocsElementsToParagraphElements(elements:Array<DocsParagraphElement>):List<MyParagraphElement>{
//                 return elements.map(MyParagraphElement.of).reduce(toList, List.fromArr([]))
//             }
//         }
//     }


// export class MyParagraphElement implements ParagraphElement{
//     paragraphElement: DocsParagraphElement
//     constructor(paragraphElement:DocsParagraphElement){
//         this.paragraphElement = paragraphElement
//     }
//     static of(paragraphElement:DocsParagraphElement){
//         return new MyParagraphElement(paragraphElement)
//     }
//     get textRun():Maybe<MyTextRun>{
//         return Maybe.of(this.paragraphElement.textRun).map(MyTextRun.of)
//     }
// }

// export class MyTextRun implements TextRun{
//     textRun:DocsTextRun
//     content:Maybe<string>
//     url:Maybe<string>
//     constructor(textRun:DocsTextRun){
//         this.textRun = textRun
//         this.content = Maybe.of(textRun.content)
//         this.url = Maybe.of(textRun?.textStyle?.link?.url)
//     }

//     static of(textRun:DocsTextRun){
//         return new MyTextRun(textRun)
//     }
// }
