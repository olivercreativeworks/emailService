import { Maybe, MaybeUtility } from "../../Utility/Maybe"
import { IImageAttributes } from "./HtmlAttributes/ImageAttributes"
import { HtmlTags, IValidHtml } from "./IValidHtml"
import { ILinkAttributes, LinkAttributes } from "./HtmlAttributes/LinkAttributes"

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

    static createLinkTagElseDefault(defaultText:string, linkAttributes:Maybe<ILinkAttributes>):string{
        return MaybeUtility.maybe(defaultText, createLinkTag(defaultText), linkAttributes )
        
        function createLinkTag(text:string): (linkAttributes:ILinkAttributes) => string{
            return (linkAttributes:ILinkAttributes) => HtmlCreatorMapper.createTag("a", text, linkAttributes)
        } 
    }

}



