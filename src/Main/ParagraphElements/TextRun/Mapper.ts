import { DocsTextRunModel } from "../../../Models/DocsDocumentModel"
import { bindClassMethodsToClassInstance } from "../../../Utility/Decorator"
import { HtmlCreatorMapper } from "../../HtmlCreator"
import { createLinkTagFn } from "../Image/HtmlMapper"

export type createTextRunHtmlFn = (textRun: DocsTextRunModel) => string

export interface ITextRunHtmlMapper extends IHtmlLinkTagCreator{}


export interface TextRunHtmlMapper{
    createTextRunHtml: createTextRunHtmlFn
}


export class DocsTextRunMapper implements ITextRunHtmlMapper{
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