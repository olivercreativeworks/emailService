// import { IImageDimensions, IInlineImage, InlineImage, SizeUnit } from "../Models/DocumentImageModel";
// import { IDocument, IParagraph, IParagraphElement, Document, ParagraphElement } from "../Models/DocumentModel";
// import { List } from "../Monads/List";
// import { HtmlMapper, IHtmlMapper, HtmlAttributesBuilder, IHtmlAttributesBuilder } from "./HtmlMapper";
// import { IImageAttributeOptions } from "./HtmlMapper";
// import { maybe } from "../Monads/Maybe";
// import { ITextRun } from "../Models/DocumentModel";
// import { Maybe } from "../Monads/Maybe";
// import { concatStrings } from "../Models/UtilityFunctions";
// import { IPixelDimensions } from "../Models/DocumentImageModel";
// import { ImageToImageAttributesMapper } from "./HtmlMapper";


// interface HtmlElement{
//     asHtmlString(htmlMapper:IHtmlMapper):string
// }

// class HtmlParagraph implements HtmlElement{
//     asHtmlString(htmlMapper: IHtmlMapper): string {
//         return this.paragraph.$baseUnits.reduce((str1:string, htmlElement:HtmlElement) => str1.concat(htmlElement.asHtmlString(htmlMapper)), "")
//     }
//     paragraph:IParagraph<HtmlElement>

//     constructor(paragraph:IParagraph<HtmlElement>){
//         this.paragraph = paragraph
//     }

//     static of(paragraph:IParagraph<HtmlElement>):HtmlParagraph{
//         return new HtmlParagraph(paragraph)
//     }
// }

// export interface IPixelInlineImage{
//     imageSourceUrl:Maybe<string>
//     url:Maybe<string>
//     size:Maybe<IPixelDimensions>
// }

// interface IHtmlLinkTagConstructor {
//     addLinkTagIfUrlExists(htmlMapper: IHtmlMapper, text:string, url:Maybe<string>): string
// } 
    

// class HtmlLinkTagConstructor implements IHtmlLinkTagConstructor{
//     addLinkTagIfUrlExists(htmlMapper: IHtmlMapper, text: string, url:Maybe<string>): string {
//         return  maybe(text, (url:string) => htmlMapper.addLinkTag(url, text), url)
//     }
// }

// type IImageToImageAttributesMapper = (image:IInlineImage) => IImageAttributeOptions

// class HtmlImage implements HtmlElement{
//     image:IPixelInlineImage
//     attributesBuilder: IHtmlAttributesBuilder
//     imageAttributesMapper: IImageToImageAttributesMapper

//     asHtmlString(htmlMapper: IHtmlMapper, htmlLinkTagConstructor:IHtmlLinkTagConstructor = new HtmlLinkTagConstructor()): string {
//         const htmlString = htmlMapper.addImageTags(this.imageSourceUrl, this.attributesString)
//         return htmlLinkTagConstructor.addLinkTagIfUrlExists(htmlMapper, htmlString, this.image.url)
//     }

//     addImageTags(htmlMapper:IHtmlMapper):Maybe<string>{
//         return this.image.imageSourceUrl.map( (url:string) => htmlMapper.addImageTags(url, this.attributesString))
//     }

//     get imageSourceUrl():string{
//         return this.image.imageSourceUrl.orElse("")
//     }

//     constructor(image:IPixelInlineImage, attributesBuilder:IHtmlAttributesBuilder, imageToImageAttributesMapper: IImageToImageAttributesMapper = ImageToImageAttributesMapper.mapToOptions){
//         this.image = image
//         this.attributesBuilder = attributesBuilder
//         this.imageAttributesMapper = imageToImageAttributesMapper
//     }

//     static of(image:IPixelInlineImage, attributesBuilder:IHtmlAttributesBuilder, imageToImageAttributesMapper: IImageToImageAttributesMapper = ImageToImageAttributesMapper.mapToOptions):HtmlImage{
//         return new HtmlImage(image, attributesBuilder, imageToImageAttributesMapper)
//     }

