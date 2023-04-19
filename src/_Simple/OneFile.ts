import { DocsBodyContentModel, DocsDocumentModel, DocsInlineObjectElementModel, DocsInlineObjectPropertiesModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel, DocsParagraphElementModel, DocsTextRunModel } from "./DocsDocumentModel"
import { List } from "../Utility/List"
import { List_2D } from "../Utility/List_2D"
import { Maybe, MaybeUtility } from "../Utility/Maybe"
import { Funcs } from "../Utility/Utility"
import { Monad } from "../Utility/Interfaces"

export namespace HtmlConverter{
    export function convertDocToHtml(doc:DocsDocumentModel){
        return getElements(doc).map(Funcs.compactMap(elementsToHtml(doc.inlineObjects), List_2D.from)).map(combineHtmlToSingleString)
    }
    
    export function docsToHtml(...docs:Array<DocsDocumentModel>):Maybe<string>{
        const docsAsStrings = List.fromArr(docs).traverse(Maybe.of, convertDocToHtml)
        const concatDocs = docsAsStrings.map(Funcs.reduceListToString)
        return concatDocs
    }
}

// function convertElementsToHtml(inlineObjects:DocsInlineObjectsModel): (elements:List_2D<DocsParagraphElementModel>) => List_2D<string>{
//     return (elements:List_2D<DocsParagraphElementModel>) => elements.compactMap(singleElementToHtml(inlineObjects))
// }
function elementsToHtml(inlineObjects:DocsInlineObjectsModel): (paragraphElement:DocsParagraphElementModel) => string{
    return (paragraphElement:DocsParagraphElementModel) => elementIsImage(paragraphElement) ? 
        convertImageToString(inlineObjects, paragraphElement.inlineObjectElement) : 
        convertTextRunToString(paragraphElement.textRun)
}
function getElements(doc:DocsDocumentModel):Maybe<List_2D<DocsParagraphElementModel>>{
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


function combineHtmlToSingleString(string_2D:List_2D<string>):string{
    return string_2D.reduce(combineListsToParagraphHtml," ")
}

function combineListsToParagraphHtml(str:string, list:List<string>):string{
    return str.concat(listToParagraphHtml(list))
}

function listToParagraphHtml(list:List<string>):string{
    return createParagraphHtml(toString(list))
}

function toString(list:List<string>):string{
    return list.asArray().join(" ")
}



function elementIsImage(element:DocsParagraphElementModel):boolean{
    const hasInlineObjectId = !!(element?.inlineObjectElement?.inlineObjectId)
    return hasInlineObjectId
}

function createHtmlTag(tag:string, innerText:string="", attributes:string=""):string{
    return `<${tag} ${attributes}>${innerText}</${tag}>`
}

interface LinkAttributes{
    href:string
    target:string
}
interface ImageAttributes{
    src:string
    width:number
    height:number
}

function createAttributesString(attributes:(LinkAttributes | ImageAttributes)):string{
    return Object.entries(attributes).map(joinAttributeWithValue).join(" ")
    
    function joinAttributeWithValue([attribute, value]:[string, string]):string{
        return `${attribute}="${value}"`
    }
}

function createImageAttributes(size:SizeInPixels, src:string):ImageAttributes{
    const {height, width} = size
    return {height, width, src}
}

function createLinkAttributes(href:string, target:string= "_blank"):LinkAttributes{
    return {href, target}
}

function createParagraphHtml(text:string){
    return createHtmlTag("p", text)
}

function createImageHtml(imageAttributes:ImageAttributes):string{
    return createHtmlTag("img", "", createAttributesString(imageAttributes))
}

function createLinkHtml(linkAttributes:LinkAttributes, innerText:string):string{
    return createHtmlTag("a", innerText, createAttributesString(linkAttributes))
}

function createLinkHtmlForElement(element: DocsInlineObjectElementModel | DocsTextRunModel, innerText:string): Maybe<string>{
    return Maybe.of(element.textStyle?.link?.url).map(createLinkAttributes).map(linkAttributes => createLinkHtml(linkAttributes, innerText))
}

function convertTextRunToString(textRun:DocsTextRunModel){
    const text = textRun.content
    return createLinkHtmlForElement(textRun, text).orElse(text)
}

function convertImageToString(inlineObjects:DocsInlineObjectsModel, inlineObjectElement:DocsInlineObjectElementModel){
    const objProps = inlineObjects[inlineObjectElement.inlineObjectId]?.inlineObjectProperties
    const imageAttributes = getImageAttributes(objProps)
    const imgHtml = createImageHtml(imageAttributes)
    return createLinkHtmlForElement(inlineObjectElement, imgHtml).orElse(imgHtml)
}

function getImageAttributes(inlineObjectProperties: DocsInlineObjectPropertiesModel):ImageAttributes{
    const sourceUrl = inlineObjectProperties.embeddedObject.imageProperties.contentUri   
    const size = getSizeInPixels(inlineObjectProperties.embeddedObject.size)
    return createImageAttributes(size, sourceUrl)
}

interface Size<unitOfMeasure extends typeof IMAGE_SIZE_UNITS[keyof typeof IMAGE_SIZE_UNITS]>{
    height:number
    width:number
    unit:unitOfMeasure
}

type SizeInPixels = Size<"pixel">
type SizeInPoint = Size<"point"> | Size<"PT">

const IMAGE_SIZE_UNITS = {
    pixel: "pixel",
    point: "point",
    pt:"PT"
} as const

function getSizeInPixels(size:DocsInlineObjectSizeModel):SizeInPixels{
    const height = size.height.magnitude
    const width = size.width.magnitude
    const unit = size.width.unit || size.height.unit // This will be "PT"
    return pointToPixel({height, width, unit})
}

function createSizeInPixels(height:number, width:number):SizeInPixels{
    return {height, width, unit:IMAGE_SIZE_UNITS.pixel}
}

function pointToPixel(size:SizeInPoint):SizeInPixels{
    const height = applyPointToPixelRatio(size.height)
    const width = applyPointToPixelRatio(size.width)
    return createSizeInPixels(height, width)
}

// function getSizeInPixels(size:DocsInlineObjectSizeModel):SizeInPixels{
//     const height = convertPointsToPixels(size.height.magnitude)
//     const width = convertPointsToPixels(size.width.magnitude)
//     const unit = IMAGE_SIZE_UNITS.pixel
//     return {height, width, unit}
// }

const POINTS_TO_PIXEL_RATIO = 4/3

function applyPointToPixelRatio(pointMagnitude:number):number{
    return pointMagnitude * POINTS_TO_PIXEL_RATIO
}
