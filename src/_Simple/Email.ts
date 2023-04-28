import { List } from "../Utility/List"

type EmailAddress = `${string}@${string}`

interface Email{
    recipients: List<EmailAddress>
    subject: string
    htmlBody: string
}

export namespace Email{

    export function createEmail(recipients:List<EmailAddress>, subject:string, htmlBody:string):Email{
        return {recipients, subject, htmlBody}
    }
    
    export function sendEmail(email:Email, senderDisplayName?:string):void{
        const recipients = email.recipients.toString(",")
        const subject = email.subject
        const body = null
        const htmlBody = email.htmlBody
        
        GmailApp.sendEmail(recipients, subject, body, {htmlBody, name: senderDisplayName})
    }
}