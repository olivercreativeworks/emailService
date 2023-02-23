import { DocsLinkModel, DocsTextStyleModel } from "./DocsDocumentModel"
export type DocsInlineObjectsModel = Record<string, $DocsInlineObjectModel>

export interface $DocsInlineObjectModel{
    objectId?: string
    inlineObjectProperties?: DocsInlineObjectPropertiesModel
}

export interface DocsInlineObjectPropertiesModel{
    embeddedObject?: DocsEmbeddedObjectModel
}

export interface DocsEmbeddedObjectModel{
    imageProperties?: DocsImagePropertiesModel
    size?:DocsInlineObjectSize
}

export interface DocsImagePropertiesModel{
    contentUri?: string
}

export interface DocsInlineObjectElementModel{
    inlineObjectId?: string
    textStyle?: DocsTextStyleModel
}

export interface DocsInlineObjectSize{
    height?:Magnitude
    width?:Magnitude
}

type magnitudeUnits = "PT"
interface Magnitude{
    magnitude?: number
    unit?: magnitudeUnits
}



