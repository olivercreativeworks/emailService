import { MonadDefinitions } from "./Interfaces"
import { List } from "./List"
import { Maybe } from "./Maybe"

export class List_2D<BaseElement>{
    private $value: List<List<BaseElement>>

    constructor(value: List<List<BaseElement>>){
        this.$value = value
    }

    static from2DArr<A>(x: Array<Array<A>>): List_2D<A>{
        const list = List.fromArr(x).map(List.fromArr)
        return List_2D.of(list)
    }

    static of<A>(x: List<List<A>>): List_2D<A>{
        return new List_2D(x)
    }

    map<B>(fn:(value:BaseElement) => B): List_2D<B> {
        return List_2D.of(this.$value.map(list => list.map(fn)))
    }

    filter(fn:(value:BaseElement) => boolean): List_2D<BaseElement>{
        return List_2D.of(this.$value.map(list => list.filter(fn)))
    }

    asList():List<List<BaseElement>>{
        return this.$value
    }

    asArray():Array<Array<BaseElement>>{
        return this.$value.asArray().map(list => list.asArray())
    }

    compactMap<B>(fn:(value:BaseElement) => B, baseElementPredicate?:(x:B) => boolean, listPredicate?: (x:List<B>) => boolean): List_2D<B>{
        const $baseElementPredicate = baseElementPredicate || valueIsNotNothing
        const $listPredicate = listPredicate || valueIsNotNothing
        return List_2D.of(this.$value.map(list => list.compactMap(fn, $baseElementPredicate)).filter($listPredicate))

        function valueIsNotNothing(x:any):boolean{
            return !(isNothing(x))
    
            function isNothing(x:any):boolean{
                return x == null || x == undefined
            }
        }
    }
    
    concat(...items: Array<BaseElement>[]){
        return List_2D.from2DArr( this.asArray().concat(items) ) 
    }

    // overloading
    // https://www.typescriptlang.org/docs/handbook/2/functions.html
    reduce(fn:(initialValue:List<BaseElement>, currentValue:List<BaseElement>) => List<BaseElement>, initialValue?:List<BaseElement>):List<BaseElement>
    reduce<A>(fn:(initialValue:A, currentValue:List<BaseElement>) => A, initialValue:A):A
    reduce(fn:(initialValue, currentValue) => any, initialValue?:any) {
        return initialValue ? this.$value.reduce((value, currVal) => fn(value, currVal), initialValue) : this.$value.reduce((value, currVal) => fn(value, currVal))
    }


    traverse<A, C extends Applicative<List_2D<A>>>(of:ListApplicativeWrapperFn<A>, fn:(arg:BaseElement) => Applicative<A>, returnType?:(arg:List_2D<A>) => C): C{
        return this.$value.map(list => list.traverse(of as (arg:List<A>) => Applicative<List<A>>, fn)).sequence(of).map(List_2D.of) as C
    }

    sequence<A, B extends Applicative<List_2D<A>>>(this:List_2D<Applicative<A>>, of: ListApplicativeWrapperFn<A>, returnType?:(arg:List_2D<A>) => B): B{
        return this.$value.map(list => list.sequence(of)).sequence(of).map(List_2D.of) as B
    }
}

export type ListApplicativeWrapperFn<Unit> = 
    ((arg:List<Unit>) => Applicative<List<Unit>>) & 
    ((arg:List<List<Unit>>) => Applicative<List<List<Unit>>>)

interface Applicative<Value> extends MonadDefinitions.Applicative<Value>{
}