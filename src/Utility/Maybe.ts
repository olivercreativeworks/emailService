
interface Monad<Value>{
    map<A>(fn:(value:Value) => A): Monad<A>
    join<A>(this:Monad<Monad<A>>): Monad<A>
    flatMap<A>(fn:(value:Value) => Monad<A>): Monad<A>
}

export type UnwrapMaybe<A extends Maybe<unknown>> = ReturnType<A["unsafeUnwrap"]>

export class Maybe<Value> implements Monad<Value>{
    private $value?:Value
    
    static of<A>(x:A):Maybe<A>{
        return new Maybe(x)
    }

    // Decorator Function -- https://saul-mirone.github.io/a-complete-guide-to-typescript-decorator/
    //                       https://www.typescriptlang.org/docs/handbook/decorators.html
    // Call vs Apply vs Bind -- https://medium.com/@leonardobrunolima/javascript-tips-apply-vs-call-vs-bind-d738a9e8b4e1
    private static ignoreOperationIfValueIsNothing(target:Maybe<any>, propertyKey: string, descriptor:TypedPropertyDescriptor<(this:Maybe<any>, ...args) => any>) {
        const originalMethod = descriptor.value
        descriptor.value = function(this:Maybe<any>, ...args){
            return this.isNothing() ? this : originalMethod.apply(this, args)
        }
    }
    
    constructor(x:Value){
        this.$value = x
    }

    isNothing():boolean{
        return this.$value == null || this.$value == undefined
    }

    isSomething():boolean{
        return !(this.isNothing())
    }

    @Maybe.ignoreOperationIfValueIsNothing
    map<A>(fn:(value:Value) => A): Maybe<A> {
        return Maybe.of(fn(this.$value as Value))
    }

    @Maybe.ignoreOperationIfValueIsNothing
    join<A>(this:Maybe<Maybe<A>>): Maybe<A>{
        return Maybe.of(this.$value.$value)
    }

    flatMap<A>(fn:(value:Value) => Maybe<A>): Maybe<A>{
        return this.map(fn).join()
    }

    @Maybe.ignoreOperationIfValueIsNothing
    filter(fn:(value:Value) => boolean): Maybe<Value>{
        return fn(this.$value) ? this : Maybe.of(null)
    }

    @Maybe.ignoreOperationIfValueIsNothing
    ap<A, B>(this:Maybe<(value:A) => B>, otherMaybe:Maybe<A>): Maybe<B>{
        return otherMaybe.map(this.$value)
    }

    traverse<A, B extends Monad<A>, C extends Monad<Maybe<A>>> (fn: (value: Value) => B, of: (value: Maybe<A>) => C): C{
        return this.isNothing() ? of(this as Maybe<null>) : fn(this.$value).map(Maybe.of) as C
    }


    private identity<A>(x:A):A{
        return x
    }

    sequence<A, B extends Monad<Maybe<A>>>(this: Maybe<Monad<A>>, of: (value: Maybe<A>) => B ):B{
        return this.traverse(this.identity, of)
    }

    unsafeUnwrap():Value{
        return this.$value
    }

    orElseGet<A>(fn:() => A): A | Value{
        return this.isSomething() ? this.$value : fn()
    }

    orElse<A>(defaultValue:A): A | Value{
        return this.isSomething() ? this.$value : defaultValue
    }

    static liftA2<A,B,C>(fn:(arg1:A) => (arg2:B) => C, maybe1:Maybe<A>, maybe2:Maybe<B>):Maybe<C>{
        return maybe1.map(fn).ap(maybe2)
    }
    static liftA3<A,B,C,D>(fn:(arg1:A) => (arg2:B) => (arg3:C) => D, maybe1:Maybe<A>, maybe2:Maybe<B>, maybe3: Maybe<C>):Maybe<D>{
        return maybe1.map(fn).ap(maybe2).ap(maybe3)
    }
    static curryA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D): (arg1:A) => (arg2:B) => (arg3:C) => D{
        return (arg1:A) => (arg2:B) => (arg3:C) => fn(arg1, arg2, arg3)
    }
    static curryLiftA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D, maybe1:Maybe<A>, maybe2:Maybe<B>, maybe3: Maybe<C>):Maybe<D>{
        return Maybe.liftA3(Maybe.curryA3(fn), maybe1, maybe2, maybe3)
    }
}

export namespace MaybeUtility{
    export function isSomething<A>(maybe:Maybe<A>):boolean{
        return maybe.isSomething()
    }
    
    export function unsafeUnwrap<A>(maybe:Maybe<A>):A{
        return maybe.unsafeUnwrap()
    }
    
    export function maybe<A,B>(valueIfMaybeIsNothing:B, fnToApply:(value:A) => B,  maybeValue:Maybe<A>):B{
        return maybeValue.map(fnToApply).orElse(valueIfMaybeIsNothing)
    }
    
    export function orElseGet<A,B>(...fns: Array<(arg?:A) => Maybe<B>>): (arg?:A) => Maybe<B>{
        return (arg?:A) => fns.reduce((result:Maybe<B>, fn:(arg:A) => Maybe<B>) => result.isSomething() ? result : fn(arg), Maybe.of(null))
    }

    export function maybeLiftA2<A,B,C>(fn:(arg1:A) => (arg2:B) => C, arg1:A, arg2:B):Maybe<C>{
        return Maybe.liftA2(fn, Maybe.of(arg1), Maybe.of(arg2))
    }
    export function maybeLiftA3<A,B,C,D>(fn:(arg1:A) => (arg2:B) => (arg3:C) => D, arg1:A, arg2:B, arg3:C):Maybe<D>{
        return liftA3(fn, Maybe.of(arg1), Maybe.of(arg2), Maybe.of(arg3))
    }


    export function maybeLiftA1<A,B>(fn:(arg1:A) => B, arg1:A):Maybe<B>{
        return Maybe.of(arg1).map(fn)
    }

    export function curryLiftA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D, maybe1:Maybe<A>, maybe2:Maybe<B>, maybe3:Maybe<C>):Maybe<D>{
        return liftA3(curryA3(fn), maybe1, maybe2, maybe3)
    }

    export function maybeCurryLiftA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D, arg1:A, arg2:B, arg3:C):Maybe<D>{
        return liftA3(curryA3(fn), Maybe.of(arg1), Maybe.of(arg2), Maybe.of(arg3))
    }

    function curryA3<A,B,C,D>(fn:(arg1:A, arg2:B, arg3:C) => D): (arg1:A) => (arg2:B) => (arg3:C) => D{
        return (arg1:A) => (arg2:B) => (arg3:C) => fn(arg1, arg2, arg3)
    }

    function liftA3<A,B,C,D>(fn:(arg1:A) => (arg2:B) => (arg3:C) => D, maybe1:Maybe<A>, maybe2:Maybe<B>, maybe3:Maybe<C>):Maybe<D>{
        return maybe1.map(fn).ap(maybe2).ap(maybe3)
    }


}