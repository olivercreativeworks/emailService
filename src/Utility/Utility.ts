import { MonadDefinitions } from "./Interfaces"
import { Maybe } from "./Maybe"

interface Applicative<Value> extends MonadDefinitions.Applicative<Value>{
}

export namespace Utility{
    export function liftA2<A,B,C>(fn:(arg1:A) => (arg2:B) => C, applicative1:Maybe<A>, applicative2:Maybe<B>):Maybe<C>
    export function liftA2<A,B,C>(fn:(arg1:A) => (arg2:B) => C, applicative1:Applicative<A>, applicative2:Applicative<B>):Applicative<C>{
        return applicative1.map(fn).ap(applicative2)
    }
}
// function curryA2<A,B,C>(fn:(arg1:A, arg2:B) => C): (arg1:A) => (arg2:B) => C{
//     return (arg1:A) => (arg2:B) => fn(arg1, arg2)
// }
// function curryA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D): (arg1:A) => (arg2:B) => (arg3:C) => D{
//     return (arg1:A) => (arg2:B) => (arg3:C) => fn(arg1, arg2, arg3)
// }


// function liftA3<A,B,C,D>(fn:(arg1:A) => (arg2:B) => (arg3:C) => D, applicative1:Maybe<A>, applicative2:Maybe<B>, applicative3:Maybe<C>):Maybe<D>
// function liftA3<A,B,C,D>(fn:(arg1:A) => (arg2:B) => (arg3:C) => D, applicative1:Applicative<A>, applicative2:Applicative<B>, applicative3:Applicative<C>):Applicative<D>{
//     return applicative1.map(fn).ap(applicative2).ap(applicative3)
// }


// function curryLiftA2<A,B,C>(fn:(arg1:A, arg2:B) => C, applicative1:Maybe<A>, applicative2:Maybe<B>):Maybe<C>
// function curryLiftA2<A,B,C>(fn:(arg1:A, arg2:B) => C, applicative1:Applicative<A>, applicative2:Applicative<B>):Applicative<C>
// function curryLiftA2<A,B,C>(fn:(arg1:A, arg2:B) => C, applicative1, applicative2){
//     return liftA2(curryA2(fn), applicative1, applicative2)
// }

// function curryLiftA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D, applicative1:Maybe<A>, applicative2:Maybe<B>, applicative3:Maybe<C>):Maybe<D>{
//     return liftA3(curryA3(fn), applicative1, applicative2, applicative3)
// }