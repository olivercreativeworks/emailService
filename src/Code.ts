import { Email, sendEmail } from "./Main/Email"
import { DocsDocumentToHtmlMapper } from "./Main/DocsToHtml/DocsMapper/DocsDocumentToHtmlMapper"
import { DocsDocument } from "./Main/InterfaceLayer/DocsElements/DocsDocument"
import { DocsDocumentModel } from "./Main/Models/DocsDocumentModel"
import { List } from "./Utility/List"
import { Utility } from "./Utility/Utility"
import { DocsToHtmlDocumentMapper } from "./Main/InterfaceLayer/MappersToDomainElements/HtmlDocumentMapper"

function main(){
    const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel

    const myDocument = DocsToHtmlDocumentMapper.from(doc1).map(DocsDocumentToHtmlMapper.createHtml)
    const myDocument2 = DocsToHtmlDocumentMapper.from(doc2).map(DocsDocumentToHtmlMapper.createHtml)
    // const myDocument = DocsDocument.from(doc1).map(DocsDocumentToHtmlMapper.createHtml)
    // const myDocument2 = DocsDocument.from(doc2).map(DocsDocumentToHtmlMapper.createHtml)
    Logger.log(myDocument)
    Logger.log(myDocument2 )

    const docsAsHtml = Utility.liftA2(doc1 => doc2 => doc1.concat(doc2), myDocument, myDocument2)
    docsAsHtml.map(Logger.log)

    // // Utility.liftA2(x=>y=> x.concat(y), myDocument, myDocument2).map(Logger.log)
    // // const docsHtml = concatDocs(doc1, doc2)
    // // // const docsHtml = DocsToHtmlMapper.concatDocs(doc1, doc2)
    // const subjectLine =  "Testing this new email"
    // const recipients:List<Email> = List.of("oliver@urbanupbound.org")
    
    // docsAsHtml.map(html => sendEmail(recipients, subjectLine, html))
}

function doGet(){
    return HtmlService.createHtmlOutputFromFile("src/index")
  }