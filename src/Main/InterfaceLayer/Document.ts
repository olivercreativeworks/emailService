// import { DocsInlineObjectsModel } from "../Models/DocsDocumentModel"
// import { MonadDefinitions } from "../../Utility/Interfaces"
// import { List } from "../../Utility/List"
// import { ListApplicativeWrapperFn, List_2D } from "../../Utility/List_2D"

// interface Applicative<Value> extends MonadDefinitions.Applicative<Value>{
// }

// interface IDocument<BaseElement>{
//     $value: List_2D<BaseElement>
//     inlineObj?: DocsInlineObjectsModel
//     compactMapWithInlineObj<B>(fn:(inlineObj?:DocsInlineObjectsModel) => (value:BaseElement) => B, baseElementPredicate?:(x:B) => boolean): IDocument<B>
//     sequence<A, B extends Applicative<Document<A>>>(this:Document<Applicative<A>>, of: ListApplicativeWrapperFn<A>, returnType?:(arg:Document<A>) => B): B
// }

// export class Document<BaseElement>{
//     $value: List_2D<BaseElement>
//     inlineObj?: DocsInlineObjectsModel

//     constructor(paragraphs: List_2D<BaseElement>, inlineObj?:DocsInlineObjectsModel ){
//         this.$value = paragraphs
//         this.inlineObj = inlineObj
//     }

//     static of<A>(paragraphs:List_2D<A>, inlineObj?:DocsInlineObjectsModel):Document<A>{
//         return new Document(paragraphs, inlineObj)
//     }

//     static from2DArray<A>(paragraphs:Array<Array<A>>, inlineObj?: DocsInlineObjectsModel):Document<A>{
//         return Document.of( List_2D.from2DArr(paragraphs), inlineObj)
//     }
//     static fromList<A>(paragraphs:List<List<A>>, inlineObj?: DocsInlineObjectsModel):Document<A>{
//         return Document.of( List_2D.of(paragraphs), inlineObj)
//     }

//     compactMap<B>(fn:(value:BaseElement) => B, baseElementPredicate?:(x:B) => boolean): Document<B>{
//         return Document.of( this.$value.compactMap(fn, baseElementPredicate), this.inlineObj )
//     }

//     compactMapWithInlineObj<B>(fn:(inlineObj?:DocsInlineObjectsModel) => (value:BaseElement) => B, baseElementPredicate?:(x:B) => boolean): Document<B>{
//         return this.compactMap(fn(this.inlineObj), baseElementPredicate)
//     }

//     sequence<A, B extends Applicative<Document<A>>>(this:Document<Applicative<A>>, of: ListApplicativeWrapperFn<A>, returnType?:(arg:Document<A>) => B): B{
//         return this.$value.sequence(of).map(list_2D => Document.of(list_2D, this.inlineObj)) as B
//     }
    
//     reduce<A>(fn:(initialValue:A, currentValue:List<BaseElement>) => A, initialValue:A):A{
//         return this.$value.reduce(fn, initialValue)
//     }
// }