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

    evaluate(initialValue:Initial): ReturnType{
        return this.$value(initialValue)
    }
}

