import { CustomEmail } from "../Classes/CustomEmail" 

export type EmailSender<A> = (email:A) => void
export type EmailOptionsMapper<A> = (options: EmailOptions) => A 

export interface EmailOptions{
    recipient:string
    subject:string
    body?:string
    senderDisplayName?:string
    htmlBody?:string
}

export interface EmailTemplate<TemplateType>{
    populateTemplate(options:EmailOptions):EmailTemplate<TemplateType>
}

export interface Email{
    send():void
}

export interface GmailOptionsObject extends GoogleAppsScript.Gmail.GmailAdvancedOptions{
    htmlBody:string
}

export type OmitHtmlBody<Type> = Omit<Type, "htmlBody">

export interface EmailTemplateCreator{
   createTemplate<TemplateType>(optionsMapper:EmailOptionsMapper<TemplateType>, sender:EmailSender<TemplateType>): CustomEmail<TemplateType>
}