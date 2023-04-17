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

interface Email{
    recipients: List<EmailAddress>
    subject: string
    htmlBody: string
}

export function sendEmail(email:Email):void{
    const recipientsAsString = email.recipients.asArray().join(",")
    const validSubject = EmailSubjectLengthValidator.validate(email.subject, EmailSubjectValidatonError.subjectIsTooLongError)
    GmailApp.sendEmail(recipientsAsString, validSubject, null, {"htmlBody":email.htmlBody,"name":"Oliver Allen-Cummings"})
}