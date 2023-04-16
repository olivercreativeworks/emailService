import { DocsBodyContentModel, DocsDocumentModel, DocsInlineObjectElementModel, DocsInlineObjectPropertiesModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel, DocsParagraphElementModel, DocsTextRunModel } from "./DocsDocumentModel"
import { List } from "../Utility/List"
import { List_2D } from "../Utility/List_2D"
import { Maybe, MaybeUtility } from "../Utility/Maybe"


function callingBelow(){
    const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel
    convertDocToHtml(doc1).map(Logger.log)
    convertDocToHtml(doc2).map(Logger.log)
}

export namespace HtmlConverter{
    export function convertDocToHtml(doc:DocsDocumentModel){
        return getElements(doc).map(convertElementsToHtml(doc)).map(combineHtmlToSingleString)
    }
}

function convertDocToHtml(doc:DocsDocumentModel){
    return getElements(doc).map(convertElementsToHtml(doc)).map(combineHtmlToSingleString)
}

function convertElementsToHtml(doc:DocsDocumentModel): (elements:List_2D<DocsParagraphElementModel>) => List_2D<string>{
    return (elements:List_2D<DocsParagraphElementModel>) => elements.compactMap(singleElementToHtml(doc))
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

function singleElementToHtml(doc:DocsDocumentModel): (paragraphElement:DocsParagraphElementModel) => string{
    return (paragraphElement:DocsParagraphElementModel) => elementIsImage(paragraphElement) ? 
        convertImageToString(doc.inlineObjects, paragraphElement.inlineObjectElement) : 
        convertTextRunToString(paragraphElement.textRun)
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

function createImageAttributes(height: number, width:number, src:string):ImageAttributes{
    return {height, width, src}
}

function createLinkAttributes(href:string, target:string= "_blank"):LinkAttributes{
    return {href, target}
}

function createParagraphHtml(text:string){
    return createHtmlTag("p", text)
}

function createImageHtml(imageAttributes:ImageAttributes):string{
    return createHtmlTag("img", null, createAttributesString(imageAttributes))
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
    const [height, width] = getSizeInPixels(inlineObjectProperties.embeddedObject.size)
    return createImageAttributes(height, width, sourceUrl)
 
}

function getSizeInPixels(size:DocsInlineObjectSizeModel):[height: number, width:number]{
    const height = convertPointsToPixels(size.height.magnitude)
    const width = convertPointsToPixels(size.width.magnitude)
    return [height, width]
}

function convertPointsToPixels(pointMagnitude:number):number{
    return pointMagnitude * (4/3)
}
