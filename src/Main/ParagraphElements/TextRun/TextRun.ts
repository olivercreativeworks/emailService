import { DocsTextRunModel } from "../../../Models/DocsDocumentModel"
import { Maybe, curryLiftA2 } from "../../../Utility/Maybe"
import { DocsTextRunMapper, IHtmlLinkTagCreator, ITextRunHtmlMapper } from "./Mapper"



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

