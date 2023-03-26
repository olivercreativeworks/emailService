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
    size?:DocsInlineObjectSizeModel
}

export interface DocsImagePropertiesModel{
    contentUri?: string
}

export interface DocsInlineObjectSizeModel{
    height?:DocsMagnitudeModel
    width?:DocsMagnitudeModel
}

export interface DocsMagnitudeModel{
    magnitude: number
    unit: "PT"
}


