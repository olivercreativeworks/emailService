import { DocsToHtmlMapper } from "./Main/ParagraphElements/DocsToHtmlMapper"
import { Email, sendEmail } from "./Main/Email"
import { DocsDocumentModel } from "./Models/DocsDocumentModel"
import { List } from "./Utility/List"


function myTime3(){
    const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel
    
    const docsHtml = DocsToHtmlMapper.concatDocs(doc1, doc2)
    const subjectLine =  "Testing this new email"
    const recipients:List<Email> = List.of("oliver@urbanupbound.org")
    
    docsHtml.map(html => sendEmail(recipients, subjectLine, html))
}
