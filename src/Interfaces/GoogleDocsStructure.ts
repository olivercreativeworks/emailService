export interface DocsDocument{
    body?:DocsBody
}

export interface DocsBody{
    content?:Array<DocsBodyContent>
}

export interface DocsBodyContent{
    paragraph?:DocsParagraph
}

export interface DocsParagraph{
    elements?:Array<DocsParagraphElement>
}

export interface DocsParagraphElement{
    textRun?:DocsTextRun
}

export interface DocsTextRun{
    content?: string
    textStyle?:DocsTextStyle
}

export interface DocsTextStyle{
    link?:DocsLink
}

export interface DocsLink{
    url?:string
}












