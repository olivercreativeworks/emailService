import { DocsInlineObjectElementModel, DocsInlineObjectsModel, DocsEmbeddedObjectModel, DocsInlineObjectSizeModel } from "../../../Models/DocsDocumentModel"
import { Maybe, curryLiftA2 } from "../../../Utility/Maybe"
import { IHtmlLinkTagCreator } from "../TextRun/Mapper"
import { IDocsImageMapper, IHtmlImageTagCreator } from "./HtmlMapper"
import { DocsImageMapper } from "./Mapper"
import { SizeInPixels } from "./SizeUnits"
import { IPixelSizeConverter } from "./SizeUnitsMapper"




export class Image{
    sourceUrl:Maybe<string>
    size:Maybe<SizeInPixels>
    link:Maybe<string>

    static toHtml(inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel, mapper:IDocsImageMapper = DocsImageMapper.initialzeWithDefaults()):string{
        const image = Image.of(inlineObj, imageProps, mapper)
        const imageHtml = wrapInImageTag(mapper, image.sourceUrl, image.size)
            .map(imgHtml => wrapInLinkTag(mapper, image.link, Maybe.of(imgHtml)).orElse(imgHtml))
            .orElse(`<img></img>`)
        return imageHtml

        function wrapInLinkTag(mapper:IHtmlLinkTagCreator, link:Maybe<string>, html:Maybe<string>):Maybe<string>{
            return curryLiftA2(mapper.wrapInLinkTag, link, html)
        }
        function wrapInImageTag(mapper: IHtmlImageTagCreator, sourceUrl:Maybe<string>, size:Maybe<SizeInPixels> ):Maybe<string>{
            return curryLiftA2(mapper.wrapInImageTag, sourceUrl, size)
        }
    }

    static of(inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel, mapper:IPixelSizeConverter):Image{
        const image = getDocsImage(inlineObj, imageProps)
        const sourceUrl = image.flatMap(getSourceUrl).unsafeUnwrap()
        const size = image.flatMap(image => getSizeInPixels(mapper, image)).unsafeUnwrap()
        const link = getLink(inlineObj).unsafeUnwrap()
        return new Image(sourceUrl, size, link)

        function getLink(inlineObj:DocsInlineObjectElementModel):Maybe<string>{
            return Maybe.of(inlineObj?.textStyle?.link?.url)
        }
        function getSourceUrl(embeddedObj:DocsEmbeddedObjectModel):Maybe<string>{
            return Maybe.of(embeddedObj?.imageProperties?.contentUri)
        }
        function getDocsImage(inlineObj:DocsInlineObjectElementModel, imageProps:DocsInlineObjectSizeModel ):Maybe<DocsEmbeddedObjectModel>{
            return Maybe.of(inlineObj?.inlineObjectId).map(id => imageProps[id]?.inlineObjectProperties?.embeddedObject)
        }
        function getSizeInPixels(mapper:IPixelSizeConverter, embeddedObj:DocsEmbeddedObjectModel): Maybe<SizeInPixels>{
            return Maybe.of(embeddedObj?.size).map(mapper.convertDocsSizeToPixelSize)
        }
    }

    constructor(sourceUrl?:string, size?:SizeInPixels, link?:string){
        this.sourceUrl = Maybe.of(sourceUrl)
        this.size = Maybe.of(size)
        this.link = Maybe.of(link)
    }
}





