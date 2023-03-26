// see: https://stackoverflow.com/questions/56933109/pick-one-key-value-pair-from-type
// type Example = {
//     key1: number,
//     key2: string
//  }



//  type PickOne<T> = { [P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>> }[keyof T]
//  // {key1: {key1:number} & {key2?:undefined}}[keyof T]
//  // {key1:number}&{key2?:undefined}
//  type Example2 = PickOne<Example>;

//  const a: Example2 = { key3: 'a' } // incorrect
//  const b: Example2 = { key1: 'a' } // incorrect
//  const c: Example2 = { key2: 1 } // incorrect
//  const d: Example2 = { key1: 1 } // correct
//  const e: Example2 = { key2: 'a' } // correct
//  const f: Example2 = {  key2: 'a'} || {key1:3} // incorrect


// const HtmlTags = {
//     p:"p",
//     a:"a",
//     img:"img",
// } as const

// type Valid_Html = {
//     [P in keyof typeof HtmlTags]: Html<P>
// }

// type sValid_Html<t extends keyof Valid_Html> = Valid_Html[t]

// const bunny:sValid_Html<"a"|"img"> = `<${"img"}></${"img"}>`
// type Html<TagName extends HtmlTagNames> = `<${TagName}${string}>${string}</${TagName}>`


// type shtml = PickOne<typeof HtmlTags>
// type sshtml<tag extends keyof shtml> = `<${tag}${string}>${string}</${tag}>`
// const squirrel: sshtml<"a"|"img"> = `<${"a"}></${"img"}>`


// type HtmlTagNames = typeof HtmlTags[keyof typeof HtmlTags]
// // type Html<TagName extends HtmlTagNames> = `<${TagName}${string}>${string}</${TagName}>`

// type p = Exclude<HtmlTagNames, "a"|"img">
// type everythingButP = Exclude<HtmlTagNames, Exclude<HtmlTagNames, "a"|"img">>
// type everythingButP2<t> = Exclude<HtmlTagNames, t>
// type p2<t> = Exclude<HtmlTagNames, Exclude<HtmlTagNames, t>>
// type Html2<TagName extends Exclude<HtmlTagNames, Exclude<HtmlTagNames, TagName>>> = `<${p2<TagName>}${string}>${string}</${p2<TagName>}>`

// const rabbit:Html2<"p"> = 
// const turtle: p2<"p"|"a"> = "p"
// const duck: everythingButP2<"p"> = "a"
// const elemphant: everythingButP = "a" 
// const dog:p = "p"
// const cat:Html<"p"|"a"> = "<p></a>"




// type mathFn = (num:number)=> number

// function addOne(x:number):number{
//     return x+1
// }
// function needsMathFn(mf:mathFn):number{
//     return mf(1)
// }

// needsMathFn(addOne)