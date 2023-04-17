import { List } from "../Utility/List"


export type EmailAddress = `${string}@${string}`

class EmailSubjectLengthValidator{
    static getMaxSubjectLength(){
        return 250
    }
    static validate(subject:string, throwErrorFn: (maxLength:number) => never):string | never{
        const maxLength = EmailSubjectLengthValidator.getMaxSubjectLength()
        return subject.length < maxLength ? subject : throwErrorFn(maxLength)
    }
}

class EmailSubjectValidatonError{
    static subjectIsTooLongError(maxLength:number):never{
        throw new Error(`The subject must be ${maxLength} characters or less.`)
    }
}

export namespace Email{
    export function createEmail(recipients:List<EmailAddress>, subject:string, htmlBody:string):IEmail{
        const validSubject = EmailSubjectLengthValidator.validate(subject, EmailSubjectValidatonError.subjectIsTooLongError)
        return {recipients, subject:validSubject, htmlBody}
    }
}


interface IEmail{
    recipients: List<EmailAddress>
    subject: string
    htmlBody: string
}

export function sendEmail(email:IEmail):void{
    const recipientsAsString = email.recipients.asArray().join(",")
    GmailApp.sendEmail(recipientsAsString, email.subject, null, {"htmlBody":email.htmlBody,"name":"Oliver Allen-Cummings"})
}