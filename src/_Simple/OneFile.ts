import { DocsDocumentModel, DocsParagraphElementModel } from "../Main/Models/DocsDocumentModel"
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
    const elementsAsString = elements.map(convertElementsToString(doc))
    const htmlString = elementsAsString.map(combineElementsToSingleString)
    
    return htmlString
}

function getElements(doc:DocsDocumentModel):Maybe<List_2D<DocsParagraphElementModel>>{
    return Maybe.of(doc.body?.content?.map(content => content?.paragraph?.elements).filter(Utility.isNotNull)).map(List_2D.from2DArr)
}

function combineElementsToSingleString(string_2D:List_2D<string>):string{
    return string_2D.reduce(
        (str:string, list:List<string>) => str.concat(`<p>${list.asArray().join(" ")}</p>`)," "
        )
}

function convertElementsToString(doc:DocsDocumentModel): (elements_2D:List_2D<DocsParagraphElementModel>) => List_2D<string>{
    return (elements_2D:List_2D<DocsParagraphElementModel>) =>  elements_2D.compactMap( paragraphElement => {
        const inlineObjectId = paragraphElement?.inlineObjectElement?.inlineObjectId
        const hasInlineObjectId = !!(inlineObjectId)
        if (hasInlineObjectId){
            return convertImageToString(doc, inlineObjectId, paragraphElement)
        }
        else if (!hasInlineObjectId){
            return convertTextRunToString(paragraphElement)
        }
    })
}

function convertTextRunToString(paragraphElement:DocsParagraphElementModel){
    const textRun = paragraphElement.textRun 
    const text = textRun.content
    const link = textRun.textStyle?.link?.url
    const hasLink = !! link
    return hasLink ? `<a href="${link}" target="blank">${text}</a>` : text
}

function convertImageToString(doc:DocsDocumentModel, inlineObjectId:string, paragraphElement:DocsParagraphElementModel){
    const inlineObjects = doc.inlineObjects
    const objProps = inlineObjects[inlineObjectId]?.inlineObjectProperties
    
    const sourceUrl = objProps.embeddedObject.imageProperties.contentUri
    
    const size = objProps.embeddedObject.size
    const height = size.height.unit == "PT" ? size.height.magnitude * (4/3) : size.height.magnitude
    const width = size.height.unit == "PT" ? size.width.magnitude * (4/3) : size.width.magnitude
    
    const imgHtml = `<img height="${height}" width="${width}" src="${sourceUrl}"></img>`
    
    const link = paragraphElement.inlineObjectElement?.textStyle?.link?.url
    const hasLink = !! link
    return hasLink ? `<a href="${link}" target="blank">${imgHtml}</a>` : imgHtml
}
