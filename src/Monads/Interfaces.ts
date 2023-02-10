export namespace MonadDefinitions{
    export interface Functor<Value>{
        map<A>(fn:(value:Value) => A): Functor<A>
    }
    
    export interface Monad<Value>{
        map<A>(fn:(value:Value) => A): Monad<A>
        join<A>(this:Monad<Monad<A>>): Monad<A>
        flatMap<A>(fn:(value:Value) => Monad<A>): Monad<A>
    }
    
    export interface Applicative<Value>{
        map<A>(fn:(value:Value) => A): Applicative<A>
        ap<A, B>(this: Applicative<(value:A) => B>, otherApplicative: Applicative<A>): Applicative<B>
    }
}