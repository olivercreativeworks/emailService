// import { EmailDocument, EmailParagraph, TextRun, Image, hHtml, HtmlCreator } from "./EmailDocument2";
// import { DocsDocumentModel, DocsParagraphModel, DocsTextRunModel, DocsInlineObjectElementModel, DocsParagraphElementModel, DocsBodyContentModel } from "../Models/DocsDocumentModel";
// import { DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel";
// import { isSomething, Maybe } from "../Monads/Maybe";
// import { List, toList } from "../Monads/List";

// export function mytime(){
//     // const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
//     const doc1 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel

//     const imageProps = doc1?.inlineObjects
//     const htmlCreator = HtmlCreator.of(hHtml.of)

//     const bodyContent = Maybe.of(doc1?.body?.content)
//     const paragraphs = bodyContent.flatMap( contentList => contentList.reduce(toList, List.fromArr(Array<DocsBodyContentModel>()))
//         .compactMap(content => Maybe.of(content?.paragraph), isSomething)
//         .sequence(Maybe.of)
//         )
//     const paragraphsAsElements = paragraphs.flatMap(paragraphsList => paragraphsList.compactMap(
//         paragraph => Maybe.of(paragraph?.elements).map(elementsList => elementsList.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>()))), isSomething
//     ).sequence(Maybe.of))
    
//     let newArr = Array<string>() 
//     const paragraphsAsHtmlElements = paragraphsAsElements.map(paragraphsList => paragraphsList.map(listOfElements => listOfElements.compactMap(element => {
//         Maybe.of(element.inlineObjectElement).map(inlineObj => {
//             const id = inlineObj.inlineObjectId
//             const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
//             const sourceUrl = embeddedObj?.imageProperties?.contentUri
//             const size = embeddedObj?.size
//             const link = element?.textRun?.textStyle?.link?.url
//             const r1 = `<img src="${sourceUrl}", height="${size.height.magnitude * (4/3)}", width="${size.width.magnitude * (4/3)}"></img>`
//             const val = Maybe.of(link).map(link => `<a href="${link}">${r1}</a>` ).orElse(r1)
//             newArr.push(val)
//         }).orElseGet(() => {
//             const tr2 = Maybe.of(element?.textRun?.content).map(text => `<p>${text}</p>`)
//             return tr2.map(tr2 => newArr.push(Maybe.of(element?.textRun?.textStyle?.link?.url).map(link => `<a href="${link}">${tr2}</a>`).orElse(tr2)))
//         })
//         Logger.log(newArr.reduce((s1,s2) => s1.concat(s2)))

//     )))}
//         // newArr.push(Maybe.of(element.inlineObjectElement).map(inlineObj =>{
//         //     const id = inlineObj.inlineObjectId
//         //     const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
//         //     const sourceUrl = embeddedObj?.imageProperties?.contentUri
//         //     const size = embeddedObj?.size
//         //     const link = element?.textRun?.textStyle?.link?.url
//         //     const r1 = `<img src="${sourceUrl}", height="${size.height.magnitude * (4/3)}", width="${size.width.magnitude * (4/3)}"></img>`
//         //     return Maybe.of(link).map(link => `<a href="${link}">${r1}</a>` ).orElse(r1)
//         // })
//         // .orElseGet(() => {
//         //     const tr2 = Maybe.of(element?.textRun?.content).map(text => `<p>${text}</p>`)
//         //     return tr2.map(tr2 => Maybe.of(element?.textRun?.textStyle?.link?.url).map(link => `<a href="${link}">${tr2}</a>`).orElse(tr2)).orElse("")
//         // })
        

//                      // return Image.of(
//             //     htmlCreator, 
//             //     sourceUrl, 
//             //     {height:size?.height?.magnitude * (4/3), width:size?.width?.magnitude * (4/3), unit:"pixel"},
//             //     link
//             // )
//         // }).orElseGet(() => TextRun.of(htmlCreator, element?.textRun?.content, element?.textRun?.textStyle?.link?.url)))

