import { DocsBodyContentModel, DocsDocumentModel, DocsInlineObjectElementModel, DocsInlineObjectPropertiesModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel, DocsParagraphElementModel, DocsTextRunModel } from "./DocsDocumentModel"
import { List } from "../Utility/List"
import { List_2D } from "../Utility/List_2D"
import { Maybe, MaybeUtility } from "../Utility/Maybe"
import { Funcs } from "../Utility/Utility"
import { Monad } from "../Utility/Interfaces"


export namespace HtmlConverter{
    export function convertDocToHtml(doc:DocsDocumentModel):Maybe<string>{
        const elements = DocsDocument.getElements(doc)
        const html = elements.map(elementsToHtmlString(doc.inlineObjects))
        return html
    }
    
    export function docsToHtml(...docs:Array<DocsDocumentModel>):Maybe<string>{
        const docsAsStrings = List.fromArr(docs).traverse(Maybe.of, convertDocToHtml)
        const concatDocs = docsAsStrings.map(Funcs.reduceListToString)
        return concatDocs
    }

    function elementsToHtmlString(inlineObjects:DocsInlineObjectsModel): (elements: List_2D<DocsParagraphElementModel>) => string{
        return elements => elements.compactMap(elementsToHtml(inlineObjects)).reduce(combineListsToParagraphHtml," ")
    }
    
    function combineListsToParagraphHtml(str:string, list:List<string>):string{
        return str.concat(HtmlWrapper.makeParagraph(list.toString()))
    }
    
    function elementsToHtml(inlineObjects:DocsInlineObjectsModel): (element:DocsParagraphElementModel) => string{
        return (element) => isImage(element) ? imageToString(inlineObjects, element.inlineObjectElement) : textRunToString(element.textRun)
    }

    function isImage(element:DocsParagraphElementModel):boolean{
        const hasInlineObjectId = !!(element?.inlineObjectElement?.inlineObjectId)
        return hasInlineObjectId
    }
    
    function imageToString(inlineObjects:DocsInlineObjectsModel, inlineObjectElement:DocsInlineObjectElementModel){
        const objProps = inlineObjects[inlineObjectElement.inlineObjectId]?.inlineObjectProperties
        const imageAttributes = getImageAttributes(objProps)
        const imgHtml = HtmlWrapper.makeImage(imageAttributes)
        return createLinkHtmlForElement(inlineObjectElement, imgHtml).orElse(imgHtml)
    }

    function createLinkHtmlForElement(element: DocsInlineObjectElementModel | DocsTextRunModel, innerText:string): Maybe<string>{
        return Maybe.of(element.textStyle?.link?.url).map(HtmlWrapper.createLinkAttributes).map(linkAttributes => HtmlWrapper.makeLink(linkAttributes, innerText))
    }
        
    function textRunToString(textRun:DocsTextRunModel):string{
        const text = textRun.content
        return createLinkHtmlForElement(textRun, text).orElse(text)
    }


    export function getImageAttributes(inlineObjectProperties: DocsInlineObjectPropertiesModel):HtmlWrapper.ImageAttributes{
        const sourceUrl = inlineObjectProperties.embeddedObject.imageProperties.contentUri   
        const size = getSizeInPixels(inlineObjectProperties.embeddedObject.size)
        return HtmlWrapper.createImageAttributes(size, sourceUrl)
    }

    function getSizeInPixels(size:DocsInlineObjectSizeModel):HtmlWrapper.SizeInPixels{
        const height = size.height.magnitude
        const width = size.width.magnitude
        const unit = size.width.unit || size.height.unit // this will be "PT"
        return HtmlWrapper.pointToPixel({height, width, unit}) 
    }
}

namespace HtmlWrapper{
    export function makeHtml(tag:string, innerText:string="", attributes:string=""):string{
        return `<${tag} ${attributes}>${innerText}</${tag}>`
    }

    export interface LinkAttributes{
        href:string
        target:string
    }

    export function makeLink(linkAttributes:LinkAttributes, innerText:string):string{
        return makeHtml("a", innerText, createAttributesString(linkAttributes))
    }
    

    export function createLinkAttributes(href:string, target:string= "_blank"):LinkAttributes{
        return {href, target}
    }

    export function makeImage(imageAttributes:ImageAttributes):string{
        return makeHtml("img", "", createAttributesString(imageAttributes))
    }
    
    export function createImageAttributes(size:SizeInPixels, src:string):ImageAttributes{
        const {height, width} = size
        return {height, width, src}
    }
    export function makeParagraph(text:string){
        return makeHtml("p", text)
    }

    export interface ImageAttributes{
        src:string
        width:number
        height:number
    }


    export function createAttributesString(attributes:(LinkAttributes | ImageAttributes)):string{
        return Object.entries(attributes).map(joinAttributeWithValue).join(" ")
        
        function joinAttributeWithValue([attribute, value]:[string, string]):string{
            return `${attribute}="${value}"`
        }
    }


    
    interface Size<unitOfMeasure extends typeof IMAGE_SIZE_UNITS[keyof typeof IMAGE_SIZE_UNITS]>{
        height:number
        width:number
        unit:unitOfMeasure
    }
    
    export type SizeInPixels = Size<"pixel">
    type SizeInPoint = Size<"point"> | Size<"PT">
    
    const IMAGE_SIZE_UNITS = {
        pixel: "pixel",
        point: "point",
        pt:"PT"
    } as const
    

    export function pointToPixel(size:SizeInPoint):SizeInPixels{
        const height = applyPointToPixelRatio(size.height)
        const width = applyPointToPixelRatio(size.width)
        return createSizeInPixels(height, width)
    }
    
    function createSizeInPixels(height:number, width:number):SizeInPixels{
        return {height, width, unit:IMAGE_SIZE_UNITS.pixel}
    }
    const POINTS_TO_PIXEL_RATIO = 4/3
    
    function applyPointToPixelRatio(pointMagnitude:number):number{
        return pointMagnitude * POINTS_TO_PIXEL_RATIO
    }
    
}

namespace DocsDocument{
    export function getElements(doc:DocsDocumentModel):Maybe<List_2D<DocsParagraphElementModel>>{
        return getBodyContent(doc).flatMap(getParagraphElementsFromContentList).map(List_2D.of)
    }
    
    function getBodyContent(doc:DocsDocumentModel):Maybe<List<DocsBodyContentModel>>{
        return Maybe.of(doc.body?.content).map(List.fromArr)
    }
    function getParagraphElements(content: DocsBodyContentModel): Maybe<List<DocsParagraphElementModel>>{
        return Maybe.of(content?.paragraph?.elements).map(List.fromArr)
    }
    
    function getParagraphElementsFromContentList(contentList:List<DocsBodyContentModel>):Maybe<List<List<DocsParagraphElementModel>>>{
        return contentList.compactMap(getParagraphElements, MaybeUtility.isSomething).sequence(Maybe.of) 
    }
}





































// function getSizeInPixels(size:DocsInlineObjectSizeModel):SizeInPixels{
//     const height = convertPointsToPixels(size.height.magnitude)
//     const width = convertPointsToPixels(size.width.magnitude)
//     const unit = IMAGE_SIZE_UNITS.pixel
//     return {height, width, unit}
// }

