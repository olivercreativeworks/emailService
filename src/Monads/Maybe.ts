import { MonadDefinitions } from "./Interfaces"

interface Monad<Value> extends MonadDefinitions.Monad<Value>{
}

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
}