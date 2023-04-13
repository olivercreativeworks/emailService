import { Maybe, MaybeUtility } from "../../Utility/Maybe"
import { IImageAttributes } from "./ImageAttributes"
import { HtmlTags, IValidHtml } from "./IValidHtml"
import { ILinkAttributes, LinkAttributes } from "./LinkAttributes"

type IAttributes = ILinkAttributes | IImageAttributes

export class HtmlCreatorMapper{
    static createTag<A extends HtmlTags, B extends IAttributes>(tag:A, text?:string, attributes?:B):IValidHtml{
        return HtmlCreatorMapper.$createTag(tag, validateText(text), getAttributesString(attributes))

        function validateText(text?:string):string{
            return Maybe.of(text).orElse("")
        }

        function getAttributesString(attributes:IAttributes):string{
            return Maybe.of(attributes).map(toString).orElse("")

            function toString(attributes:IAttributes):string{
                return Object.entries(attributes).map(joinAttributeNameAndValue).join(", ")
            }
            function joinAttributeNameAndValue([attributeName, attributeValue]:[string, string]):string{
                return  `${attributeName}="${attributeValue}"`
            }
        }    
    }

    private static $createTag<A extends HtmlTags>(tag:A, text:string, attributes:string):IValidHtml{
        return `<${tag} ${attributes}>${text}</${tag}>` as IValidHtml
    }

    static createLinkTagElseDefault<A extends HtmlTags>(defaultText:string="", linkAttributes?:LinkAttributes, tagForDefaultText?:A, attributesForDefaultTag?:IAttributes):string{
        const htmlText = MaybeUtility.maybeLiftA2(createTag(defaultText), tagForDefaultText, attributesForDefaultTag).orElse(defaultText)
        const htmlOutput = MaybeUtility.maybeLiftA1(createLinkTag(htmlText), linkAttributes).orElse(htmlText)
        return htmlOutput

        function createLinkTag(text:string): (linkAttributes: ILinkAttributes) => string{
            return (linkAttributes:ILinkAttributes) => HtmlCreatorMapper.createTag("a", text, linkAttributes)
        }

        function createTag<A extends HtmlTags, B extends IAttributes>(text?:string): (tag:A) => (attributes?:B) => IValidHtml{
            return (tag?:A) => (attributes?:B) => HtmlCreatorMapper.createTag(tag, text, attributes)
        }
    }
}



