export namespace GoogleDocsStructure{
    export interface Link{
        url?:string
    }
    export interface TextStyle{
        link?:Link
    }

    export interface TextRun{
        content?: string
        textStyle?:TextStyle
    }

    export interface HtmlTextRun{
        textRun:TextRun
        asHtmlString: string
    }
    
    export interface ParagraphElement{
        textRun?:TextRun
    }
    export interface Paragraph{
        elements?:ParagraphElement[]
    }
    
    export interface BodyContent{
        paragraph?:Paragraph
    }
    
    export interface Body{
        content?:BodyContent[]
    }
    
    export interface Document{
        body?:Body
    }
}