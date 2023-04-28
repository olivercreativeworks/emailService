import { Maybe } from "../Utility/Maybe"
import { GoogleDocs } from "./GoogleDocsDocumentModel"

namespace MyFuncs{
    export function mapProps<A extends string, B, C>(obj:Record<A, B>, mapFn:(arg:B) => C): Record<A, C>{
        return Object.fromEntries( Object.entries(obj).map(([key,val]:[A, B]) => [key, mapFn(val)]) ) as Record<A,C>
    }
    export function isNotNull(x:any):boolean{
        return !!(x)
    }
}

export namespace HtmlMapper{
    export function docsToHtml(...docs:Array<GoogleDocs.DocumentModel>):string{
        return Array.from(docs, convertDocToHtmlString).join("")
    }

    function convertDocToHtmlString(doc:GoogleDocs.DocumentModel):string{
        return ParagraphElementMapper.convertDocToParagraphElements(doc).reduce(toHtmlParagraphs, "")
    }

    function toHtmlParagraphs(html:string, arr:Array<ParagraphElement>):string{
        return html.concat(makeParagraph(arr))
    }
    
    function makeParagraph(arr:Array<ParagraphElement>):string{
        return HtmlCreator.makeParagraph(arr.map(toHtml).join(''))
    }
    
    function toHtml(element:ParagraphElement):string{
        const html = isImage(element) ? HtmlCreator.makeImage(element.src, element.size) : element.text
        return element.link.map(link => HtmlCreator.makeLink(link, html)).orElse(html)   
    }

    function isImage(element:ParagraphElement):element is Image{
        return (element as Image).src !== undefined
    }
}

namespace HtmlCreator{
    export function makeParagraph(text:string){
        return makeHtml("p", text)
    }
    
    export function makeLink(href:string, innerText:string):string{
        const linkAttributes = HtmlAttributesMapper.toLinkAttributes(href)
        return makeHtmlFromAttributesObject("a", innerText, linkAttributes)
    }
    
    export function makeImage(src:string, size:SizeInPixels):string{
        const imageAttributes = HtmlAttributesMapper.toImageAttributes(src, size)
        return makeHtmlFromAttributesObject("img", "", imageAttributes)       
    }

    function makeHtmlFromAttributesObject(tag:string, innerText:string="", attributes:HtmlAttributes):string{
        return makeHtml(tag, innerText, HtmlAttributesMapper.createAttributesString(attributes))
    }

    function makeHtml(tag:string, innerText:string="", attributes:string=""):string{
        return `<${tag} ${attributes}>${innerText}</${tag}>`
    }
}

/**
 * Google docs inline object sizes are measured in points, but html uses pixels.
 * The size units interface helps capture this difference. 
 */
enum SizeUnits{
    pixel = "pixel",
    point = "PT"
}
interface Measurement<unitOfMeasure extends SizeUnits>{
    magnitude: number
    unit: unitOfMeasure
}

type MeasuredInPixels = Measurement<SizeUnits.pixel>

interface SizeInPixels{
    height: MeasuredInPixels
    width: MeasuredInPixels
}
type MeasuredInPoints = Measurement<SizeUnits.point>

function convertPointsToPixels(dimension:MeasuredInPoints): MeasuredInPixels{
    const POINTS_TO_PIXEL_RATIO = 4/3
    return {magnitude: dimension.magnitude * POINTS_TO_PIXEL_RATIO, unit:SizeUnits.pixel}
}

/**
 * We map Google Docs paragraph elements to our own paragraph elements. Then we map our paragraph elements to html string.
 */

namespace ParagraphElementMapper{
    export function convertDocToParagraphElements(doc:GoogleDocs.DocumentModel):Array<Array<ParagraphElement>>{
        return Array.from(doc.body.content, mapContentToParagraphElements(doc.inlineObjects)).filter(MyFuncs.isNotNull)
    }

    function mapContentToParagraphElements(inlineObjects:GoogleDocs.InlineObjectsModel): (content:GoogleDocs.BodyContentModel) =>  Array<ParagraphElement>{
        return content => content?.paragraph?.elements?.map(toParagraphElement(inlineObjects))
    }
    function toParagraphElement(inlineObjects:GoogleDocs.InlineObjectsModel = {}): (element:GoogleDocs.ParagraphElementModel) => ParagraphElement{
        return (element) => makeImage(inlineObjects, element.inlineObjectElement).orElseGet(()=> makeTextRun(element.textRun))
    }

    function makeImage(inlineObjects: GoogleDocs.InlineObjectsModel, image:GoogleDocs.InlineObjectElementModel):Maybe<Image>{
        const props = getImageProps(inlineObjects, image)
        const link = getLink(image?.textStyle)
        const src = props.map(getSourceUrl)
        const size = props.map(getSizeInPixels)
        return Maybe.liftA2((src:string) => (size:SizeInPixels) => ({src, size, link}), src, size)
    }

    function makeTextRun(textRun:GoogleDocs.TextRunModel):TextRun{
        const text = textRun.content
        const link = Maybe.of(textRun?.textStyle?.link?.url)
        return {text, link}
    }

    function getSizeInPixels(props:GoogleDocs.InlineObjectPropertiesModel):SizeInPixels{
        return MyFuncs.mapProps(props.embeddedObject.size, convertPointsToPixels)
    }

    function getSourceUrl(props:GoogleDocs.InlineObjectPropertiesModel):string{
        return props.embeddedObject.imageProperties.contentUri
    }
    function getLink(textStyle:GoogleDocs.TextStyleModel):Maybe<string>{
        return Maybe.of(textStyle?.link?.url)
    }

    function getImageProps(inlineObjects:GoogleDocs.InlineObjectsModel, image:GoogleDocs.InlineObjectElementModel): Maybe<GoogleDocs.InlineObjectPropertiesModel>{
        return Maybe.of(image?.inlineObjectId).map(id => inlineObjects[id]?.inlineObjectProperties)
    }
}

interface Image{
    src:string
    size:SizeInPixels
    link:Maybe<string>
}

interface TextRun{
    text:string
    link:Maybe<string>
}

type ParagraphElement = Image | TextRun


namespace HtmlAttributesMapper{
    export function toImageAttributes(src:string, size:SizeInPixels):HtmlImageAttributes{
        const height = size.height.magnitude
        const width = size.width.magnitude
        return {height, width, src}
    }
    export function toLinkAttributes(href:string):HtmlLinkAttributes{
        return {href, target:"_blank"}
    }
    export function createAttributesString(attributes:HtmlAttributes):string{
        return Object.entries(attributes).map(joinAttributeWithValue).join(" ")    
    }
    function joinAttributeWithValue([attribute, value]:[AttributeNames, string]):string{
        return `${attribute}="${value}"`
    }
}

interface HtmlImageAttributes{
    src:string
    width:number
    height:number
}
interface HtmlLinkAttributes{
    href:string
    target:"_blank"
}
type HtmlAttributes = HtmlLinkAttributes | HtmlImageAttributes
type AttributeNames = keyof HtmlLinkAttributes | keyof HtmlImageAttributes









