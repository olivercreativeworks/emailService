import { DocsDocumentModel } from "./_Simple/DocsDocumentModel"
import { Email } from "./_Simple/Email"
import { HtmlConverter } from "./_Simple/OneFile"
import { List } from "./Utility/List"

function main(){
    const docs = getIds().map(getDoc)
    const htmlBody = HtmlConverter.docsToHtml(...docs)
    const email = htmlBody.map(htmlBody => Email.createEmail(
        List.of("oliver@urbanupbound.org"),
        "Testing this new email",
        htmlBody
    ))
    email.map(Email.sendEmail)
}

function getDoc(docId:string):DocsDocumentModel{
    return Docs.Documents.get(docId) as DocsDocumentModel
}
function getIds(){
    return ['1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo', '1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI']
}

function doGet(){
    return HtmlService.createHtmlOutputFromFile("src/index")
  }