// // import { Email, EmailOptions } from "../Interfaces/Email";
// import { Maybe } from "../Monads/Maybe";
// import { GmailOptionsObject, OmitHtmlBody, EmailTemplateCreator } from "./Email";

// interface EmailSender<TemplateType>{
//     customSendFn:(email:Email) => Email
//     send(t:TemplateType):void
// }

// class GmailOptions implements EmailOptions{
//     recipient: string
//     subject:string
//     body?:string
//     private options?:Maybe<Partial<GmailOptionsObject>>

//     private constructor(recipient:string, subject:string, body?:string, advancedOptions:Partial<GmailOptionsObject> = {} ){
//         this.recipient = recipient
//         this.subject = subject
//         this.body = body
//         this.options = Maybe.of(advancedOptions)
//     }

//     static createOptions(recipient:string, subject:string, body:string, options?:OmitHtmlBody<GmailOptionsObject>){
//         return new GmailOptions(recipient, subject, body, options)
//     }

//     static createHtmlBodyOptions(recipient:string, subject:string, options:GmailOptionsObject){
//         return new GmailOptions(recipient, subject, null, options)
//     }

//     get advancedOptions():Partial<GmailOptionsObject>{
//         return this.options.map(advancedOptions => Object.assign({}, advancedOptions)).orElse({})
//     }
// }

// export class GmailTemplate{
//     // Use the createNew method to create an Email Template
//     private constructor(){
//         throw Error("Use the createNew static method to create an Email Template")
//     }
//     static createNew(templateCreator: EmailTemplateCreator){
//         return templateCreator.createTemplate(
//             GmailTemplate.mapEmailOptionsToGmailOptions,
//             GmailTemplate.sendGmail
//         )
//     }
    
//     static mapEmailOptionsToGmailOptions(options: EmailOptions): GmailOptions{
//         const gmailOptions:GmailOptionsObject = {
//             htmlBody:options.htmlBody,
//             name:options.senderDisplayName
//         }
//         return GmailOptions.createHtmlBodyOptions(options.recipient, options.subject, gmailOptions)
//     }

//     static sendGmail(options:GmailOptions):void{
//         GmailApp.sendEmail(
//             options.recipient, 
//             options.subject, 
//             options.body, 
//             options.advancedOptions
//         )
//     }
//     private static logGmailOptions(options:GmailOptions):void{
//         Logger.log(
//                 `recipient:${options.recipient},
//                 subject: ${options.subject},
//                 body: ${options.body || "NO BODY FOUND"},
//                 options: ${options.advancedOptions.name}`
//             )
//     }
// }