import { Applicative, Monad } from "./Interfaces"
import { List } from "./List"
import { Maybe } from "./Maybe"

export namespace Funcs{
    export function isNotNull<A>(x:A):boolean{
        return !!(x)
    }

    export function concatStrings(...strings:Array<string>):string{
        return strings.reduce((str1:string, str2:string) => str1.concat(str2))
    }

    export function reduceListToString(list:List<string>):string{
        return list.reduce(Funcs.concatStrings)
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

    type MonadMethodReturnType<A extends Monad<unknown>, methodName extends keyof Monad<unknown>> = ReturnType< A[methodName]>
    type MonadType<ContainerType extends Monad<unknown>, ValueType> = MonadMethodReturnType<ContainerType, "map"> & Monad<ValueType>

    export function map<A,B,C extends Monad<B>>(fn:(arg:A) => B, returnType:(arg:B) => C): (monad:MonadType<C, A>) => C  {
        return (monad:MonadType<C,A>) => monad.map(fn) as C
    }
}



// function testingMap(){
//     const cat = Maybe.of(1)
//     const kitten = List.of(2)
//     const add = (x:number) => x + 1
//     const dog = cat.map(add)
//     const dog2 = map(add, cat)
//     const dog3 = map(add, kitten)
//     const dog4 = Funcs.curryA2(map)(add)(cat)
//     const dog5 = Funcs.curryA2(map)()
//     const elephant = greet("j", ["l"])
//     const elephant1 = Funcs.curryA2(greet)(3)("j")
//     const dog6 = map(add, Maybe.of) (Maybe.of(4))
//     const dog7 = Funcs.curryA3(map)(add)(Maybe.of)()
// }

// function map2(fn, moand){
//     return moand.map(fn)
// }
// // type MakeReturnTypeAny = ReturnType<() => any>
// // type MakeGeneric<A extends Monad<string>, B extends (arg:any) => Monad<any>> = 

// // function map<A, B>(fn:(arg:A) => B, maybe:Maybe<A>): Maybe<B>
// // function map<A, B>(fn:(arg:A) => B, list:List<A>): List<B>
// // function map(fn:(arg:unknown) => unknown, monad:Monad<unknown>): unknown{
// //     return monad.map(fn)
// // }


// // function map<A,B,C extends Monad<B>, D extends Monad<A> >(fn:(arg:A) => B, returnType:(arg:B) => C ): (monad:D & MapReturnType<C>) => C  {
// //     return (monad:D & MapReturnType<C>) => monad.map(fn) as C
// // }

// function greet(x:number, person: string): string;
// function greet(x:string, persons: string[]): string[];
 
// // Implementation signature
// function greet(x:unknown, person: unknown): unknown {
//   if (typeof person === 'string' && typeof x =="string") {
//     console.log(x)
//     return `Hello, ${person}!`;
//   } else if (Array.isArray(person)) {
//     return person.map(name => `Hello, ${name}!`);
//   }
//   throw new Error('Unable to greet');
// }

