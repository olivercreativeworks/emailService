export interface DocsDocumentModel{
    body?:DocsBodyModel
    inlineObjects?: DocsInlineObjectsModel
}

export interface DocsBodyModel{
    content?:Array<DocsBodyContentModel>
}

export interface DocsBodyContentModel{
    paragraph?:DocsParagraphModel
}

export interface DocsParagraphModel{
    elements?:Array<DocsParagraphElementModel>
}

export interface DocsParagraphElementModel{
    textRun?:DocsTextRunModel
    inlineObjectElement?:DocsInlineObjectElementModel
}

export interface DocsTextRunModel{
    content?: string
    textStyle?:DocsTextStyleModel
}

export interface DocsTextStyleModel{
    link?:DocsLinkModel
}

export interface DocsLinkModel{
    url?:string
}

export interface DocsInlineObjectElementModel{
    inlineObjectId?: string
    textStyle?: DocsTextStyleModel
}


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












