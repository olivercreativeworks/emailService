interface Monad<Value>{
    map<A>(fn:(value:Value) => A): Monad<A>
    join<A>(this:Monad<Monad<A>>): Monad<A>
    flatMap<A>(fn:(value:Value) => Monad<A>): Monad<A>
}

interface Applicative<Value>{
    map<A>(fn:(value:Value) => A): Applicative<A>
    ap<A, B>(this: Applicative<(value:A) => B>, otherApplicative: Applicative<A>): Applicative<B>
}

export class List<Value> implements Monad<Value>{
    private $value: Value[]

    constructor(value: Value[]){
        this.$value = value
    }

    static fromArr<A>(x: Array<A>): List<A>
    static fromArr<A,B>(x:Array<A>, mapFn:(arg:A) => B): List<B>
    static fromArr<A,B>(arr:Array<A>, mapFn?:(arg:A) => B){
        return mapFn ? new List(Array.from(arr, mapFn)) : new List(arr)
    }

    static of<A>(...x:A[]): List<A>{
        return new List(x)
    }

    // typecasting 
    // https://www.typescripttutorial.net/typescript-tutorial/type-casting/
    map<B>(fn:(value:Value) => B): List<B> {
        return List.fromArr(this.$value.map(value =>  fn(value)))
    }

    filter(fn:(value:Value) => boolean): List<Value>{
        return List.fromArr(this.$value.filter(value => fn(value)))
    }

    join<A>(this:List<List<A>>): List<A>{
        return this.reduce((prev:List<A>, curr:List<A>) => prev.concat(curr.$value))
    }

    flatMap<B>(fn:(value:Value) => List<B>): List<B>{
        return this.map(fn).join()
    }

    compactMap<B>(fn:(value:Value) => B, filterFn:(x:B) => boolean = valueExists): List<B>{
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
        return initialValue ? this.$value.reduce((value, currVal) => fn(value, currVal), initialValue) : this.$value.reduce((value, currVal) => fn(value, currVal))
    }

    reduceWrap(fn:(initialValue:Value, currentValue:Value) => Value, initialValue?:Value):List<Value>
    reduceWrap<A>(fn:(initialValue:A, currentValue:Value) => A, initialValue:A):List<A>
    reduceWrap(fn:(initialValue, currentValue) => any, initialValue?:any) {
        return this.isEmpty() ? this : List.of(this.reduce(fn, initialValue))
    }

    isEmpty(){
        return this.$value.length == 0
    }

    traverse<A, B extends Applicative<List<A>>>(of:(value:List<A>) => B, fn: (value: Value)=> Applicative<A>): B{
        return this.reduce( (intial, curr) => intial.map(list => (value:A) => list.concat(value)).ap(fn(curr as Value)) as B, of(List.fromArr([])))
    }

    private identity<A>(x:A):A{
        return x
    }

    sequence<A, B extends Applicative<List<A>>>(this:List<Applicative<A>>, of:(value:List<A>) => B): B{
        return this.traverse(of, this.identity)
    }

    compactSequence<A, B extends Applicative<List<A>>>(fn:(value:Value) => Applicative<A>, filterFn:(x:Applicative<A>) => boolean, of:(value:List<A>) => B):B{
        return this.compactMap(fn, filterFn).sequence(of)
    }

    asArray():Array<Value>{
        return this.$value
    }

    toString(separator:string = " "):string{
        return this.asArray().join(separator)
    }

    compactMap2d<A, B>(this:List<Array<A>>, fn:(value:A) => B, filterFn:(x:B) => boolean = valueExists):List<Array<B>>{
        return List.fromArr( this.$value.map(arr => arr.map(fn).filter(filterFn)) )
    }

    map2d<A,B>(this:List<Array<A>>, fn:(value:A) => B):List<Array<B>>{
        return this.compactMap2d(fn, () => true)
    }
}

// console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().map(x => List.of(x+1, x+2)))
// console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().flatMap(x => List.of(x+1, x+2)))
// console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().map(x => x%2 == 0 ? List.of(x+1, x+2) : null))
// console.log(List.of(List.fromArr([3,4,5]), List.fromArr([6,7,8])).join().compactMap(x => x%2 == 0 ? List.of(x+1, x+2) : null).join())

function valueExists(x:any):boolean{
    return !(isNothing(x))

    function isNothing(x:any):boolean{
        return x == null || x == undefined
    }
}