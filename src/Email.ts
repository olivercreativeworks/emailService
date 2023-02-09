import { Maybe } from "./Monads/Maybe"
 
type EmailSender<A> = (email:A) => void
// type EmailSender<A extends EmailOptions> = (email:A) => void
type OptionsMapper<A> = (options: EmailOptions) => A 

export interface EmailOptions{
    recipient:string
    subject:string
    body?:string
    senderDisplayName?:string
    htmlBody?:string
}


export class Email<TemplateType>{
    private options: Maybe<TemplateType>
    private sendFn:EmailSender<TemplateType>
    private optionsMapper:OptionsMapper<TemplateType>

    private constructor(options:TemplateType, optionsMapper:OptionsMapper<TemplateType>, sender:EmailSender<TemplateType>){
        this.options = Maybe.of(options)
        this.sendFn = sender
        this.optionsMapper = optionsMapper
    }

    static createTemplate<A>(optionsMapper:OptionsMapper<A>, sender:EmailSender<A>):Email<A>{
        return new Email(null, optionsMapper, sender)
    }

    populateTemplate(options:EmailOptions):Email<TemplateType>{
        const mappedOptions = this.optionsMapper(options)
        return new Email(mappedOptions, this.optionsMapper, this.sendFn)
    }

    send(){
        this.options.map(this.sendFn)
    }
}