const HtmlTagsConst = {
    p:"p",
    a:"a",
    img:"img",
} as const

export type HtmlTags = typeof HtmlTagsConst[keyof typeof HtmlTagsConst]
type HtmlStructure<TagName extends HtmlTags> = `<${TagName}${string}>${string}</${TagName}>`

type Html<tag extends HtmlTags> = {
    [P in HtmlTags]: HtmlStructure<P>
}[tag]

export type IValidHtml = Html<HtmlTags>
