import { DocsDocumentModel, DocsTextRunModel} from "../Models/DocsDocumentModel"
import { MyHtmlMapper } from "./HtmlMapper"
import { SimplifiedDocsDocument } from "../Models/SimplifiedDocsDocumentModel"
import { Document, IParagraph, TextRun } from "../Models/DocumentModel"


export function mymain(docsDocument:DocsDocumentModel){
    const simplifiedDoc = SimplifiedDocsDocument.of(docsDocument).textRuns
        .map(Document.fromList)
        .map(document => document.mapParagraphBaseUnit(docsTextRunToTextRun))
        .map(document => document.mapParagraphBaseUnit(textRunsToHtml))
        .map(document => document.paragraphs.reduce(paragraphsToHtml, ' '))
        // .map(document => document.mapParagraphBaseUnit())
    Logger.log(simplifiedDoc)
    return simplifiedDoc

    function paragraphsToHtml(initial:string, paragraph:IParagraph<string>):string{
        const htmlMapper = new MyHtmlMapper()
        const paragraphAsString = paragraph.$baseUnits.reduce((a:string, b:string) => a.concat(b))
        return initial.concat(htmlMapper.addParagraphTags(paragraphAsString)).trim()
    }

    function docsTextRunToTextRun(docsTextRun: DocsTextRunModel):TextRun{
        const text = docsTextRun?.content
        const url = docsTextRun?.textStyle?.link?.url
        return TextRun.of(text, url)
    }
    function textRunsToHtml(textRun:TextRun):string{
        const htmlMapper = new MyHtmlMapper()
        const url = textRun.url.orElse(null)
        const text = textRun.text.orElse(null)
        return url ? htmlMapper.addLinkTags(url, text) : text
    }
}