// import { List } from "../Monads/List"
// import { Maybe } from "../Monads/Maybe"
// import { ImageToImageAttributesMapper } from "./HtmlMapper"


// interface IEmailDocument extends IEmailHtmlElement{
//     paragraphs:List<IEmailParagraph>
// }

// export class EmailDocument implements IEmailDocument{
//     paragraphs: List<IEmailParagraph>
//     htmlCreator: IHtmlCreator
    
//     static of(paragraphs:List<IEmailParagraph>, htmlCreator:IHtmlCreator):EmailDocument{
//         return new EmailDocument(paragraphs, htmlCreator)
//     }

//     constructor(paragraphs: List<IEmailParagraph>, htmlCreator:IHtmlCreator){
//         this.paragraphs = paragraphs
//         this.htmlCreator = htmlCreator
//     }

//     get asHtml():sValid_Html<"div">{
//         // return "<div>hello</div>"
//         return this.htmlCreator.createNewTag("div").updateText(this.joinedParagraphs).html
//     }

//     private get joinedParagraphs():string{
//         return this.paragraphs.reduce((str:string, paragraph:IEmailParagraph) => str.concat(paragraph.asHtml), " ").trim()
//     }
// }

// interface IEmailParagraph extends IEmailHtmlElement{
//     elements:List<IEmailHtmlElement>
// }

// export class EmailParagraph implements IEmailParagraph{
//     elements: List<IEmailHtmlElement>
//     htmlCreator: IHtmlCreator

//     static of(elements:List<IEmailHtmlElement>, htmlCreator:IHtmlCreator):EmailParagraph{
//         return new EmailParagraph(elements, htmlCreator)
//     }

//     constructor(elements: List<IEmailHtmlElement>, htmlCreator:IHtmlCreator){
//         this.elements = elements
//         this.htmlCreator = htmlCreator
//     }

//     get asHtml():sValid_Html<"p">{
//         return this.htmlCreator.createNewTag("p").updateText(this.joinedElements).html
//     }

//     private get joinedElements():string{
//         return this.elements.reduce((str:string, element:IEmailHtmlElement) => str.concat(element.asHtml) , " ").trim()
//     }
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

// const HtmlTags = {
//     p:"p",
//     a:"a",
//     img:"img",
//     div:"div"
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

// interface IhHtml<TagName extends HtmlTagNames>{
//     html:sValid_Html<TagName>
//     updateAttributes(obj:Partial<IHtmlAttributesObject>):IhHtml<TagName>
//     updateText(text:string):IhHtml<TagName>
//     wrapInNewTag<A extends HtmlTagNames>(tagName:A, attributesObject?:Partial<IHtmlAttributesObject>): IhHtml<A>
// }

// type createLinkTagFn = (url:string, text:string, otherAttributes?:Partial<IHtmlAttributesObject>) => sValid_Html<"a">
// type htmlBuilderFn =<A extends HtmlTagNames> (tagName: A) => IhHtml<A>

// interface IHtmlCreator{
//     createNewTag: htmlBuilderFn
//     createNewLinkTag: createLinkTagFn
// }

// export class HtmlCreator implements IHtmlCreator{
//     createNewTag: htmlBuilderFn

//     static of(htmlBuilderFn:htmlBuilderFn):HtmlCreator{
//         return new HtmlCreator(htmlBuilderFn)
//     }

//     constructor(htmlBuilderFn:htmlBuilderFn){
//         this.createNewTag = htmlBuilderFn
//     }

//     createNewLinkTag(url:string, text:string, otherAttributes:Partial<IHtmlAttributesObject>={}): sValid_Html<"a">{
//         return this.createNewTag("a").updateAttributes({href:url, ...otherAttributes}).updateText(text).html
//     }
// }


// export class hHtml<TagName extends HtmlTagNames> implements IhHtml<TagName>{
//     private tagName:TagName
//     private attributesObject:Partial<IHtmlAttributesObject>
//     private text?:string

//     static of<A extends HtmlTagNames>(tagName:A, attributesObject?:Partial<IHtmlAttributesObject>, text?:string):hHtml<A>{
//         return new hHtml(tagName, attributesObject, text)
//     }
    
//     constructor(tagName:TagName, attributesObject:Partial<IHtmlAttributesObject> = {}, text?:string){
//         this.tagName = tagName
//         this.attributesObject = attributesObject
//         this.text = text
//     }

//     get html():sValid_Html<TagName>{
//         return this.openTags.concat(this.text).concat(this.closingTags) as sValid_Html<TagName>
//     }
//     private get openTags():string{
//         return `<${this.tagName} ${this.attributesString}>`
//     }
//     private get closingTags():string{
//         return `</${this.tagName}>`
//     }
//     private get attributesString():string{
//         return Object.entries(this.attributesObject).reduce( (attributesString:string, [attributeName, attributeValue]) => {
//             return attributesString.concat(`${attributeName}="${attributeValue}"`) 
//             }, " ").trim()
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
//     htmlCreator:IHtmlCreator
//     asHtml:sValid_Html<HtmlTagNames>
// }

// export class Image implements IImage, IEmailHtmlElement{
//     readonly sourceUrl: string
//     readonly link: Maybe<string>
//     readonly dimensions: IPixelDimensions
//     readonly width: number
//     readonly height: number
//     readonly htmlCreator:IHtmlCreator
//     readonly type = "image"
    
//     static of(htmlCreator:IHtmlCreator, sourceUrl:string, dimensions:IPixelDimensions, link?:string):Image{
//         return new Image(htmlCreator, sourceUrl, dimensions, link)
//     }

//     constructor(htmlCreator:IHtmlCreator, sourceUrl:string, dimensions:IPixelDimensions, link?:string){
//         this.htmlCreator = htmlCreator
//         this.sourceUrl = sourceUrl
//         this.dimensions = dimensions
//         this.width = dimensions.width
//         this.height = dimensions.height
//         this.link = Maybe.of(link)
//     }

//     get asHtml():sValid_Html<"img" | "a">{
//         return this.asLinkedHtml.orElse(this.imageAsHtml)
//     }

//     private get asLinkedHtml():Maybe<sValid_Html<"a">>{
//         return this.link.map(url => this.htmlCreator.createNewLinkTag(url, this.asHtml))
//     }

//     private get imageAsHtml():sValid_Html<"img">{
//         return this.htmlCreator.createNewTag("img").updateAttributes({width:this.width, height:this.height, src:this.sourceUrl}).html
//     }
// }

// export class TextRun implements ITextRun, IEmailHtmlElement{
//     readonly text: string
//     readonly link: Maybe<string>
//     readonly htmlCreator:IHtmlCreator
//     readonly type = "textRun"

//     static of(htmlCreator:IHtmlCreator, text:string, link?:string):TextRun{
//         return new TextRun(htmlCreator, text, link)
//     }

//     constructor(htmlCreator:IHtmlCreator, text:string, link?:string){
//         this.htmlCreator = htmlCreator
//         this.text = text
//         this.link = Maybe.of(link)
//     }

//     get asHtml(): sValid_Html<"p"|"a"> {
//         return this.asLinkedHtml.orElse(this.textAsHtml)
//     }

//     private get asLinkedHtml(): Maybe<sValid_Html<"a">>{
//         return this.link.map(url => this.htmlCreator.createNewLinkTag(url, this.asHtml))
//     }

//     private get textAsHtml():sValid_Html<"p">{
//         return this.htmlCreator.createNewTag("p").updateText(this.text).html
//     }     
// }

