import { Maybe } from "../Monads/Maybe"
import { List } from "../Monads/List"
import { OptionalProps } from "./Utility"


export interface IDocument<BaseUnit>{
    paragraphs:List<IParagraph<BaseUnit>>
    mapParagraphBaseUnit:<A>(fn:(baseUnit:BaseUnit) => A) => IDocument<A>
    map:<A>(fn:(baseUnit:IParagraph<BaseUnit>) => IParagraph<A>) => IDocument<A>
}

export interface IParagraph<BaseUnit>{
    $baseUnits: List<BaseUnit>
    map:<A>(fn:(baseUnit:BaseUnit) => A) => IParagraph<A>
}

export interface ITextRun{
    text:Maybe<string>
    url:Maybe<string>
}

export interface IInlineImage{
    imageSourceUrl:Maybe<string>
    url:Maybe<string>
}

export interface IParagraphElement{
    textRun:Maybe<ITextRun>
    inlineImage: Maybe<IInlineImage>
}
interface ParagraphElementOptions extends OptionalProps<IParagraphElement>{
}

export class ParagraphElement implements IParagraphElement{
    textRun: Maybe<ITextRun>
    inlineImage: Maybe<IInlineImage>
    
    constructor(options: ParagraphElementOptions){
        this.textRun = Maybe.of(options.textRun)
        this.inlineImage = Maybe.of(options.inlineImage)
    }
    static of(textRun?: ITextRun, inlineImage?:IInlineImage): ParagraphElement{
        return new ParagraphElement({textRun, inlineImage})
    }
}

export class Document<BaseUnit> implements IDocument<BaseUnit>{
    paragraphs: List<IParagraph<BaseUnit>>
    
    constructor(paragraphs:List<IParagraph<BaseUnit>>){
        this.paragraphs = paragraphs
    }
    
    static of<A>(paragraphs:List<IParagraph<A>>):Document<A>{
        return new Document(paragraphs)
    }

    static fromList<A>(list:List<List<A>>):Document<A>{
        return Document.of( list.map(Paragraph.of) )
    }

    mapParagraphBaseUnit<A>(fn: (baseUnit: BaseUnit) => A): Document<A>{
        return Document.of(this.paragraphs.compactMap( paragraph => paragraph.map(fn)))
    }
    map<A>(fn: (baseUnit: IParagraph<BaseUnit>) => IParagraph<A>): Document<A>{
        return Document.of(this.paragraphs.compactMap(fn))
    }
}

class Paragraph<BaseUnit> implements IParagraph<BaseUnit>{
    $baseUnits: List<BaseUnit>

    constructor(baseUnits:List<BaseUnit>){
        this.$baseUnits = baseUnits
    }

    static of<A>(baseUnits:List<A>):Paragraph<A>{
        return new Paragraph(baseUnits)
    }

    map<A>(fn: (baseUnit: BaseUnit) => A): Paragraph<A>{
        return Paragraph.of(this.$baseUnits.compactMap(fn))
    }
}



type TextRunOptions = OptionalProps<ITextRun>
interface ITextRunOptions extends TextRunOptions{
}

export class TextRun implements ITextRun{
    text: Maybe<string>
    url: Maybe<string>

    constructor(options: ITextRunOptions){
        this.text = Maybe.of(options.text)
        this.url = Maybe.of(options.url)
    }

    static of(text:string, url?:string){
        return new TextRun({text, url})
    }
}

type InlineImageOptions = OptionalProps<IInlineImage>
interface IInlineImageOptions extends InlineImageOptions{
}

export class InlineImage implements IInlineImage{
    imageSourceUrl: Maybe<string>
    url: Maybe<string>

    constructor(options: IInlineImageOptions){
        this.imageSourceUrl = Maybe.of(options.imageSourceUrl)
        this.url = Maybe.of(options.url)
    }

    static of(imageSourceUrl:string, url?:string){
        return new InlineImage({imageSourceUrl, url})
    }
}