//     // const g = paragraphsAsHtmlElements.map(paras => {
//     //     let newArr = Array<string>() 
//     //     for (let p of paras.asArray()){
//     //         for (let e of p.asArray()){
//     //             Logger.log(e)
//     //             switch (e.type){
//     //                 case "image":
//     //                     Logger.log("img")
//     //                     const r1 = `<img src="${e.sourceUrl}", height="${e.dimensions.height}", width="${e.dimensions.width}"></img>`
//     //                     newArr.push( e.link.map(link => `<a href="${link}">${r1}</a>` ).orElse(r1))
//     //                 case "textRun":
//     //                     const tr = e as TextRun
//     //                     const tr2 = Maybe.of(tr.text).map(text => `<p>${text}</p>`)
//     //                     tr2.map(tr2 => newArr.push( tr.link.map(link => `<a href="${link}">${tr2}</a>`).orElse(tr2)))
//     //                     // Logger.log(e.asHtml)
//     //             }
//     //         }
//     //     }

//     //     return newArr.reduce((s1, s2) => s1.concat(s2))
//     // })

// // }
// // export function mytime(){
// //     // const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
// //     const doc1 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel

// //     const imageProps = doc1?.inlineObjects
// //     const htmlCreator = HtmlCreator.of(hHtml.of)

// //     const bodyContent = Maybe.of(doc1?.body?.content)
// //     const paragraphs = bodyContent.flatMap( contentList => contentList.reduce(toList, List.fromArr(Array<DocsBodyContentModel>()))
// //         .compactMap(content => Maybe.of(content?.paragraph), isSomething)
// //         .sequence(Maybe.of)
// //         )
// //     const paragraphsAsElements = paragraphs.flatMap(paragraphsList => paragraphsList.compactMap(
// //         paragraph => Maybe.of(paragraph?.elements).map(elementsList => elementsList.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>()))), isSomething
// //     ).sequence(Maybe.of))
    
// //     const paragraphsAsHtmlElements = paragraphsAsElements.map(paragraphsList => paragraphsList.map(listOfElements => listOfElements.compactMap(element => {
// //         return Maybe.of(element.inlineObjectElement).map(inlineObj => {
// //             const id = inlineObj.inlineObjectId
// //             const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
// //             const sourceUrl = embeddedObj?.imageProperties?.contentUri
// //             const size = embeddedObj?.size
// //             const link = element?.textRun?.textStyle?.link?.url
// //             return Image.of(
// //                 htmlCreator, 
// //                 sourceUrl, 
// //                 {height:size?.height?.magnitude * (4/3), width:size?.width?.magnitude * (4/3), unit:"pixel"},
// //                 link
// //             )
// //         }).orElseGet(() => TextRun.of(htmlCreator, element?.textRun?.content, element?.textRun?.textStyle?.link?.url))
// //     })))

// //     const g = paragraphsAsHtmlElements.map(paras => {
// //         let newArr = Array<string>() 
// //         for (let p of paras.asArray()){
// //             for (let e of p.asArray()){
// //                 Logger.log(e)
// //                 switch (e.type){
// //                     case "image":
// //                         Logger.log("img")
// //                         const r1 = `<img src="${e.sourceUrl}", height="${e.dimensions.height}", width="${e.dimensions.width}"></img>`
// //                         newArr.push( e.link.map(link => `<a href="${link}">${r1}</a>` ).orElse(r1))
// //                     case "textRun":
// //                         const tr = e as TextRun
// //                         const tr2 = Maybe.of(tr.text).map(text => `<p>${text}</p>`)
// //                         tr2.map(tr2 => newArr.push( tr.link.map(link => `<a href="${link}">${tr2}</a>`).orElse(tr2)))
// //                         // Logger.log(e.asHtml)
// //                 }
// //             }
// //         }

