import { DocsDocumentModel } from "./_Simple/DocsDocumentModel"
import { HtmlConverter } from "./_Simple/OneFile"
import { Funcs } from "./Utility/Utility"

function main(){
    HtmlConverter.docsToHtml()
    // const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    // const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel
    // const convertedDoc1 = HtmlConverter.convertDocToHtml(doc1)
    // const convertedDoc2 = HtmlConverter.convertDocToHtml(doc2)
    // const concatDocs = Funcs.curryLiftA2(
    //     Funcs.concatStrings, 
    //     convertedDoc1, 
    //     convertedDoc2
    // )
    // concatDocs.map(Logger.log)
    
    // const email = Email.of(emailAttributes).send()
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