import { List } from "../Monads/List"
export type Email = `${string}@${string}`

const HtmlTagsConst = {
    p:"p",
    a:"a",
    img:"img",
} as const

type HtmlTags = typeof HtmlTagsConst[keyof typeof HtmlTagsConst]
export type HtmlStructure<TagName extends HtmlTags> = `<${TagName}${string}>${string}</${TagName}>`

type Html<tag extends HtmlTags> = {
    [P in HtmlTags]: HtmlStructure<P>
}[tag]

export type HtmlParagraph = Html<"p">


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