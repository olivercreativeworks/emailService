import { Maybe } from "./Monads/Maybe"
import { List } from "./Monads/List"
import { MonadDefinitions } from "./Monads/Interfaces"
type Monad<A> = MonadDefinitions.Monad<A>
const myMaybe = Maybe.of(3)
const myMonadConstructor = Object.getPrototypeOf(myMaybe).constructor
// console.log(new myMonadConstructor("Haha!"))
const of = Object.getPrototypeOf(myMaybe).constructor
console.log( new of("Boo hoo"))
// const myMaybeList= Maybe.of(List.of(3))

// function sequence<A>(someMaybeWithAMonadInside:Maybe<Monad<A>>){
//     return someMaybeWithAMonadInside.isNothing() ?
//         const tempOf = Object.getPrototypeOf(someMaybeWithAMonadInside.$value) 
// }

// function transform(itemToTransform)

// console.log(Object.keys(Object.getPrototypeOf(myMaybe)))

// function Animal (name, energy) {
//     this.name = name
//     this.energy = energy
//   }
  
//   Animal.prototype.eat = function (amount) {
//     console.log(`${this.name} is eating.`)
//     this.energy += amount
//   }
  
//   Animal.prototype.sleep = function (length) {
//     console.log(`${this.name} is sleeping.`)
//     this.energy += length
//   }
  
//   Animal.prototype.play = function (length) {
//     console.log(`${this.name} is playing.`)
//     this.energy -= length
//   }

class Animal {
    name:string
    energy:number
    constructor(name, energy) {
      this.name = name
      this.energy = energy
    }
    eat(amount) {
      console.log(`${this.name} is eating.`)
      this.energy += amount
    }
    sleep(length) {
      console.log(`${this.name} is sleeping.`)
      this.energy += length
    }
    play(length) {
      console.log(`${this.name} is playing.`)
      this.energy -= length
    }
    static nextToEat(animals) {
      const sortedByLeastEnergy = animals.sort((a,b) => {
        return a.energy - b.energy
      })
  
      return sortedByLeastEnergy[0].name
    }
  }

  const leo = new Animal('Leo', 7)
  const prototype = Object.getPrototypeOf(leo)
  
  console.log(prototype)
  // {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}
  leo.play(3)
  
  prototype === Animal.prototype // true
  const hamtaro = prototype.constructor
  console.log(hamtaro)
  const u = new hamtaro("u", 100)
  u.play(4)

  for(let key in leo) {
    if (leo.hasOwnProperty(key)) {
      console.log(`Key: ${key}. Value: ${leo[key]}`)
    }
  }
  Object.create({},)
  //https://www.freecodecamp.org/news/a-beginners-guide-to-javascripts-prototype/



  class Foo {
    myMethod(a: string):string;
    myMethod(a: number):number;
    myMethod(a: number, b: string):number;
    myMethod(a: string | number, b?: string) {
      return a  
      // console.log(a.toString());
    }
}
const myfoo = new Foo()
myfoo.myMethod(6)
