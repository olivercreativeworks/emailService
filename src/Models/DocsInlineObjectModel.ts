import { DocsLinkModel } from "./DocsDocumentModel"
export type DocsInlineObjectsModel = Record<string, DocsInlineObjectModel>

export interface DocsInlineObjectModel{
    objectId?: string
    inlineObjectProperties?: DocsInlineObjectPropertiesModel
}

export interface DocsInlineObjectPropertiesModel{
    embeddedObject?: DocsEmbeddedObjectModel
}

export interface DocsEmbeddedObjectModel{
    imageProperties?: DocsImagePropertiesModel
}

export interface DocsImagePropertiesModel{
    contentUri?: string
}

export interface DocsInlineObjectElement{
    inlineObjectId?: string
    link?: DocsLinkModel
}

