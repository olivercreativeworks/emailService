import { List } from "../Utility/List"

export type EmailAddress = `${string}@${string}`

interface IEmail{
    recipients: List<EmailAddress>
    subject: string
    htmlBody: string
}

export namespace Email{
    
    export function createEmail(recipients:List<EmailAddress>, subject:string, htmlBody:string):IEmail{
        return {recipients, subject, htmlBody}
    }
    
    export function sendEmail(email:IEmail, name:string):void{
        const recipients = email.recipients.toString(",")
        const subject = email.subject
        const body = null
        const htmlBody = email.htmlBody
        
        GmailApp.sendEmail(recipients, subject, body, {htmlBody, name})
    }
}