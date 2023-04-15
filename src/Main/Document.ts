import { MonadDefinitions } from "../Utility/Interfaces"
import { List } from "../Utility/List"
import { List_2D, ListApplicativeWrapperFn } from "../Utility/List_2D"

interface Applicative<Value> extends MonadDefinitions.Applicative<Value>{
}

export class Document<BaseElement>{
    $value: List_2D<BaseElement>

    constructor(paragraphs: List_2D<BaseElement>){
        this.$value = paragraphs
    }

    static of<A>(paragraphs:List_2D<A>):Document<A>{
        return new Document(paragraphs)
    }

    static from2DArray<A>(paragraphs:Array<Array<A>>):Document<A>{
        return Document.of( List_2D.from2DArr(paragraphs))
    }
    static fromList<A>(paragraphs:List<List<A>>):Document<A>{
        return Document.of( List_2D.of(paragraphs))
    }

    compactMap<B>(fn:(value:BaseElement) => B, baseElementPredicate?:(x:B) => boolean): Document<B>{
        return Document.of( this.$value.compactMap(fn, baseElementPredicate))
    }

    sequence<A, B extends Applicative<Document<A>>>(this:Document<Applicative<A>>, of: ListApplicativeWrapperFn<A>, returnType?:(arg:Document<A>) => B): B{
        return this.$value.sequence(of).map(list_2D => Document.of(list_2D)) as B
    }
    
    reduce<A>(fn:(initialValue:A, currentValue:List<BaseElement>) => A, initialValue:A):A{
        return this.$value.reduce(fn, initialValue)
    }
}