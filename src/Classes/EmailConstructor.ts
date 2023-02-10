import { MyDocument } from "./DocumentStructure"
import { EmailOptions } from "../Interfaces/Email"
import { CustomEmail } from "./CustomEmail"
import { HtmlMapper } from "../Interfaces/HtmlMapper"


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
