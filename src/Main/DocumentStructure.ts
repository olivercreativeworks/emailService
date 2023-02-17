import { List, toList } from "../Monads/List"
import { Maybe } from "../Monads/Maybe"
import { UnwrapMaybe } from "../Monads/Maybe"
import { isSomething } from "../Monads/Maybe"
import { DocsDocument, DocsBody, DocsBodyContent, DocsParagraph, DocsTextRun, DocsParagraphElement } from "./GoogleDocsStructure"
import { MyHtmlMapper } from "./HtmlMapper"

export interface Document{
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
}



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
