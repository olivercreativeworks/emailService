import { GoogleDocs } from "./_Simple/GoogleDocsDocumentModel"
import { HtmlMapper } from "./_Simple/HtmlConverter"


function main(){
    const docs = getIds().map(getDoc)
    const htmlBody = HtmlMapper.docsToHtml(...docs)
    Logger.log(htmlBody)
    if (htmlBody.length == 0){
        
    }
    // const email = Email.createEmail(
    //     List.of("oliver@urbanupbound.org"),
    //     "Testing this new email",
    //     htmlBody
    // )
    // Email.sendEmail(email, "Oliver Allen-Cummings")
}

function getDoc(docId:string):GoogleDocs.DocumentModel{
    return Docs.Documents.get(docId) as GoogleDocs.DocumentModel
}
function getIds(){
    return ['1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo', '1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI']
}

function doGet(){
    return HtmlService.createHtmlOutputFromFile("src/index")
  }