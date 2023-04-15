import { MonadDefinitions } from "../../../Utility/Interfaces"
import { List } from "../../../Utility/List"
import { List_2D, ListApplicativeWrapperFn } from "../../../Utility/List_2D"
import { DocsInlineObjectsModel } from "../../Models/DocsDocumentModel"

interface Applicative<Value> extends MonadDefinitions.Applicative<Value>{
}

export interface IDocsDocument<BaseElement>{
    $value: List_2D<BaseElement>
    inlineObj?: DocsInlineObjectsModel
    compactMapWithInlineObj<B>(fn:(inlineObj?:DocsInlineObjectsModel) => (value:BaseElement) => B, baseElementPredicate?:(x:B) => boolean): IDocsDocument<B>
    sequence<A, B extends Applicative<DocsDocument<A>>>(this:DocsDocument<Applicative<A>>, of: ListApplicativeWrapperFn<A>, returnType?:(arg:DocsDocument<A>) => B): B
}

export class DocsDocument<BaseElement> implements IDocsDocument<BaseElement>{
    $value: List_2D<BaseElement>
    inlineObj?: DocsInlineObjectsModel

    constructor(paragraphs: List_2D<BaseElement>, inlineObj?:DocsInlineObjectsModel ){
        this.$value = paragraphs
        this.inlineObj = inlineObj
    }

    static of<A>(paragraphs:List_2D<A>, inlineObj?:DocsInlineObjectsModel):DocsDocument<A>{
        return new DocsDocument(paragraphs, inlineObj)
    }

    static fromList<A>(paragraphs:List<List<A>>, inlineObj?: DocsInlineObjectsModel):DocsDocument<A>{
        return DocsDocument.of( List_2D.of(paragraphs), inlineObj )
    }

    compactMapWithInlineObj<B>(fn:(inlineObj?:DocsInlineObjectsModel) => (value:BaseElement) => B, baseElementPredicate?:(x:B) => boolean): DocsDocument<B>{
        return DocsDocument.of( this.$value.compactMap(fn(this.inlineObj), baseElementPredicate), this.inlineObj )
    }

    sequence<A, B extends Applicative<DocsDocument<A>>>(this:DocsDocument<Applicative<A>>, of: ListApplicativeWrapperFn<A>, returnType?:(arg:DocsDocument<A>) => B): B{
        return this.$value.sequence(of).map(list_2D => DocsDocument.of(list_2D, this.inlineObj)) as B
    }
}








