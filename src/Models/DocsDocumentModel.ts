import { DocsInlineObjectsModel } from "./DocsInlineObjectModel"

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











