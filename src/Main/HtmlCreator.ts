import { IAttributes } from "./ParagraphElements/Image/Attributes"
import { SizeInPixels } from "./ParagraphElements/Image/SizeUnits"

const HtmlTagsConst = {
    p:"p",
    a:"a",
    img:"img",
} as const

type HtmlTags = typeof HtmlTagsConst[keyof typeof HtmlTagsConst]
type HtmlStructure<TagName extends HtmlTags> = `<${TagName}${string}>${string}</${TagName}>`

type Html<tag extends HtmlTags> = {
    [P in HtmlTags]: HtmlStructure<P>
}[tag]

export type HtmlParagraph = Html<"p">
export type HtmlLink = Html<"a">
export type HtmlImage = Html<"img">

export class HtmlCreatorMapper{
    static wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): HtmlImage{
        return `<img src="${sourceUrl}", height="${sizeInPixels.height}", width="${sizeInPixels.width}"></img>`
    }
    static wrapInLinkTag (link:string, text:string): HtmlLink{
        return `<a href="${link}" target="_blank">${text}</a>`
    }
    static wrapInParagraphTag(text:string):HtmlParagraph{
        return `<p>${text}</p>`
    }

    static createImageTag(imageAttributes:IAttributes):HtmlImage{
        return `<img ${toString(imageAttributes)}></img>`
    
        function toString(imageAttributes:IAttributes):string{
            return Object.entries(imageAttributes).map(joinAttributeNameAndValue).join(", ")
        }
    
        function joinAttributeNameAndValue([attributeName, attributeValue]:[string, string]):string{
            return  `${attributeName}="${attributeValue}"`
        }
    }
}