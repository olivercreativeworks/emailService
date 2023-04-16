import { DocsDocumentModel } from "../Main/Models/DocsDocumentModel"
import { List } from "../Utility/List"
import { List_2D } from "../Utility/List_2D"
import { Maybe } from "../Utility/Maybe"


function callingBelow(){
    const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel
    convertDocToHtml(doc1).map(Logger.log)
    convertDocToHtml(doc2).map(Logger.log)
}


function convertDocToHtml(doc:DocsDocumentModel){
    const elements = Maybe.of(doc.body?.content?.map(content => content?.paragraph?.elements).filter(i => !!i)).map(List_2D.from2DArr)

    const elementsAsString = elements.map(
        elements_2D => elements_2D.compactMap( paragraphElement => {
            const inlineObjectId = paragraphElement?.inlineObjectElement?.inlineObjectId
            const hasInlineObjectId = !!(inlineObjectId)
            if (hasInlineObjectId){
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
            else if (!hasInlineObjectId){
                const textRun = paragraphElement.textRun 
                const text = textRun.content
                const link = textRun.textStyle?.link?.url
                const hasLink = !! link
                return hasLink ? `<a href="${link}" target="blank">${text}</a>` : text
            }
        })
    )

    const htmlString = elementsAsString.map(string_2D => string_2D.reduce(
        (str:string, list:List<string>) => str.concat(
            `<p>${list.asArray().join(" ")}</p>`
        ).trim() ," "))
    
    // htmlString.map(Logger.log)
    return htmlString
}
