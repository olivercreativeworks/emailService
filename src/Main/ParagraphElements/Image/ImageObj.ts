import { DocsInlineObjectElementModel, DocsInlineObjectsModel, DocsEmbeddedObjectModel, DocsInlineObjectSizeModel } from "../../../Models/DocsDocumentModel"
import { Maybe } from "../../../Utility/Maybe"
import { SizeInPixels } from "./SizeUnits"


export interface IImage{
    sourceUrl:Maybe<string>
    size:Maybe<SizeInPixels>
    link:Maybe<string>
}

export class Image implements IImage{
    sourceUrl:Maybe<string>
    size:Maybe<SizeInPixels>
    link:Maybe<string>

    static of(inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel, mapper:(size:DocsInlineObjectSizeModel)=>SizeInPixels):Image{
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
        function getSizeInPixels(mapper:(size:DocsInlineObjectSizeModel)=>SizeInPixels, embeddedObj:DocsEmbeddedObjectModel): Maybe<SizeInPixels>{
            return Maybe.of(embeddedObj?.size).map(mapper)
        }
    }

    constructor(sourceUrl?:string, size?:SizeInPixels, link?:string){
        this.sourceUrl = Maybe.of(sourceUrl)
        this.size = Maybe.of(size)
        this.link = Maybe.of(link)
    }
}





