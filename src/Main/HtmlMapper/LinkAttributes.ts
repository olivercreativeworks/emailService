
type ValidTarget = "_blank"

export interface ILinkAttributes{
    href: string
    target:ValidTarget
}

export class LinkAttributes implements ILinkAttributes{
    href: string
    target:ValidTarget
    
    private constructor(href:string, target:ValidTarget){
        this.href = href
        this.target = target
    }

    private static of(href:string, target:ValidTarget):LinkAttributes{
        return new LinkAttributes(href, target)
    }

    static from(link:string):LinkAttributes{
        return LinkAttributes.of(link, "_blank")
    }
}