//     get attributesString():string{
//         return this.attributesBuilder.buildImageAttributesString(this.attributes)
//     } 
    
//     get attributes():IImageAttributeOptions{
//         return this.imageAttributesMapper(this.image)
//     }
// }

// class HtmlTextRun implements HtmlElement{
//     textRun:ITextRun
//     asHtmlString(htmlMapper: IHtmlMapper): string {
        
//     }
// }


// export class EmailDocument{
//     private document: IDocument<IParagraphElement>

//     constructor(document:IDocument<IParagraphElement>){
//         this.document = document
//     }

//     static of(document:IDocument<IParagraphElement>):EmailDocument{
//         return new EmailDocument(document)
//     }

//     private get paragraphs():List<IParagraph<IParagraphElement>>{
//         return this.document.paragraphs
//     }

//     private contentAsString(paragraphToStringMapper:(para:IParagraph<ParagraphElement>) => string):string{
//         return this.paragraphs.reduce(paragraphToString(paragraphToStringMapper), " ")
        
//         function paragraphToString(paragraphToStringMapper: (para:IParagraph<ParagraphElement>) => string):typeof $paragraphToString{
//             return $paragraphToString
            
//             function $paragraphToString(paraAsString:string, para:IParagraph<IParagraphElement>): string {
//                 return paraAsString.concat(paragraphToStringMapper(para))
//             }
//         }
//     }

//     static concatMultipleDocs(documentList:List<IDocument<IParagraphElement>>):string{
//         return documentList.map(EmailDocument.of).map(document => document.contentAsHtmlString()).reduce(concatStrings)
//     }

//     contentAsHtmlString(htmlMapper:HtmlConstructor, htmlAttributesBuilder:IHtmlAttributesBuilder = new HtmlAttributesBuilder()):string{
//         return this.contentAsString(getParagraphAsHtmlString(htmlMapper))

//         function getParagraphAsHtmlString(htmlMapper:IHtmlMapper): typeof $getParagraphAsHtmlString{
//             return $getParagraphAsHtmlString

//             function $getParagraphAsHtmlString(para:IParagraph<ParagraphElement>):string{
//                 const paragraphAsString = para.$baseUnits.map(paragraphElementsToString(htmlMapper, htmlAttributesBuilder)).reduce(concatStrings)
//                 return htmlMapper.addParagraphTags(paragraphAsString)
//             }
//         }

//         function paragraphElementsToString(htmlMapper:IHtmlMapper, attributesBuilder:IHtmlAttributesBuilder):typeof $paragraphElementsToString{
//             return $paragraphElementsToString

//             function $paragraphElementsToString(element: IParagraphElement):string{
//                 return element.inlineImage.map(buildImageHtml(htmlMapper, attributesBuilder))
//                     .orElseGet(() => element.textRun.map(buildTextRunHtml(htmlMapper)).orElse(""))
//             }
//         }

//         function buildHtml<A extends ObjWithUrlProp>(htmlMapper: IHtmlMapper, objToHtmlStringMapper:(objWithUrlProp:A) => string): (objWithUrlProp:A) => string{
//             return (objWithUrlProp:A) => addLinkTagIfUrlExists(objToHtmlStringMapper(objWithUrlProp), htmlMapper, objWithUrlProp.url)
//             }
        

//         function getTextOrEmptyString(textRun:ITextRun):string{
//             return textRun.text.orElse("")
//         }

//         function v(htmlMapper: IHtmlMapper, e:IParagraphElement){
//             e.textRun.map(buildHtml(htmlMapper, getTextOrEmptyString))
//         }

//         function buildTextRunHtml(htmlMapper:IHtmlMapper):(textRun:ITextRun) => string{
//             return (textRun:ITextRun) => {
//                 const htmlString = textRun.text.orElse("")
//                 return textRun.url.isSomething() ?  
//                 addLinkTagIfUrlExists(htmlString, htmlMapper, textRun.url)
//             }
//         }

