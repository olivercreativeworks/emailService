import { Maybe } from "../Monads/Maybe"
import { EmailSender } from "../Interfaces/Email"
import { EmailOptionsMapper } from "../Interfaces/Email"
import { EmailOptions } from "../Interfaces/Email"
import { Email, EmailTemplate } from "../Interfaces/Email"

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