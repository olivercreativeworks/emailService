import { List, toList } from "../Monads/List"
import { Maybe } from "../Monads/Maybe"
import { DocsDocument, DocsBody, DocsBodyContent, DocsParagraph, DocsTextRun, DocsParagraphElement } from "../Interfaces/GoogleDocsStructure"
import { Document, Body, BodyContent, Paragraph, ParagraphElement, TextRun } from "../Interfaces/DocumentStructure"

export class MyDocument implements Document{
    doc: DocsDocument

    constructor(doc:DocsDocument){
        this.doc = doc
    }
    static of(doc:DocsDocument){
        return new MyDocument(doc)
    }

    get body():Maybe<MyBody>{
        return Maybe.of(this.doc.body).map(MyBody.of)
    }
}

export class MyBody implements Body{
    body:DocsBody
    constructor(body:DocsBody){
        this.body = body
    }
    static of(body:DocsBody){
        return new MyBody(body)
    }

    get bodyContent():Maybe<MyBodyContent>{
        return Maybe.of(this.body.content).map(List.fromArr).map(MyBodyContent.of)
    }
}

export class MyBodyContent implements BodyContent{
    bodyContent:List<DocsBodyContent>
    
    constructor(bodyContent:List<DocsBodyContent>){
        this.bodyContent = bodyContent
    }
    
    static of(bodyContent:List<DocsBodyContent>){
        return new MyBodyContent(bodyContent)
    }

    get paragraphs():Maybe<List<MyParagraph>>{
        return this.bodyContent.compactMap(getParagraph, paragraph => paragraph.isSomething())
            .sequence(Maybe.of)
        
        function getParagraph(bodyContent:DocsBodyContent): Maybe<MyParagraph>{
            return Maybe.of(bodyContent.paragraph).map(MyParagraph.of)
        }
    }
}

export class MyParagraph implements Paragraph{
    paragraph:DocsParagraph
    constructor(paragraph:DocsParagraph){
        this.paragraph = paragraph
    }
    static of(paragraph:DocsParagraph){
        return new MyParagraph(paragraph)
    }

    get elements():Maybe<List<MyParagraphElement>>{
            return Maybe.of(this.paragraph.elements).map(mapDocsElementsToParagraphElements)
           
            function mapDocsElementsToParagraphElements(elements:Array<DocsParagraphElement>):List<MyParagraphElement>{
                return elements.map(MyParagraphElement.of).reduce(toList, List.fromArr([]))
            }
        }
    }


export class MyParagraphElement implements ParagraphElement{
    paragraphElement: DocsParagraphElement
    constructor(paragraphElement:DocsParagraphElement){
        this.paragraphElement = paragraphElement
    }
    static of(paragraphElement:DocsParagraphElement){
        return new MyParagraphElement(paragraphElement)
    }
    get textRun():Maybe<MyTextRun>{
        return Maybe.of(this.paragraphElement.textRun).map(MyTextRun.of)
    }
}

export class MyTextRun implements TextRun{
    textRun:DocsTextRun
    content:Maybe<string>
    url:Maybe<string>
    constructor(textRun:DocsTextRun){
        this.textRun = textRun
        this.content = Maybe.of(textRun.content)
        this.url = Maybe.of(textRun?.textStyle?.link?.url)
    }

    static of(textRun:DocsTextRun){
        return new MyTextRun(textRun)
    }
}