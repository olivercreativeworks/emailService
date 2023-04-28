export namespace GoogleDocs{
    export interface DocumentModel{
        body?:BodyModel
        inlineObjects?: InlineObjectsModel
    }
    
    export interface BodyModel{
        content?:Array<BodyContentModel>
    }
    
    export interface BodyContentModel{
        paragraph?:ParagraphModel
    }
    
    export interface ParagraphModel{
        elements?:Array<ParagraphElementModel>
    }
    
    export interface ParagraphElementModel{
        textRun?:TextRunModel
        inlineObjectElement?:InlineObjectElementModel
    }
    
    export interface TextRunModel{
        content?: string
        textStyle?:TextStyleModel
    }
    
    export interface TextStyleModel{
        link?:LinkModel
    }
    
    export interface LinkModel{
        url?:string
    }
    
    export interface InlineObjectElementModel{
        inlineObjectId?: string
        textStyle?: TextStyleModel
    }
    
    
    export type InlineObjectsModel = Record<string, $InlineObjectModel>
    
    export interface $InlineObjectModel{
        objectId?: string
        inlineObjectProperties?: InlineObjectPropertiesModel
    }
    
    export interface InlineObjectPropertiesModel{
        embeddedObject?: EmbeddedObjectModel
    }
    
    export interface EmbeddedObjectModel{
        imageProperties: ImagePropertiesModel
        size:InlineObjectSizeModel
    }
    
    export interface ImagePropertiesModel{
        contentUri?: string
    }
    
    export interface InlineObjectSizeModel{
        height:MagnitudeModel
        width:MagnitudeModel
    }
    
    export interface MagnitudeModel{
        magnitude: number
        unit: "PT"
    }
}












