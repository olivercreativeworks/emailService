import { Applicative } from "./Interfaces"
import { Maybe } from "./Maybe"

export namespace Funcs{
    export function isNotNull<A>(x:A):boolean{
        return !!(x)
    }

    export function concatStrings(str1:string, str2:string):string{
        return str1.concat(str2)
    }
    
    export function liftA2<A,B,C>(fn:(arg1:A) => (arg2:B) => C, applicative1:Maybe<A>, applicative2:Maybe<B>):Maybe<C>
    export function liftA2<A,B,C>(fn:(arg1:A) => (arg2:B) => C, applicative1:Applicative<A>, applicative2:Applicative<B>):Applicative<C>{
        return applicative1.map(fn).ap(applicative2)
    }
    
    export function curryLiftA2<A,B,C>(fn:(arg1:A, arg2:B) =>  C, maybe1:Maybe<A>, maybe2:Maybe<B>): Maybe<C>{
        return Funcs.liftA2(Funcs.curryA2(fn), maybe1, maybe2)
    }


    export function curryA2<A,B,C>(fn:(arg1:A, arg2:B) => C): (arg1:A) => (arg2:B) => C{
        return (arg1:A) => (arg2:B) => fn(arg1, arg2)
    }
    
    export function curryA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D): (arg1:A) => (arg2:B) => (arg3:C) => D{
        return (arg1:A) => (arg2:B) => (arg3:C) => fn(arg1, arg2, arg3)
    }
    
    export function liftA3<A,B,C,D>(fn:(arg1:A) => (arg2:B) => (arg3:C) => D, applicative1:Maybe<A>, applicative2:Maybe<B>, applicative3:Maybe<C>):Maybe<D>
    export function liftA3<A,B,C,D>(fn:(arg1:A) => (arg2:B) => (arg3:C) => D, applicative1:Applicative<A>, applicative2:Applicative<B>, applicative3:Applicative<C>):Applicative<D>{
        return applicative1.map(fn).ap(applicative2).ap(applicative3)
    }
    
    export function curryLiftA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D, applicative1:Maybe<A>, applicative2:Maybe<B>, applicative3:Maybe<C>):Maybe<D>{
        return liftA3(curryA3(fn), applicative1, applicative2, applicative3)
    }
}

