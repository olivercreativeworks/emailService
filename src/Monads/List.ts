import { MonadDefinitions } from "./Interfaces"

interface Applicative<Value> extends MonadDefinitions.Applicative<Value>{
}

export class List<Value>{
    $value: Value[]

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

}