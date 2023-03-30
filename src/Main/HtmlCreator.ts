import { SizeInPixels } from "./ParagraphElements/Image/SizeUnits";


const HtmlTagsConst = {
    p:"p",
    a:"a",
    img:"img",
} as const

export type HtmlTags = typeof HtmlTagsConst[keyof typeof HtmlTagsConst]
export type HtmlStructure<TagName extends HtmlTags> = `<${TagName}${string}>${string}</${TagName}>`

export type Html<tag extends HtmlTags> = {
    [P in HtmlTags]: HtmlStructure<P>
}[tag]

export type HtmlParagraph = Html<"p">

export class HtmlCreatorMapper{
    static wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string{
        return `<img src="${sourceUrl}", height="${sizeInPixels.height}", width="${sizeInPixels.width}"></img>`
    }
    static wrapInLinkTag (link:string, text:string): string{
        return `<a href="${link}" target="_blank">${text}</a>`
    }
    static wrapInParagraphTag(text:string):HtmlParagraph{
        return `<p>${text}</p>`
    }
}
