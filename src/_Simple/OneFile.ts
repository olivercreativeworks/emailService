import { DocsDocumentModel, DocsInlineObjectElementModel, DocsInlineObjectPropertiesModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel, DocsParagraphElementModel, DocsTextRunModel } from "../Main/Models/DocsDocumentModel"
import { List } from "../Utility/List"
import { List_2D } from "../Utility/List_2D"
import { Maybe } from "../Utility/Maybe"
import { Utility } from "../Utility/Utility"


function callingBelow(){
    const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel
    convertDocToHtml(doc1).map(Logger.log)
    convertDocToHtml(doc2).map(Logger.log)
}


function convertDocToHtml(doc:DocsDocumentModel){
    const elements = getElements(doc)
    const elementsAsString = elements.map(convertElementsToHtml(doc))
    const htmlString = elementsAsString.map(combineHtmlToSingleString)
    
    return htmlString
}

function getElements(doc:DocsDocumentModel):Maybe<List_2D<DocsParagraphElementModel>>{
    return Maybe.of(doc.body?.content?.map(content => content?.paragraph?.elements).filter(Utility.isNotNull)).map(List_2D.from2DArr)
}

function combineHtmlToSingleString(string_2D:List_2D<string>):string{
    return string_2D.reduce(
        (str:string, list:List<string>) => str.concat(createParagraphHtml(list.asArray().join(" ")))," "
        )
}

function convertElementsToHtml(doc:DocsDocumentModel): (elements_2D:List_2D<DocsParagraphElementModel>) => List_2D<string>{
    return (elements_2D:List_2D<DocsParagraphElementModel>) =>  elements_2D.compactMap( paragraphElement => {
        const inlineObjectId = paragraphElement?.inlineObjectElement?.inlineObjectId
        const hasInlineObjectId = !!(inlineObjectId)
        if (hasInlineObjectId){
            return convertImageToString(doc.inlineObjects, paragraphElement.inlineObjectElement)
        }
        else if (!hasInlineObjectId){
            return convertTextRunToString(paragraphElement.textRun)
        }
    })
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
