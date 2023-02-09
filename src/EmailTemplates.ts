import { Email, EmailOptions } from "./Email";
import { Maybe } from "./Monads/Maybe";


class GmailOptions implements EmailOptions{
    recipient: string
    subject:string
    body?:string
    options?:Maybe<Partial<GmailOptionsObject>>

    private constructor(recipient:string, subject:string, body?:string, options:Partial<GmailOptionsObject> = {} ){
        this.recipient = recipient
        this.subject = subject
        this.body = body
        this.options = Maybe.of(options)
    }

    static createOptions(recipient:string, subject:string, body:string, options?:OmitHtmlBody<GmailOptionsObject>){
        return new GmailOptions(recipient, subject, body, options)
    }

    static createHtmlBodyOptions(recipient:string, subject:string, options:GmailOptionsObject){
        return new GmailOptions(recipient, subject, null, options)
    }
}

interface GmailOptionsObject extends GoogleAppsScript.Gmail.GmailAdvancedOptions{
    htmlBody:string
}



type OmitHtmlBody<Type> = Omit<Type, "htmlBody">

// GmailApp.sendEmail()
// const recipeient = "oliver@urbanupbound.org"
// const subject = "Testing"

export const GmailTemplate = Email.createTemplate(
    (options: EmailOptions) => {
        const gmailOptions:GmailOptionsObject = {
            htmlBody:options.htmlBody,
            name:options.senderDisplayName
        }
        return GmailOptions.createHtmlBodyOptions(options.recipient, options.subject, gmailOptions)
    },
    (options:GmailOptions) => Logger.log(
        `recipient:${options.recipient}`,
        `subject: ${options.subject}`,
        `body: ${options.body || "NO BODY FOUND"}`,
        `options: ${options.options.orElse({})}`
    )
)