// //         return newArr.reduce((s1, s2) => s1.concat(s2))
// //     })

// //     Logger.log(g)
// // }
//     // get asHtml(): sValid_Html<"p"|"a"> {
//     //     return this.asLinkedHtml.orElse(this.textAsHtml)
//     // }

//     // private get asLinkedHtml(): Maybe<sValid_Html<"a">>{
//     //     return this.link.map(url => this.htmlCreator.createNewLinkTag(url, this.asHtml))
//     // }

//     // private get textAsHtml():sValid_Html<"p">{
//     //     return this.htmlCreator.createNewTag("p").updateText(this.text).html
//     // }     


//     // paragraphsAsHtmlElements.map(x => x.map(y => y.map(Logger.log)))
//     // const emailParagraphs = paragraphsAsHtmlElements.map(paras => paras.map(htmlElements => EmailParagraph.of(htmlElements, htmlCreator)))
//     // emailParagraphs.map(paraList => paraList.map())
//     // const emailDocument = emailParagraphs.map(paras => EmailDocument.of(paras, htmlCreator))
//     // emailDocument.map(doc => Logger.log(doc.asHtml))

//     // const paragraphs = doc1?.body?.content?.map(content => content?.paragraph)?.reduce(toList, List.fromArr(Array<DocsParagraphModel>()))
//     // const paragraphsAsElements = paragraphs?.map(paragraph => paragraph?.elements?.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>())))
//     // const paragraphsAsHtmlElements = paragraphsAsElements?.map(listOfElements => listOfElements?.map(element => {
//     //     if (element?.inlineObjectElement){
//     //         const id = element.inlineObjectElement?.inlineObjectId
//     //         const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
//     //         const sourceUrl = embeddedObj?.imageProperties?.contentUri
//     //         const size = embeddedObj?.size
//     //         const link = element?.textRun?.textStyle?.link?.url
//     //         return Image.of(
//     //             htmlCreator, 
//     //             sourceUrl, 
//     //             {height:size?.height?.magnitude * (4/3), width:size?.width?.magnitude * (4/3), unit:"pixel"},
//     //             link
//     //         )
//     //     }
//     //     return TextRun.of(htmlCreator, element?.textRun?.content, element?.textRun?.textStyle?.link?.url)
//     // })) 
//     // const emailParagraphs = paragraphsAsHtmlElements.map(para => EmailParagraph.of(para, htmlCreator))
//     // const emailDocument = EmailDocument.of(emailParagraphs, htmlCreator)
//     // Logger.log(emailDocument.asHtml)
// // }
// // export function mytime(){
// //     const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
// //     const imageProps = doc1?.inlineObjects
// //     const htmlCreator = HtmlCreator.of(hHtml.of)

// //     const paragraphs = doc1?.body?.content?.map(content => content?.paragraph)?.reduce(toList, List.fromArr(Array<DocsParagraphModel>()))
// //     const paragraphsAsElements = paragraphs?.map(paragraph => paragraph?.elements?.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>())))
// //     const paragraphsAsHtmlElements = paragraphsAsElements?.map(listOfElements => listOfElements?.map(element => {
// //         if (element?.inlineObjectElement){
// //             const id = element.inlineObjectElement?.inlineObjectId
// //             const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
// //             const sourceUrl = embeddedObj?.imageProperties?.contentUri
// //             const size = embeddedObj?.size
// //             const link = element?.textRun?.textStyle?.link?.url
// //             return Image.of(
// //                 htmlCreator, 
// //                 sourceUrl, 
// //                 {height:size?.height?.magnitude * (4/3), width:size?.width?.magnitude * (4/3), unit:"pixel"},
// //                 link
// //             )
// //         }
// //         return TextRun.of(htmlCreator, element?.textRun?.content, element?.textRun?.textStyle?.link?.url)
// //     })) 
// //     const emailParagraphs = paragraphsAsHtmlElements.map(para => EmailParagraph.of(para, htmlCreator))
// //     const emailDocument = EmailDocument.of(emailParagraphs, htmlCreator)
// //     Logger.log(emailDocument.asHtml)
// // }

