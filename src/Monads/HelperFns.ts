import { MonadDefinitions } from "./Interfaces"
import { Maybe } from "./Maybe"
import { List } from "./List"

type Monad<Value> = MonadDefinitions.Monad<Value>

export class Helper{
    static map<A,B>(fn:(value:A) => B):typeof $map{
        return $map
        function $map(listMonad:List<A>):List<B>
        function $map(maybeMonad:Maybe<A>):Maybe<B>
        function $map<C>(monad:{map: (fn:(value:A)=>B)=>C}): C{
            return monad.map(fn)
        }
    }
    
    static flatMap<A,B>(fn:(value:A) => Monad<B>):typeof $flatMap{
        return $flatMap
        
        function $flatMap(listMonad:List<A>):List<B>
        function $flatMap(maybeMonad:Maybe<A>):Maybe<B>
        function $flatMap(monad:Monad<A>): Monad<B>{
            return monad.flatMap(fn)
        }
    }
    }