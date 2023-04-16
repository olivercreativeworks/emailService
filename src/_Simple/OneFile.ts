import { DocsDocumentModel, DocsInlineObjectElementModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel, DocsParagraphElementModel, DocsTextRunModel } from "../Main/Models/DocsDocumentModel"
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

function createParagraphHtml(text:string){
    return `<p>${text}</p>`
}

function createImageHtml(height:number, width:number, sourceUrl:string):string{
    return `<img height="${height}" width="${width}" src="${sourceUrl}"></img>`
}

function createLinkHtml(link:string, innerText:string):string{
    return `<a href="${link}" target="blank">${innerText}</a>`
}

function createLinkHtmlForElement(element: DocsInlineObjectElementModel | DocsTextRunModel, innerText:string): Maybe<string>{
    return Maybe.of(element.textStyle?.link?.url).map(link => createLinkHtml(link, innerText))
}

function convertTextRunToString(textRun:DocsTextRunModel){
    const text = textRun.content
    return createLinkHtmlForElement(textRun, text).orElse(text)
}

function convertImageToString(inlineObjects:DocsInlineObjectsModel, inlineObjectElement:DocsInlineObjectElementModel){
    const objProps = inlineObjects[inlineObjectElement.inlineObjectId]?.inlineObjectProperties
    
    const sourceUrl = objProps.embeddedObject.imageProperties.contentUri   
    const [height, width] = getSizeInPixels(objProps.embeddedObject.size)

    const imgHtml = createImageHtml(height, width, sourceUrl)
    
    return createLinkHtmlForElement(inlineObjectElement, imgHtml).orElse(imgHtml)
}

function getSizeInPixels(size:DocsInlineObjectSizeModel):[height: number, width:number]{
    const height = convertPointsToPixels(size.height.magnitude)
    const width = convertPointsToPixels(size.width.magnitude)
    return [height, width]
}

function convertPointsToPixels(pointMagnitude:number):number{
    return pointMagnitude * (4/3)
}
