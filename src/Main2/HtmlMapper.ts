// import { IInlineImage, IPixelDimensions } from "../Models/DocumentImageModel"

// export interface IHtmlMapper{
//     addParagraphTags(text:string):string
//     addLinkTag(url:string, text:string):string
//     addImageTags(sourceUrl: string, otherProps?:string):string
// }

// export class HtmlMapper implements IHtmlMapper{
//     addParagraphTags(text: string): string {
//         return `<p>${text}</p>`
//     }
//     addLinkTag(url: string, text: string): string {
//         return `<a href="${url}", target="_blank">${text}</a>`
//     }
//     addImageTags(sourceUrl:string, otherProps?:string): string{
//         return `<img src="${sourceUrl}" ${otherProps}>`
//     }
//     static createAttributes(attributeString:string, [attributeName, attributeValue]:[string, string]):string{
//         return attributeString.concat(`${attributeName}:"${attributeValue}"`)
//     }
//     static createAttributesFromAttributesObject(attributesObject:Record<string, string>):string{
//         return Object.entries(attributesObject).reduce(HtmlMapper.createAttributes, " ").trim()
//     }
// }

// interface IImageAttributes{
//     height:number
//     width:number
// }

// type ISizeAttributes = Pick<IImageAttributes, "height"|"width">

// export class ImageToImageAttributesMapper{
//     static mapToOptions(img: IInlineImage): IImageAttributeOptions{
//         const attributesOptions:IImageAttributeOptions = {}
//         const updatedAttributesOptions = img.size.map(ImageToImageAttributesMapper.getSizeAttributes)
//             .map(ImageToImageAttributesMapper.updateAttributesOptions(attributesOptions))
//             .orElse(attributesOptions)
//         return updatedAttributesOptions
//     }

//     private static updateAttributesOptions(currentOptions: IImageAttributeOptions): (newOptions:IImageAttributeOptions) => IImageAttributeOptions{
//         return (newOptions:IImageAttributeOptions) => {
//             return {...currentOptions, ...newOptions}
//         }
//     }

//     private static getSizeAttributes(dimensions:IPixelDimensions): ISizeAttributes{
//         return {
//             width:dimensions.width.magnitude,
//             height:dimensions.height.magnitude
//         }
//     }
// }

// export interface IImageAttributeOptions extends Partial<IImageAttributes>{
// }

// export interface IHtmlAttributesBuilder{
//     buildImageAttributesString(options: IImageAttributeOptions):string
// }

// export class HtmlAttributesBuilder implements IHtmlAttributesBuilder{
//     buildImageAttributesString(options: Partial<IImageAttributes>): string {
//        return Object.entries(options).map(([key,value]) => `${key}="${value}"`).join(" ")
//     }

// }

// //<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>
// //https://pixelsconverter.com/pt-to-px