//         function addLinkTagIfUrlExists(text:string, htmlMapper:IHtmlMapper, maybeUrl:Maybe<string>):string{
//             return maybeUrl.map(url => htmlMapper.addLinkTag(url, text)).orElse(text)
//             // maybe(linkTagText, (url:string) => htmlMapper.addLinkTags(url, linkTagText), maybeUrl)
//         }

//         function buildImageHtml(htmlMapper:IHtmlMapper, attributesBuilder:IHtmlAttributesBuilder): (img:InlineImage) => string {
//             return (img:IInlineImage) => {
//                 const sourceUrl = img.imageSourceUrl.orElse("")
//                 const attributes = img.size.map(dimensionsToImageAttributes).map(attributesBuilder.buildImageAttributesString).orElse("")
//                 const htmlString =  htmlMapper.addImageTags(sourceUrl, attributes)
//                 return addLinkTagIfUrlExists(htmlString, htmlMapper, img.url)
//             }
//         }

//         function dimensionsToImageAttributes(dimensions:IImageDimensions<SizeUnit>):IImageAttributeOptions{
//             return {
//                 width: dimensions.width.magnitude,
//                 height: dimensions.height.magnitude
//             }
//         }
//     }
// }
// // export class EmailDocument{
// //     private document: IDocument<IParagraphElement>

// //     constructor(document:IDocument<IParagraphElement>){
// //         this.document = document
// //     }

// //     static of(document:IDocument<IParagraphElement>):EmailDocument{
// //         return new EmailDocument(document)
// //     }

// //     private get paragraphs():List<IParagraph<IParagraphElement>>{
// //         return this.document.paragraphs
// //     }

// //     private contentAsString(paragraphToStringMapper:(para:IParagraph<ParagraphElement>) => string):string{
// //         return this.paragraphs.reduce(paragraphToString(paragraphToStringMapper), " ")
        
// //         function paragraphToString(paragraphToStringMapper: (para:IParagraph<ParagraphElement>) => string):typeof $paragraphToString{
// //             return $paragraphToString
            
// //             function $paragraphToString(paraAsString:string, para:IParagraph<IParagraphElement>): string {
// //                 return paraAsString.concat(paragraphToStringMapper(para))
// //             }
// //         }
// //     }

// //     static concatMultipleDocs(documentList:List<IDocument<IParagraphElement>>):string{
// //         return documentList.map(EmailDocument.of).map(document => document.contentAsHtmlString()).reduce(concatStrings)
// //     }

// //     contentAsHtmlString(htmlMapper:IHtmlMapper = new HtmlMapper(), htmlAttributesBuilder:IHtmlAttributesBuilder = new HtmlAttributesBuilder()):string{
// //         return this.contentAsString(getParagraphAsHtmlString(htmlMapper))

// //         function getParagraphAsHtmlString(htmlMapper:IHtmlMapper): typeof $getParagraphAsHtmlString{
// //             return $getParagraphAsHtmlString

// //             function $getParagraphAsHtmlString(para:IParagraph<ParagraphElement>):string{
// //                 const paragraphAsString = para.$baseUnits.map(paragraphElementsToString(htmlMapper, htmlAttributesBuilder)).reduce(concatStrings)
// //                 return htmlMapper.addParagraphTags(paragraphAsString)
// //             }
// //         }

// //         function paragraphElementsToString(htmlMapper:IHtmlMapper, attributesBuilder:IHtmlAttributesBuilder):typeof $paragraphElementsToString{
// //             return $paragraphElementsToString

// //             function $paragraphElementsToString(element: IParagraphElement):string{
// //                 return element.inlineImage.map(buildImageHtml(htmlMapper, attributesBuilder))
// //                     .orElseGet(() => element.textRun.map(buildTextRunHtml(htmlMapper)).orElse(""))
// //             }
// //         }

// //         function buildHtml<A extends ObjWithUrlProp>(htmlMapper: IHtmlMapper, objToHtmlStringMapper:(objWithUrlProp:A) => string): (objWithUrlProp:A) => string{
// //             return (objWithUrlProp:A) => addLinkTagIfUrlExists(objToHtmlStringMapper(objWithUrlProp), htmlMapper, objWithUrlProp.url)
// //             }
        

