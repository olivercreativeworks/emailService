import { List } from "../Monads/List"
// import { Maybe } from "../Monads/Maybe"

// interface IEmailDocument{
//     paragraphs:List<IEmailParagraph>
// }

// interface IEmailParagraph{
//     elements:List<IEmailHtmlElement>
// }
// interface ITextRun{
//     text:string
//     link:Maybe<string>
// }
// interface IImage {
//     sourceUrl:string
//     link:Maybe<string>
//     dimensions: IPixelDimensions
// }

// interface IPixelDimensions{
//     width: number
//     height: number
//     unit: IPixel
// }

// type IPixel = "pixel"

// // const HtmlTags = {
// //     p:"p",
// //     a:"a",
// //     img:"img",
// // } as const

// // // type Html<TagName extends HtmlTagNames> = `<${TagName}${string}>${string}</${TagName}>`

// // type validHtml = Html< typeof HtmlTags[keyof typeof HtmlTags] >

// // type HtmlParagraph = Html<"p">
// // type HtmlImage = Html<"img">
// // type HtmlLink = Html<"a">

// // type HtmlElement = HtmlParagraph | HtmlImage | HtmlLink


// const HtmlTags = {
//     p:"p",
//     a:"a",
//     img:"img",
// } as const

// type HtmlTagNames = typeof HtmlTags[keyof typeof HtmlTags]
// type Html<TagName extends HtmlTagNames> = `<${TagName}${string}>${string}</${TagName}>`

// type Valid_Html = {
//     [P in keyof typeof HtmlTags]: Html<P>
// }
// type sValid_Html<t extends keyof Valid_Html> = Valid_Html[t]

// const bunny:sValid_Html<"a"|"img"> = `<${"img"}></${"img"}>`

// interface IHtmlAttributesObject{
//     width: number
//     height: number
//     href: string
//     target: string
//     src: string
// }
// type AttributeNames = keyof IHtmlAttributesObject
// type AttributeAndValueTuple<Attribute extends AttributeNames> = [Attribute, IHtmlAttributesObject[Attribute]]

// class HtmlFormatter{
//     static format<NewTagName extends HtmlTagNames>(tagName:NewTagName, attributesObject:Partial<IHtmlAttributesObject> = {}): (text:string) => sValid_Html<NewTagName>{
//         const htmlAttributes = HtmlFormatter.createAttributesString(attributesObject)
//         return (text: string) => `<${tagName} ${htmlAttributes}>${text}</${tagName}>` as sValid_Html<NewTagName>
//     }
    
//     private static createAttributesString(attributesObject:Partial<IHtmlAttributesObject>):string{
//         return Object.entries(attributesObject).reduce( (attributesString:string, [attributeName, attributeValue]) => {
//             return attributesString.concat(`${attributeName}="${attributeValue}"`) 
//         }, " ").trim()
//     }
// }

// // class HtmlBuilder<TagName extends HtmlTagNames> implements IHtmlBuilder<TagName>{
// //     html: Maybe<sValid_Html<TagName>>
// //     constructor(html?: sValid_Html<TagName>){
// //         this.html = Maybe.of(html)
// //     }

// //     private static of<A extends HtmlTagNames>(html?:sValid_Html<A>):HtmlBuilder<A>{
// //         return new HtmlBuilder(html)
// //     }

// //     createNewHtml<NewTagName extends HtmlTagNames>(tagName:NewTagName, attributesObject:Partial<IHtmlAttributesObject> = {}): (text:string) => HtmlBuilder<NewTagName>{
// //         const htmlAttributes = HtmlBuilder.createAttributesString(attributesObject)
// //         return (text: string) => {
// //             const html = `<${tagName} ${htmlAttributes}>${text}</${tagName}>` as Valid_Html[NewTagName]
// //             return HtmlBuilder.of(html)
// //         }
// //     }
    
// //     addTag<NewTagName extends HtmlTagNames>(tagName:NewTagName, attributesObject:Partial<IHtmlAttributesObject> = {}): HtmlBuilder<NewTagName>{
// //         const htmlAttributes = HtmlBuilder.createAttributesString(attributesObject)
// //         return HtmlBuilder.of (`<${tagName} ${htmlAttributes}>${this.html.orElse("") as string}</${tagName}>`)
// //     }

// //     private static constructHtml(){

// //     }

// //     private static createAttributesString(attributesObject:Partial<IHtmlAttributesObject>):string{
// //         return Object.entries(attributesObject).reduce( (attributesString:string, [attributeName, attributeValue]) => {
// //             return attributesString.concat(`${attributeName}="${attributeValue}"`) 
// //         }, " ").trim()
// //     }
// // }
// // const cat = new HtmlBuilder().
// // interface IHtmlBuilder<TagName extends HtmlTagNames>{
// //     html:Maybe<sValid_Html<TagName>>
// //     createNewHtml<NewTagName extends HtmlTagNames>(tagName:NewTagName, attributesObject:Partial<IHtmlAttributesObject>): (text:string) => IHtmlBuilder<NewTagName>
// //     addTag<NewTagName extends HtmlTagNames>(tagName:NewTagName, attributesObject:Partial<IHtmlAttributesObject>): IHtmlBuilder<NewTagName>
// // }

// // type createHtmlFn =<NewTagName extends HtmlTagNames> (tagName:NewTagName, attributesObject?:Partial<IHtmlAttributesObject>) => (text?:string) => sValid_Html<NewTagName>

