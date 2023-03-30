import { List } from "../Utility/List"
import { Html, HtmlTags } from "./HtmlCreator"

export type Email = `${string}@${string}`

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

export function sendEmail(recipients:List<Email>, subject:string, htmlBody:Html<HtmlTags>):void{
    const recipientsAsString = recipients.asArray().join(",")
    const validSubject = EmailSubjectLengthValidator.validate(subject, EmailSubjectValidatonError.subjectIsTooLongError)
    GmailApp.sendEmail(recipientsAsString, validSubject, null, {htmlBody})
}