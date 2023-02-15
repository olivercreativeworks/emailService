import { MyDocument } from "./DocumentStructure"
import { Maybe } from "../Monads/Maybe"
// import { HtmlMapper } from "../Interfaces/HtmlMapper"


export interface EmailTemplate<TemplateType>{
    populateTemplate(options:EmailOptions):EmailTemplate<TemplateType>
}

export interface Email{
    send():void
}
export type EmailSender<A> = (email:A) => void
export type EmailOptionsMapper<A> = (options: EmailOptions) => A 

export interface EmailOptions{
    recipient:string
    subject:string
    body?:string
    senderDisplayName?:string
    htmlBody?:string
}



export interface GmailOptionsObject extends GoogleAppsScript.Gmail.GmailAdvancedOptions{
    htmlBody:string
}

export type OmitHtmlBody<Type> = Omit<Type, "htmlBody">

export interface EmailTemplateCreator{
   createTemplate<TemplateType>(optionsMapper:EmailOptionsMapper<TemplateType>, sender:EmailSender<TemplateType>): CustomEmail<TemplateType>
}


export class EmailConstructor<TemplateType extends EmailOptions>{
    private htmlMapper:HtmlMapper
    private emailTemplate: CustomEmail<TemplateType>

    constructor(x:HtmlMapper, emailTemplate:CustomEmail<TemplateType>){
        this.htmlMapper = x
        this.emailTemplate = emailTemplate
    }

    of(x:HtmlMapper,emailTemplate:CustomEmail<TemplateType>):EmailConstructor<TemplateType>{
        return new EmailConstructor(x, emailTemplate)
    }

    createEmailHtmlFromDocument(document:MyDocument, recipient, subject, otherOptions:Omit<Partial<EmailOptions>, "recipient" | "subject"> ={}):CustomEmail<TemplateType>{
        const html = this.htmlMapper.mapFromDocument(document).map(appendSignatureHtml)
        const email = this.emailTemplate.populateTemplate({recipient, subject, htmlBody:html.orElse(null), ...otherOptions})
        return email

        function appendSignatureHtml(text:string):string{
            return combineStrings(text, getMySignature())
        }

        function combineStrings(a:string, b:string):string{
            return a.concat(b)
        }
    
        function getMySignature(){
            return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
        }
    }
}

export class CustomEmail<TemplateType> implements Email, EmailTemplate<TemplateType>{
    private options: Maybe<TemplateType>
    private sendFn:EmailSender<TemplateType>
    private optionsMapper:EmailOptionsMapper<TemplateType>

    private constructor(options:TemplateType, optionsMapper:EmailOptionsMapper<TemplateType>, sender:EmailSender<TemplateType>){
        this.options = Maybe.of(options)
        this.sendFn = sender
        this.optionsMapper = optionsMapper
    }

    static createTemplate<A>(optionsMapper:EmailOptionsMapper<A>, sender:EmailSender<A>):CustomEmail<A>{
        return new CustomEmail(null, optionsMapper, sender)
    }

    populateTemplate(options:EmailOptions):CustomEmail<TemplateType>{
        const mappedOptions = this.optionsMapper(options)
        return new CustomEmail(mappedOptions, this.optionsMapper, this.sendFn)
    }

    send():void{
        this.options.map(this.sendFn)
    }
}