// // import { EmailDocument, EmailParagraph, TextRun, Image, hHtml, HtmlCreator } from "./EmailDocument2";
// // import { DocsDocumentModel, DocsParagraphModel, DocsTextRunModel, DocsInlineObjectElementModel, DocsParagraphElementModel, DocsBodyContentModel } from "../Models/DocsDocumentModel";
// // import { DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel";
// // import { isSomething, Maybe } from "../Monads/Maybe";
// // import { List, toList } from "../Monads/List";

// // function 
// // export function mytime(){
// //     // const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
// //     const doc1 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel

// //     const imageProps = doc1?.inlineObjects
// //     const htmlCreator = HtmlCreator.of(hHtml.of)

// //     const bodyContent = Maybe.of(doc1?.body?.content)
// //     const paragraphs = bodyContent.flatMap( contentList => contentList.reduce(toList, List.fromArr(Array<DocsBodyContentModel>()))
// //         .compactMap(content => Maybe.of(content?.paragraph), isSomething)
// //         .sequence(Maybe.of)
// //         )
// //     const paragraphsAsElements = paragraphs.flatMap(paragraphsList => paragraphsList.compactMap(
// //         paragraph => Maybe.of(paragraph?.elements).map(elementsList => elementsList.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>()))), isSomething
// //     ).sequence(Maybe.of))
    
// //     const paragraphsAsHtmlElements = paragraphsAsElements.map(paragraphsList => paragraphsList.map(listOfElements => listOfElements.compactMap(element => {
// //         return Maybe.of(element.inlineObjectElement).map(inlineObj => {
// //             const id = inlineObj.inlineObjectId
// //             const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
// //             const sourceUrl = embeddedObj?.imageProperties?.contentUri
// //             const size = embeddedObj?.size
// //             const link = element?.textRun?.textStyle?.link?.url
// //             return Image.of(
// //                 htmlCreator, 
// //                 sourceUrl, 
// //                 {height:size?.height?.magnitude * (4/3), width:size?.width?.magnitude * (4/3), unit:"pixel"},
// //                 link
// //             )
// //         }).orElseGet(() => TextRun.of(htmlCreator, element?.textRun?.content, element?.textRun?.textStyle?.link?.url))
// //     })))

// //     const g = paragraphsAsHtmlElements.map(paras => {
// //         let newArr = Array<string>() 
// //         for (let p of paras.asArray()){
// //             for (let e of p.asArray()){
// //                 Logger.log(e)
// //                 switch (e.type){
// //                     case "image":
// //                         Logger.log("img")
// //                         const r1 = `<img src="${e.sourceUrl}", height="${e.dimensions.height}", width="${e.dimensions.width}"></img>`
// //                         newArr.push( e.link.map(link => `<a href="${link}">${r1}</a>` ).orElse(r1))
// //                     case "textRun":
// //                         const tr = e as TextRun
// //                         const tr2 = Maybe.of(tr.text).map(text => `<p>${text}</p>`)
// //                         tr2.map(tr2 => newArr.push( tr.link.map(link => `<a href="${link}">${tr2}</a>`).orElse(tr2)))
// //                         // Logger.log(e.asHtml)
// //                 }
// //             }
// //         }

// //         return newArr.reduce((s1, s2) => s1.concat(s2))
// //     })

// //     Logger.log(g)
// // }
// //     // get asHtml(): sValid_Html<"p"|"a"> {
// //     //     return this.asLinkedHtml.orElse(this.textAsHtml)
// //     // }

// //     // private get asLinkedHtml(): Maybe<sValid_Html<"a">>{
// //     //     return this.link.map(url => this.htmlCreator.createNewLinkTag(url, this.asHtml))
// //     // }