// //         function getTextOrEmptyString(textRun:ITextRun):string{
// //             return textRun.text.orElse("")
// //         }

// //         function v(htmlMapper: IHtmlMapper, e:IParagraphElement){
// //             e.textRun.map(buildHtml(htmlMapper, getTextOrEmptyString))
// //         }

// //         function buildTextRunHtml(htmlMapper:IHtmlMapper):(textRun:ITextRun) => string{
// //             return (textRun:ITextRun) => {
// //                 const htmlString = textRun.text.orElse("")
// //                 return textRun.url.isSomething() ?  
// //                 addLinkTagIfUrlExists(htmlString, htmlMapper, textRun.url)
// //             }
// //         }

// //         function addLinkTagIfUrlExists(text:string, htmlMapper:IHtmlMapper, maybeUrl:Maybe<string>):string{
// //             return maybeUrl.map(url => htmlMapper.addLinkTag(url, text)).orElse(text)
// //             // maybe(linkTagText, (url:string) => htmlMapper.addLinkTags(url, linkTagText), maybeUrl)
// //         }

// //         function buildImageHtml(htmlMapper:IHtmlMapper, attributesBuilder:IHtmlAttributesBuilder): (img:InlineImage) => string {
// //             return (img:IInlineImage) => {
// //                 const sourceUrl = img.imageSourceUrl.orElse("")
// //                 const attributes = img.size.map(dimensionsToImageAttributes).map(attributesBuilder.buildImageAttributesString).orElse("")
// //                 const htmlString =  htmlMapper.addImageTags(sourceUrl, attributes)
// //                 return addLinkTagIfUrlExists(htmlString, htmlMapper, img.url)
// //             }
// //         }

// //         function dimensionsToImageAttributes(dimensions:IImageDimensions<SizeUnit>):IImageAttributeOptions{
// //             return {
// //                 width: dimensions.width.magnitude,
// //                 height: dimensions.height.magnitude
// //             }
// //         }
// //     }
// // }

// interface ObjWithUrlProp{
//     url: Maybe<string>
// }

// interface IHtmlMappableObj{
//     url:Maybe<string>
//     text:Maybe<string>
// }

// type IHtmlMappableObjMaker = (text:string, url:string) => IHtmlMappableObj


// class HtmlConstructor{
//     private htmlMapper: IHtmlMapper
//     private htmlMappableObj: IHtmlMappableObj


//     private constructor(htmlMapper:IHtmlMapper, htmlMappableObj: IHtmlMappableObj){
//         this.htmlMapper = htmlMapper
//         this.htmlMappableObj = htmlMappableObj
//     }

//     static of(htmlMapper:IHtmlMapper, htmlMappableObj:IHtmlMappableObj):HtmlConstructor{
//         return new HtmlConstructor(htmlMapper, htmlMappableObj)
//     }

//     private updateHtmlMappableObjText(htmlMapperFn:(text:string) => string):HtmlConstructor{
//         return HtmlConstructor.of( this.htmlMapper, {...this.htmlMappableObj, text:Maybe.of(this.text).map(htmlMapperFn)} )
//     }

//     addParagraphTag(): HtmlConstructor{
//         return this.updateHtmlMappableObjText(this.htmlMapper.addParagraphTags)
//     }

//     addImageTag():HtmlConstructor{
//         return this.updateHtmlMappableObjText(this.htmlMapper.addImageTags)
//     }

//     addLinkTagIfUrlIsPresent():HtmlConstructor{
//         return this.updateHtmlMappableObjText((text:string) => this.textWithLinkTag.orElse(text))
//     }

//     get text():string{
//         return this.htmlMappableObj.text.orElse("")
//     }
//     private get url():Maybe<string>{
//         return this.htmlMappableObj.url
//     }
//     private get textWithLinkTag():Maybe<string>{
//         return this.url.map(url => this.htmlMapper.addLinkTag(url, this.text))
//     }
// }