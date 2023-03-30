import { DocsInlineObjectSizeModel } from "../../../Models/DocsDocumentModel"
import { ISizeInPixels, SizeInPixels } from "./SizeUnits"

export type convertDocsSizeToPixelSizeFn = (size: DocsInlineObjectSizeModel) => ISizeInPixels

export interface IPixelSizeConverter{
    convertDocsSizeToPixelSize(size:DocsInlineObjectSizeModel):ISizeInPixels
}

export class DocsSizeMapper implements IPixelSizeConverter{
    convertDocsSizeToPixelSize: convertDocsSizeToPixelSizeFn

    private constructor(convertDocsSizeToPixelSizeFn:convertDocsSizeToPixelSizeFn){
        this.convertDocsSizeToPixelSize = convertDocsSizeToPixelSizeFn
    }
    static of(convertDocsSizeToPixelSizeFn:convertDocsSizeToPixelSizeFn):DocsSizeMapper{
        return new DocsSizeMapper(convertDocsSizeToPixelSizeFn)
    }

    static initializeWithDefaults():DocsSizeMapper{
        return DocsSizeMapper.of(SizeInPixels.convertDocsSizeToPixelSize)
    }
}
