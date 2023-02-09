import { Maybe } from "./Maybe"
import { List } from "./List"
import { MonadDefinitions } from "./Interfaces"

type Monad<Value> = MonadDefinitions.Monad<Value>

// type GetOutterType<T> = InstanceType<T>
// type Unified<A, B> = B & A
// type Monadable<R> = Unified<Monad<any>, R>

export class Pipe<Initial, ReturnType>{
    private $value:(value:Initial) => ReturnType

    static of<A,B>(x:(value:A) => B):Pipe<A,B>{
        return new Pipe(x)
    }

    private constructor(x:(value:Initial) => ReturnType){
        this.$value = x
    }

    addToPipe<C>(fn:(value:ReturnType) => C):Pipe<Initial, C>{
        return Pipe.of( (initialValue:Initial) => fn(this.$value(initialValue)) )
    }

    // map<Value, B, C extends Monad<B>>(this: Pipe<Initial, {map:(fn:(value:Value) => any) => C}>, fn:(value: Value) => B): Pipe<Initial, C>{
    // map<A,B>(this:Pipe<Initial, Maybe<A>>, fn:(value:A) => B): Pipe<Initial, Maybe<B>>
    // map<A,B,C>(this:Pipe<Initial, {map:(fn:(value:A)=>B) => C}>, fn:(value:A) => B): Pipe<Initial, C>
    // map<A,B,C>(this: Pipe<Initial, {map:(fn:any) => C}>, fn:(value:A) => B){
    //     return Pipe.of( (initialValue:Initial) => this.$value(initialValue).map(fn) )

    //     // return Pipe.of( (initialValue:R) => pipe.$value(initialValue).map(fn) )
    // }

    // flatMap<A,B>(this:Pipe<Initial, Maybe<A>>, fn:(value:A) => Maybe<B>): Pipe<Initial, Maybe<B>>
    // flatMap<A,B>(this:Pipe<Initial, Monad<A>>, fn:(value:A) => Monad<B>): Pipe<Initial, Monad<B>>{
    //     return Pipe.of( (initialValue:Initial) => this.$value(initialValue).map(fn).join() )

    //     // return Pipe.of( (initialValue:R) => pipe.$value(initialValue).map(fn) )
    // }

    // compactMap<A, B extends A|Maybe<A>, C>(this:Pipe<Initial, List<B>>, fn:(value:C) => B): Pipe<Initial, List<B>{
    //     return Pipe.of( (initialValue:Initial) => this.$value(initialValue) )
    // }
    // static maps<A,B,C>(pipe:Pipe<A, Monad<B>>, fn:(value:B) => C){
        
    // }

    // static map(monad, fn){
    //     return monad.map(fn)
    // }

    evaluate(initialValue:Initial): ReturnType{
        return this.$value(initialValue)
    }
}

// type Wrapped<T, F, K extends F> = Monad<T>

// function mapz<A,B,C extends Monad<B>>(fn:(value:A)=>B, monad:{map:(fn:(value:A)=>B) => C}){
//     return monad.map(fn)
// }

// type maprx<A,B,C> = (fn:(string:string)=>A, number:number) => string
// type mapr<A,B,C> = (fn:(value:A) => B, monad:Monad<A>, of?:(value:B)=>C) => C
// type maybeMaprr<A,B> = mapr<A,B, typeof Maybe.of>

// // type maprz<A,B,C> = (string:string, number:number) => string
// // ( ((value:A) => B), (monad:Monad<A>), of?:(value:B)=>C): C

// type maybeMapr<A,B> = mapr<A,B, typeof Maybe.of>


// // type maybeMapr<A,B, typeof Maybe.of> = typeof mapr



// type woofable<T, R> = Monad<T> & (R extends Monad<T> ? R : never)
// const woof2: woofable<string, Maybe<number>>
// woof2

// function mapwoof<A,B extends number,C, D extends {map:(fn:(value:A)=>number) => C} >(fn:(value:A) => number, monad:D):woofable<number, C>{
//     return monad.map(fn) as woofable<number,C>
// }



// const woof: Monad<string> | Maybe<string>
// const aMaybe:InstanceType<typeof Maybe>
// // const returnValue = aMaybe.map
// function returnValue<T>(val:(value:T) => T){
//     return aMaybe.map(val)
// }
// type s = ReturnType<typeof returnValue>
// // type getReturnValue= ReturnType<>
// // const cats:getReturnValue
// const dogs: s

// type Container<T> = {
//     [x in keyof T]: T[x]
// }






// interface mapp<A, C>{
//     <B>(fn:(value:A) => B): C
// }

// interface MyMonad<Value>{
//     map:mapp<Value, MyMonad<A>>
// }

// type Mappables = {
//     map:(value:any) => any
// }



// class Blank{
//     something:string
//     constructor(){
//         this.something = "yes"
//     }
// }


