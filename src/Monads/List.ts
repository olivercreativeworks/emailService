import { MonadDefinitions } from "./Interfaces"

interface Applicative<Value> extends MonadDefinitions.Applicative<Value>{
}

export class List<Value>{
    private $value: Value[]

    constructor(value: Value[]){
        this.$value = value
    }

    static fromArr<A>(x: Array<A>): List<A>{
        return new List(x)
    }

    static of<A>(...x:A[]): List<A>{
        return new List(x)
    }

    // typecasting 
    // https://www.typescripttutorial.net/typescript-tutorial/type-casting/
    map<B>(fn:(value:Value) => B): List<B> {
        return List.fromArr(this.$value.map(fn))
    }

    filter(fn:(value:Value) => boolean): List<Value>{
        return List.fromArr(this.$value.filter(fn))
    }

    join<A>(this:List<List<A>>): List<A>{
        return this.reduce((prev:List<A>, curr:List<A>) => prev.concat(curr.$value))
    }

    flatMap<B>(fn:(value:Value) => List<B>): List<B>{
        return this.map(fn).join()
    }
    private static valueIsNotNothing(x:any):boolean{
        return !(isNothing(x))

        function isNothing(x:any):boolean{
            return x == null || x == undefined
        }
    }

    compactMap<B>(fn:(value:Value) => B, filterFn:(x:B) => boolean = List.valueIsNotNothing): List<B>{
        return this.map(fn).filter(filterFn)
        
        
    }
    
    concat(...items: (Value | ConcatArray<Value>) []){
        return List.fromArr(this.$value.concat(...items))
    }

    // overloading
    // https://www.typescriptlang.org/docs/handbook/2/functions.html
    reduce(fn:(initialValue:Value, currentValue:Value) => Value, initialValue?:Value):Value
    reduce<A>(fn:(initialValue:A, currentValue:Value) => A, initialValue:A):A
    reduce(fn:(initialValue, currentValue) => any, initialValue?:any) {
        return initialValue ? this.$value.reduce(fn, initialValue) : this.$value.reduce(fn)
    }

    traverse<A, B extends Applicative<List<A>>, C extends Applicative<any>>(this:List<Applicative<A>>, of:(value:List<A>) => B, fn: (value: Value)=> C): B{
        return this.reduce( (intial, curr) => intial.map(list => (value:A) => list.concat(value)).ap(fn(curr as Value)) as B, of(List.fromArr([])))
    }

    private identity<A>(x:A):A{
        return x
    }

    sequence<A, B extends Applicative<List<A>>>(this:List<Applicative<A>>, of:(value:List<A>) => B): B{
        return this.traverse(of,this.identity)
    }

    asArray():Array<Value>{
        return this.$value
    }

}

export function toList<A>(list:List<A>, value:A):List<A>{
    return list.concat(value)
}

console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().map(x => List.of(x+1, x+2)))
console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().flatMap(x => List.of(x+1, x+2)))
console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().map(x => x%2 == 0 ? List.of(x+1, x+2) : null))
console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().compactMap(x => x%2 == 0 ? List.of(x+1, x+2) : null).join())