// interface IhHtml<TagName extends HtmlTagNames>{
//     html:sValid_Html<TagName>
//     updateAttributes(obj:Partial<IHtmlAttributesObject>):IhHtml<TagName>
//     updateText(text:string):IhHtml<TagName>
//     wrapInNewTag<A extends HtmlTagNames>(tagName:A, attributesObject?:Partial<IHtmlAttributesObject>): IhHtml<A>
// }

// interface IHtmlLinkBuilder extends IhHtml<HtmlTagNames>{
//     createLinkTag(url:string, text?:string, otherAttributes?:Partial<IHtmlAttributesObject>): IHtmlLinkBuilder
// }

// type htmlBuilderFn =<A extends HtmlTagNames> (tagName: A) => IhHtml<A>

// class hHtml<TagName extends HtmlTagNames> implements IhHtml<TagName>{
//     private tagName:TagName
//     private attributesObject:Partial<IHtmlAttributesObject>
//     private text?:string
    
//     private get attributesString():string{
//         return Object.entries(this.attributesObject).reduce( (attributesString:string, [attributeName, attributeValue]) => {
//             return attributesString.concat(`${attributeName}="${attributeValue}"`) 
//             }, " ").trim()
//     }
    
//     private get openTags():string{
//         return `<${this.tagName} ${this.attributesString}>`
//     }
//     private get closingTags():string{
//         return `</${this.tagName}>`
//     }

//     get html():sValid_Html<TagName>{
//         return this.openTags.concat(this.text).concat(this.closingTags) as sValid_Html<TagName>
//         // return `<${this.tagName} ${this.attributesString}>${this.text}</${this.tagName}>` as sValid_Html<TagName>
//     }

//     private constructor(tagName:TagName, attributesObject:Partial<IHtmlAttributesObject> = {}, text?:string){
//         this.tagName = tagName
//         this.attributesObject = attributesObject
//         this.text = text
//     }

//     static of<A extends HtmlTagNames>(tagName:A, attributesObject?:Partial<IHtmlAttributesObject>, text?:string):hHtml<A>{
//         return new hHtml(tagName, attributesObject, text)
//     }
    

//     updateAttributes(obj:Partial<IHtmlAttributesObject>):hHtml<TagName>{
//         return hHtml.of(this.tagName, obj, this.text)
//     }
//     updateText(text:string):hHtml<TagName>{
//         return hHtml.of(this.tagName, this.attributesObject, text)
//     }
//     wrapInNewTag<A extends HtmlTagNames>(tagName:A, attributesObject?:Partial<IHtmlAttributesObject>):hHtml<A>{
//         return hHtml.of(tagName, attributesObject, this.html)
//     }
// }

// interface IEmailHtmlElement{
//     htmlBuilderFn:htmlBuilderFn
//     html:sValid_Html<HtmlTagNames>
//     // asHtml(htmlBuilderFn:htmlBuilderFn): sValid_Html<HtmlTagNames>
//     // asHtml<NewTagName extends HtmlTagNames>(htmlBuilderFn:(tagName:NewTagName, attributesObject:Partial<IHtmlAttributesObject>) => (text:string) => HtmlBuilder<NewTagName>):Html<NewTagName>
// }

// class Image implements IImage, IEmailHtmlElement{
//     readonly sourceUrl: string
//     readonly link: Maybe<string>
//     readonly dimensions: IPixelDimensions
//     readonly width: number
//     readonly height: number
//     readonly htmlBuilderFn: htmlBuilderFn
    
//     static of(htmlBuilderFn:htmlBuilderFn, sourceUrl:string, dimensions:IPixelDimensions, link?:string):Image{
//         return new Image(htmlBuilderFn, sourceUrl, dimensions, link)
//     }

//     constructor(htmlBuilderFn:htmlBuilderFn, sourceUrl:string, dimensions:IPixelDimensions, link?:string){
//         this.htmlBuilderFn = htmlBuilderFn
//         this.sourceUrl = sourceUrl
//         this.dimensions = dimensions
//         this.width = dimensions.width
//         this.height = dimensions.height
//         this.link = Maybe.of(link)
//     }

//     get html():sValid_Html<"img" | "a">{
//         return this.imageAsLinkedHtml.orElse(this.imageAsHtml)
//     }

//     private get imageAsLinkedHtml():Maybe<sValid_Html<"a">>{
//         return this.link.map(url => this.htmlBuilderFn("a").updateAttributes({href:url}).updateText(this.imageAsHtml).html)
//     }

//     private get imageAsHtml():sValid_Html<"img">{
//         return this.htmlBuilderFn("img").updateAttributes({width:this.width, height:this.height, src:this.sourceUrl}).html
//     }
// }

// class TextRun implements ITextRun, IEmailHtmlElement{
//     readonly text: string
//     readonly link: Maybe<string>
//     readonly htmlBuilderFn: htmlBuilderFn

//     static of(htmlBuilderFn:htmlBuilderFn, text:string, link?:string):TextRun{
//         return new TextRun(htmlBuilderFn, text, link)
//     }

//     constructor(htmlBuilderFn:htmlBuilderFn, text:string, link?:string){
//         this.htmlBuilderFn = htmlBuilderFn
//         this.text = text
//         this.link = Maybe.of(link)
//     }

//     get html(): sValid_Html<"p"|"a"> {
//         return this.textAsLinkedHtml.orElse(this.textAsHtml)
//     }

//     private get textAsLinkedHtml(): Maybe<sValid_Html<"a">>{
//         return this.link.map(url => this.htmlBuilderFn("a").updateAttributes({href:url}).updateText(this.textAsHtml).html)
//     }

//     private get textAsHtml():sValid_Html<"p">{
//         return this.htmlBuilderFn("p").updateText(this.text).html
//     }     
// }


