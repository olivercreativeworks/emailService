import { Maybe, UnwrapMaybe } from "../Monads/Maybe"
import { List } from "../Monads/List"


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
        return Document.of(this.paragraphs.map( paragraph => paragraph.map(fn)))
    }
    map<A>(fn: (baseUnit: IParagraph<BaseUnit>) => IParagraph<A>): Document<A>{
        return Document.of(this.paragraphs.map(fn))
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
        return Paragraph.of(this.$baseUnits.map(fn))
    }
}

type UnwrapProps<WrappedProp> = {
    [x in keyof WrappedProp] : WrappedProp[x] extends Maybe<unknown> ? UnwrapMaybe<WrappedProp[x]> : WrappedProp[x]
}
type UnwrapedTextRun = UnwrapProps<ITextRun>
type TextRunOptions = Partial<UnwrapedTextRun>
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