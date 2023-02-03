export class HtmlFormatter{
    constructor(){}
  
    buildHtmlBody(...content: string[]):string{
      return content.join("")
    }
  
    makeHtmlParagraph(text:string):string{
      return `<p>${text}<\p>`
    }
  
    /** @param {string} text @param {string} url */
    makeHtmlLink(text:string, url:string):string{
      return `<a href=${url}>${text}<\a>`
    }
  
    addLineBreak():string{
      return `<br>`
    }
  }