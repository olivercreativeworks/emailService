interface HtmlMapper{
    addParagraphTags(text:string):string
    addLinkTags(url:string, text:string):string
}

export class MyHtmlMapper implements HtmlMapper{
    addParagraphTags(text: string): string {
        return `<p>${text}</p>`
    }
    addLinkTags(url: string, text: string): string {
        return `<a href="${url}", target="_blank">${text}</a>`
    }
}