// //     // private get textAsHtml():sValid_Html<"p">{
// //     //     return this.htmlCreator.createNewTag("p").updateText(this.text).html
// //     // }     


// //     // paragraphsAsHtmlElements.map(x => x.map(y => y.map(Logger.log)))
// //     // const emailParagraphs = paragraphsAsHtmlElements.map(paras => paras.map(htmlElements => EmailParagraph.of(htmlElements, htmlCreator)))
// //     // emailParagraphs.map(paraList => paraList.map())
// //     // const emailDocument = emailParagraphs.map(paras => EmailDocument.of(paras, htmlCreator))
// //     // emailDocument.map(doc => Logger.log(doc.asHtml))

// //     // const paragraphs = doc1?.body?.content?.map(content => content?.paragraph)?.reduce(toList, List.fromArr(Array<DocsParagraphModel>()))
// //     // const paragraphsAsElements = paragraphs?.map(paragraph => paragraph?.elements?.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>())))
// //     // const paragraphsAsHtmlElements = paragraphsAsElements?.map(listOfElements => listOfElements?.map(element => {
// //     //     if (element?.inlineObjectElement){
// //     //         const id = element.inlineObjectElement?.inlineObjectId
// //     //         const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
// //     //         const sourceUrl = embeddedObj?.imageProperties?.contentUri
// //     //         const size = embeddedObj?.size
// //     //         const link = element?.textRun?.textStyle?.link?.url
// //     //         return Image.of(
// //     //             htmlCreator, 
// //     //             sourceUrl, 
// //     //             {height:size?.height?.magnitude * (4/3), width:size?.width?.magnitude * (4/3), unit:"pixel"},
// //     //             link
// //     //         )
// //     //     }
// //     //     return TextRun.of(htmlCreator, element?.textRun?.content, element?.textRun?.textStyle?.link?.url)
// //     // })) 
// //     // const emailParagraphs = paragraphsAsHtmlElements.map(para => EmailParagraph.of(para, htmlCreator))
// //     // const emailDocument = EmailDocument.of(emailParagraphs, htmlCreator)
// //     // Logger.log(emailDocument.asHtml)
// // // }
// // // export function mytime(){
// // //     const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
// // //     const imageProps = doc1?.inlineObjects
// // //     const htmlCreator = HtmlCreator.of(hHtml.of)

// // //     const paragraphs = doc1?.body?.content?.map(content => content?.paragraph)?.reduce(toList, List.fromArr(Array<DocsParagraphModel>()))
// // //     const paragraphsAsElements = paragraphs?.map(paragraph => paragraph?.elements?.reduce(toList, List.fromArr(Array<DocsParagraphElementModel>())))
// // //     const paragraphsAsHtmlElements = paragraphsAsElements?.map(listOfElements => listOfElements?.map(element => {
// // //         if (element?.inlineObjectElement){
// // //             const id = element.inlineObjectElement?.inlineObjectId
// // //             const embeddedObj = imageProps[id]?.inlineObjectProperties?.embeddedObject
// // //             const sourceUrl = embeddedObj?.imageProperties?.contentUri
// // //             const size = embeddedObj?.size
// // //             const link = element?.textRun?.textStyle?.link?.url
// // //             return Image.of(
// // //                 htmlCreator, 
// // //                 sourceUrl, 
// // //                 {height:size?.height?.magnitude * (4/3), width:size?.width?.magnitude * (4/3), unit:"pixel"},
// // //                 link
// // //             )
// // //         }
// // //         return TextRun.of(htmlCreator, element?.textRun?.content, element?.textRun?.textStyle?.link?.url)
// // //     })) 
// // //     const emailParagraphs = paragraphsAsHtmlElements.map(para => EmailParagraph.of(para, htmlCreator))
// // //     const emailDocument = EmailDocument.of(emailParagraphs, htmlCreator)
// // //     Logger.log(emailDocument.asHtml)
// // // }