import { CustomDate } from "./CustomDate"
import { HtmlFormatter } from "./HtmlFormatter"
// import { EmailTemplate } from "./EmailTemplate"

function callTesting(){
  // Logger.log(getHtmlEmailWithSignature())

  myTest4('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo')
  // testingzzz('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo')
  // testingPipe()
}

function doGet(){
  return HtmlService.createTemplateFromFile('index').evaluate()
}

function sendMonthlyWCBDIEmail() {
    const date = CustomDate.of(new Date())
    Logger.log('Sending Email')
    GmailApp.sendEmail('oliver@urbanupbound.org', `TA/Edu Services for ${date.month}`, null, EmailTemplate.create(date, new HtmlFormatter()))
    Logger.log('The email has been sent')
  }
  

  


  

  

  