export class Compose<InputType, ReturnType>{
    private $value:(value:InputType) => ReturnType

    static of<A,B>(x:(value:A) => B):Compose<A,B>{
        return new Compose(x)
    }

    private constructor(x:(value:InputType) => ReturnType){
        this.$value = x
    }

    compose<C>(fn:(value:C) => InputType):Compose<C, ReturnType>{
        return Compose.of( (x:C) => this.$value(fn(x)) )
    }

    evaluate(initialValue:InputType): ReturnType{
        return this.$value(initialValue)
    }
}