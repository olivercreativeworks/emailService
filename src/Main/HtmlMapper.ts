interface HtmlMapper{
    addParagraphTags(text:string):string
    addLinkTags(url:string, text:string):string
    addImageTags(sourceUrl: string):string
}

export class MyHtmlMapper implements HtmlMapper{
    addParagraphTags(text: string): string {
        return `<p>${text}</p>`
    }
    addLinkTags(url: string, text: string): string {
        return `<a href="${url}", target="_blank">${text}</a>`
    }
    addImageTags(sourceUrl:string, otherProps?:string): string{
        return `<img src="${sourceUrl}" ${otherProps}>`
    }
    static createAttributes(attributeString:string, [attributeName, attributeValue]:[string, string]):string{
        return attributeString.concat(`${attributeName}:"${attributeValue}"`)
    }
    static createAttributesFromAttributesObject(attributesObject:Record<string, string>):string{
        return Object.entries(attributesObject).reduce(MyHtmlMapper.createAttributes, " ").trim()
    }
}

//<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>
//https://pixelsconverter.com/pt-to-px