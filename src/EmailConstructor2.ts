import { Document } from "./DocumentStructure"
import { Email, EmailOptions } from "./Email"
import { DocumentToHtmlMapper, HtmlMapper } from "./HtmlMapper"
import { GmailTemplate } from "./EmailTemplates"


function myTest4(docId){
    // const emailTemplate = Email.createTemplate(
    //     (options:EmailOptions) => options, 
    //     (email:EmailOptions) => Logger.log(email)
    // )

    const emailConstructor = new EmailConstructor(
        new DocumentToHtmlMapper(), 
        GmailTemplate
    )

    const email = emailConstructor.createEmailHtmlFromDocument(
        Document.of(Docs.Documents.get(docId)), 
        "oliver@urbanupbound.org", 
        "This is a test"
    )

    Logger.log("THE EMAILZ!!!!!")
    Logger.log(email)
    Logger.log("Sending...")
    email.send()

    // GmailApp.sendEmail(
    //     // recipeient: string, subject:string, body:string , options:googleappsscript.gmail.gmailadvancedoptions
    // )
}
function myTest3(docId){
    const emailTemplate = Email.createTemplate(
        (options:EmailOptions) => options, 
        (email:EmailOptions) => Logger.log(email)
    )

    const emailConstructor = new EmailConstructor(
        new DocumentToHtmlMapper(), 
        emailTemplate
    )

    const email = emailConstructor.createEmailHtmlFromDocument(
        Document.of(Docs.Documents.get(docId)), 
        "oliver@urbanupbound.org", 
        "This is a test"
    )

    Logger.log("THE EMAILZ!!!!!")
    Logger.log(email)
    Logger.log("Sending...")
    email.send()

    // GmailApp.sendEmail(
    //     // recipeient: string, subject:string, body:string , options:googleappsscript.gmail.gmailadvancedoptions
    // )
}

class EmailConstructor<TemplateType extends EmailOptions>{
    private htmlMapper:HtmlMapper
    private emailTemplate: Email<TemplateType>

    constructor(x:HtmlMapper, emailTemplate:Email<TemplateType>){
        this.htmlMapper = x
        this.emailTemplate = emailTemplate
    }

    of(x:HtmlMapper,emailTemplate:Email<TemplateType>):EmailConstructor<TemplateType>{
        return new EmailConstructor(x, emailTemplate)
    }


    createEmailHtmlFromDocument(document:Document, recipeient, subject, otherOptions?:EmailOptions):Email<TemplateType>{
        const html = this.htmlMapper.mapFromDocument(document).map(appendSignatureHtml)
        const email = html.isSomething() ? 
            this.emailTemplate.populateTemplate({recipient: recipeient, subject, htmlBody:html.unsafeUnwrap()}) :
            this.emailTemplate.populateTemplate({recipient: recipeient, subject}) // should we throw an error if there's no html?
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
