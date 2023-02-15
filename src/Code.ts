import { EmailConstructor } from "./Classes/EmailConstructor"
// import { DocumentToHtmlMapper } from "./Classes/HtmlMapper"
import { GmailTemplate } from "./Classes/EmailTemplates"
// import { CustomEmail } from "./Classes/CustomEmail"
import { MyDocument } from "./Classes/DocumentStructure"

function callTesting(){
  // myTest4('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo')
  buildMyDocz()
}

function myTest4(docId){
  const emailConstructor = new EmailConstructor(
      new DocumentToHtmlMapper(), 
      GmailTemplate.createNew(CustomEmail)
  )

  const email = emailConstructor.createEmailHtmlFromDocument(
      MyDocument.of(Docs.Documents.get(docId)), 
      "oliver@urbanupbound.org", 
      "This is a test",
      {senderDisplayName: "Oliver Cummings"}
  )
  email.send()
}

function doGet(){
  return HtmlService.createTemplateFromFile('index').evaluate()
}

// function sendMonthlyWCBDIEmail() {
//     const date = CustomDate.of(new Date())
//     Logger.log('Sending Email')
//     GmailApp.sendEmail('oliver@urbanupbound.org', `TA/Edu Services for ${date.month}`, null, EmailTemplate.create(date, new HtmlFormatter()))
//     Logger.log('The email has been sent')
//   }
  

  


  

  

  