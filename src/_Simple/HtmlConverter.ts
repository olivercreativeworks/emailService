import { DocsBodyContentModel, DocsDocumentModel, DocsInlineObjectElementModel, DocsInlineObjectPropertiesModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel, DocsParagraphElementModel, DocsTextRunModel } from "./DocsDocumentModel"
import { List } from "../Utility/List"
import { List_2D } from "../Utility/List_2D"
import { Maybe, MaybeUtility } from "../Utility/Maybe"


export namespace HtmlConverter{
    export function docsToHtml(...docs:Array<DocsDocumentModel>):Maybe<string>{
        const docsAsStrings = List.fromArr(docs).traverse(Maybe.of, convertDocToHtml)
        const concatDocs = docsAsStrings.map(list => list.toString(""))
        return concatDocs
    }
}

function convertDocToHtml(doc:DocsDocumentModel):Maybe<string>{
    return getElements(doc).map(elementsToHtml(doc.inlineObjects))
}

function getElements(doc:DocsDocumentModel):Maybe<List_2D<DocsParagraphElementModel>>{   
    return getBodyContent(doc).flatMap(getParagraphElements).map(List_2D.of)
    
    function getBodyContent(doc:DocsDocumentModel):Maybe<List<DocsBodyContentModel>>{
        return Maybe.of(doc.body?.content).map(List.fromArr)
    }
    function getParagraphElements(contentList:List<DocsBodyContentModel>):Maybe<List<List<DocsParagraphElementModel>>>{
        return contentList.compactMap(getElements, MaybeUtility.isSomething).sequence(Maybe.of) 
        
        function getElements(content: DocsBodyContentModel): Maybe<List<DocsParagraphElementModel>>{
            return Maybe.of(content?.paragraph?.elements).map(List.fromArr)
        }
    }
}

function elementsToHtml(inlineObjects:DocsInlineObjectsModel): (elements: List_2D<DocsParagraphElementModel>) => string{
    return elements => elements.compactMap(elementToHtml(inlineObjects)).asList().map(makeHtmlParagraph).toString("")

    function makeHtmlParagraph(list:List<string>):string{
        return Html.makeParagraph(list.toString())
    }
    function elementToHtml(inlineObjects:DocsInlineObjectsModel): (element:DocsParagraphElementModel) => string{
        return (element) => isImage(element) ? 
        createHtml(element.inlineObjectElement, imageToHtml(inlineObjects)) : 
        createHtml(element.textRun, textRunToHtml)
        
        function isImage(element:DocsParagraphElementModel):boolean{
            const hasInlineObjectId = !!(element?.inlineObjectElement?.inlineObjectId)
            return hasInlineObjectId
        }

        function createHtml<A extends DocsInlineObjectElementModel | DocsTextRunModel>(element:A, createHtmlFn:(arg:A) => string):string{
            const html = createHtmlFn(element)
            const link = Maybe.of(element.textStyle?.link?.url)
            return link.map(createLinkAttributes).map(linkAttributes => Html.makeLink(linkAttributes, html)).orElse(html)

            function createLinkAttributes(href:string, target:LinkTarget = LinkTarget._blank):LinkAttributes{
                return {href, target}
            }            
        }

        function imageToHtml(inlineObjects:DocsInlineObjectsModel): (image:DocsInlineObjectElementModel) => string{
            return (image) => getImageProps(inlineObjects, image.inlineObjectId).map(toImageAttributes).map(Html.makeImage).orElse("<img></img>") 
            
            function getImageProps(inlineObjects:DocsInlineObjectsModel, inlineObjectId:string):Maybe<DocsInlineObjectPropertiesModel>{
                return Maybe.of(inlineObjects[inlineObjectId]?.inlineObjectProperties)
            }
            function toImageAttributes(inlineObjectProperties: DocsInlineObjectPropertiesModel):HtmlImageAttributes{
                const src = inlineObjectProperties.embeddedObject.imageProperties.contentUri   
                const size = toSizeInPixels(inlineObjectProperties.embeddedObject.size)
                return {size, src}
                
                function toSizeInPixels(size:DocsInlineObjectSizeModel): SizeInPixels {
                    const POINTS_TO_PIXEL_RATIO = 4/3
                    const height = size.height.magnitude * POINTS_TO_PIXEL_RATIO
                    const width = size.width.magnitude *POINTS_TO_PIXEL_RATIO
                    return {height, width, unit:SizeUnits.pixel}
                }
            }
        }

        function textRunToHtml(textRun:DocsTextRunModel):string{
            return textRun.content
        } 
    }
}

enum SizeUnits{
    pixel = "pixel",
}

interface SizeInPixels{
    height:number
    width:number
    unit: SizeUnits.pixel
}

enum LinkTarget{
    _blank = "_blank"
}

interface LinkAttributes{
    href:string
    target?:LinkTarget
}

interface HtmlImageAttributes{
    src:string
    size:SizeInPixels
}

namespace Html{
    interface ImageAttributes{
        src:string
        width:number
        height:number
    }
    export function makeLink(linkAttributes:LinkAttributes, innerText:string):string{
        return makeHtml("a", innerText, createAttributesString(linkAttributes))
    }
    
    export function makeImage(htmlImageAttributes:HtmlImageAttributes):string{
        const imageAttributes = toImageAttributes(htmlImageAttributes)
        return makeHtml("img", "", createAttributesString(imageAttributes))
        
        function toImageAttributes(htmlImageAttributes:HtmlImageAttributes):ImageAttributes{
            const height = htmlImageAttributes.size.height
            const width = htmlImageAttributes.size.width
            const src = htmlImageAttributes.src
            return {height, width, src}
        }
    }
    
    export function makeParagraph(text:string){
        return makeHtml("p", text)
    }
    
    function makeHtml(tag:string, innerText:string="", attributes:string=""):string{
        return `<${tag}${" "+attributes}>${innerText}</${tag}>`
    }

    function createAttributesString(attributes:ImageAttributes | LinkAttributes):string{
        return Object.entries(attributes).map(joinAttributeWithValue).join(" ")
        
        function joinAttributeWithValue([attribute, value]:[string, string]):string{
            return `${attribute}="${value}"`
        }
    }    
}










































