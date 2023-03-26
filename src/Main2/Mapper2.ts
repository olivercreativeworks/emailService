// import { DocsBodyContentModel, DocsDocumentModel } from "../Models/DocsDocumentModel";
// import { isSomething, Maybe } from "../Monads/Maybe";
// import { List, toList } from "../Monads/List";
// import { DocsParagraphElementModel } from "../Models/DocsDocumentModel";

// export function myTime2(docsDocument:DocsDocumentModel = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel){
//     const imageProps = docsDocument?.inlineObjects
//     const bodyContent = Maybe.of(docsDocument?.body?.content)
//     const paragraphs = bodyContent.flatMap(contentList => contentList.reduce(toList, List.fromArr(Array<DocsBodyContentModel>()))
//         .compactMap(content => Maybe.of(content?.paragraph), isSomething)
//         .sequence(Maybe.of)
//     )
//     const paragraphsAsElements = paragraphs.flatMap(paragraphsList => paragraphsList.compactMap(
//         paragraph => Maybe.of(paragraph?.elements).map(elementsList => elementsList.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>()))), isSomething)
//         .sequence(Maybe.of))

//     const html = paragraphsAsElements.map(paragraphs => paragraphs.map(listOfElements => listOfElements.map(element => {
//         return Maybe.of(element?.inlineObjectElement).map(inlineObj => {
//             const embeddedObj = imageProps[inlineObj?.inlineObjectId]?.inlineObjectProperties?.embeddedObject
//             const sourceUrl = embeddedObj?.imageProperties?.contentUri
//             const size = embeddedObj?.size
//             const link = inlineObj?.textStyle?.link?.url
//             const imageHtml =  `<img src="${sourceUrl}", height="${size.height.magnitude * (4/3)}", width="${size.width.magnitude * (4/3)}"></img>`
//             return Maybe.of(link).map(link => `<a href="${link}">${imageHtml}</a>` ).orElse(imageHtml)
//         }).orElseGet(() => {
//             const text = element?.textRun?.content
//             const link = element?.textRun?.textStyle?.link?.url
//             const trHtml = Maybe.of(link).flatMap( link => Maybe.of(text).map(text =>`<p>${text}</p>`).map(html => `<a href="${link}">${html}</a>`))
//             return trHtml.orElse(text)
//         })
//             }
//         )
//         .reduce((s1:string, s2:string) => s1.concat(s2))
//     )
//         .map(text => `<p>${text}</p>`)
//         .reduce((s1:string, s2:string) => s1.concat(s2))
//     )
//     Logger.log(paragraphsAsElements)
//     Logger.log(html)
//     html.map(text => Logger.log(text)).orElseGet(() => Logger.log("THERE WAS AN ERROR"))
// }