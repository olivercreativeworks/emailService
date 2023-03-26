import { DocsTextRunModel } from "../../Models/DocsDocumentModel"
import { Maybe, curryLiftA2 } from "../../Monads/Maybe"
import { bindClassMethodsToClassInstance } from "../Decorator"
import { HtmlCreatorMapper } from "../HtmlCreator"
import { createLinkTagFn } from "./Image"


export class TextRun{
    static createHtml(textRun: DocsTextRunModel, mapper:ITextRunHtmlMapper = DocsTextRunMapper.initializeWithDefaults()):string{
        const text = getText(textRun)
        return wrapInLinkTag(mapper, getLink(textRun), text)
            .orElseGet(() => text.orElse("<p></p>"))
        
        function wrapInLinkTag(mapper:IHtmlLinkTagCreator, link:Maybe<string>, text:Maybe<string>):Maybe<string>{
            return curryLiftA2(mapper.wrapInLinkTag, link, text)
        }

        function getText(textRun:DocsTextRunModel):Maybe<string>{
            return Maybe.of(textRun?.content)
        }
        function getLink(textRun:DocsTextRunModel):Maybe<string>{
            return Maybe.of(textRun?.textStyle?.link?.url)
        }
    }
}

export type createTextRunHtmlFn = (textRun: DocsTextRunModel) => string

interface ITextRunHtmlMapper extends IHtmlLinkTagCreator{}


export interface TextRunHtmlMapper{
    createTextRunHtml: createTextRunHtmlFn
}


class DocsTextRunMapper implements ITextRunHtmlMapper{
    wrapInLinkTag:createLinkTagFn

    private constructor(createLinkTag:createLinkTagFn){
        this.wrapInLinkTag = createLinkTag
    }

    @bindClassMethodsToClassInstance
    static of(createLinkTag:createLinkTagFn):DocsTextRunMapper{
        return new DocsTextRunMapper(createLinkTag)
    }

    static initializeWithDefaults(createLinkTag:createLinkTagFn = HtmlCreatorMapper.wrapInLinkTag):DocsTextRunMapper{
        return DocsTextRunMapper.of(createLinkTag)
    }
}

export interface IHtmlLinkTagCreator{
    wrapInLinkTag (link:string, text:string): string
}