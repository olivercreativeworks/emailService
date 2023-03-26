import { DocsDocumentModel } from "../Models/DocsDocumentModel"
import { DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel"
import { List } from "../Monads/List"
import { DocsToHtmlMapper } from "./DocsToHtmlMapper"
import { Paragraph } from "./ParagraphElements/ParagraphElements"


export type documentContentToHtmlMapper = (documentContent:List<Paragraph>, imageProps?:DocsInlineObjectsModel) => string


function myTime3(){
    const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel
    Logger.log(DocsToHtmlMapper.concatDocs(doc1, doc2))
}
