import { CustomDate } from "./CustomDate"
import { HtmlFormatter } from "./HtmlFormatter"
import { EmailTemplate } from "./EmailTemplate"

function doGet(){
  return HtmlService.createTemplateFromFile('index').evaluate()
}

function sendMonthlyWCBDIEmail() {
    const date = CustomDate.of(new Date())
    Logger.log('Sending Email')
    GmailApp.sendEmail('oliver@urbanupbound.org', `TA/Edu Services for ${date.month}`, null, EmailTemplate.create(date, new HtmlFormatter()))
    Logger.log('The email has been sent')
  }
  

  


  

  

  