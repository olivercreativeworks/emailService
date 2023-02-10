export interface DocsLink{
    url?:string
}
export interface DocsTextStyle{
    link?:DocsLink
}

export interface DocsTextRun{
    content?: string
    textStyle?:DocsTextStyle
}

export interface DocsHtmlTextRun{
    textRun:DocsTextRun
    asHtmlString: string
}

export interface DocsParagraphElement{
    textRun?:DocsTextRun
}
export interface DocsParagraph{
    elements?:Array<DocsParagraphElement>
}

export interface DocsBodyContent{
    paragraph?:DocsParagraph
}

export interface DocsBody{
    content?:Array<DocsBodyContent>
}

export interface DocsDocument{
    body?:DocsBody
}