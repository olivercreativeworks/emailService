// import { isSomething } from "../Monads/Maybe"
// import { reduceToList, toList} from "../Monads/List"
// import { DocsDocumentModel, DocsParagraphModel, DocsParagraphElementModel, DocsBodyContentModel, DocsTextRunModel } from "../Models/DocsDocumentModel"
// import { Maybe } from "../Monads/Maybe"
// import { List } from "../Monads/List"
// import { DocsEmbeddedObjectModel, DocsImagePropertiesModel, DocsInlineObjectPropertiesModel, DocsInlineObjectSizeModel } from "../Models/DocsInlineObjectModel"
// // import { DocsDocumentModel, DocsParagraphModel, DocsParagraphElementModel, DocsBodyContentModel } 
// // import { Document, IDocument } from "./DocumentModel"

// // DOCS API
// // p = DocsDocument.bodycontent.paragraphs.value = Maybe<List<Paragraph>>
// // p.map( paragraph => paragraph.elements ) // Maybe<List<List<ParagraphElement>>>
// // ParagraphElement = TextRun | Image
// // If docspe has content ==> text run : image

// // mapper fn === (ele:ParagraphElement): TextRun | Image {
// //   if ele == text run ===> TextRun
// //   else if ele == image ===> Image
// //}

// // Mirror this
// // ParagraphElement {
// //    TextRuns
// //    Images
// //    // Use getters. If images 
// // }

// // Then on Document Api side, have a document emailparagraphElement with ashtml property, accepting relevant mappers and docs para element
// // returns maybe html, map over text and image

// // DOCUMENT API
// // static of(htmlCreator:IHtmlCreator, sourceUrl:string, dimensions:IPixelDimensions, link?:string):Image{
// //     return new Image(htmlCreator, sourceUrl, dimensions, link)
// // }
// // static of(htmlCreator:IHtmlCreator, text:string, link?:string):TextRun{
// //     return new TextRun(htmlCreator, text, link)
// // }

// interface IDocsTextRun{
//     text:Maybe<string>
//     link:Maybe<string>
// }
// // interface IDocsImage2{
// //     properties: IDocsImageProperties
// // }

// interface IDocsImage{
//     sourceUrl: Maybe<string>
//     link: Maybe<string>
//     size: Maybe<DocsInlineObjectSizeModel>
// }

// type TextRunMapperFn= (textRunModel: DocsTextRunModel) => IDocsTextRun
// type ImageMapperFn = (inlineObj:DocsInlineObjectElementModel) => IDocsImage
// type DocsImageMapperFn = (inlineObjectsModel: DocsInlineObjectsModel) => ImageMapperFn
// type ParagraphMapperFn = (bodyContent: DocsBodyContentModel) => IDocsParagraph


// // type ImageMapperFn = (inlineObj:DocsInlineObjectElementModel, propsObj: DocsInlineObjectsModel) => IDocsImage

// class DocsParagraphElement implements IDocsParagraphElement{
//     // textRun: Maybe<IDocsTextRun>
//     // image: Maybe<IDocsImage>
//     paragraphElement: DocsParagraphElementModel
//     textRunMapperFn: TextRunMapperFn 
//     imageMapperFn: ImageMapperFn
//     // textRun: DocsTextRunModel
//     // image: DocsImagePropertiesModel
//     get textRun(): Maybe<IDocsTextRun>{
//         return Maybe.of(this.paragraphElement?.textRun).map(this.textRunMapperFn)
//     }
//     get image():Maybe<IDocsImage>{
//         return Maybe.of(this.paragraphElement?.inlineObjectElement).map(this.imageMapperFn)
//     }
// }

// class DocsDocumentz{
//     paragraphs:List<IDocsParagraphElement>
//     paragraphMapperFn: ParagraphMapperFn
//     document:DocsDocumentModel

//     constructor(document:DocsDocumentModel, paragraphMapperFn:ParagraphMapperFn){
//         this.document = document
//         this.textRunMapperFn = textRunMapper
//         this.imageMapperFn = imageMapperFn
//         this.paragraphMapperFn = paragraphMapperFn
//     }
// }

// type paraEleMapper = (paraEle: DocsParagraphElementModel) => DocsParagraphElementz<ParagraphElementTypesz>

// class DocsParagraphz{
//     // textRunMapperFn: TextRunMapperFn 
//     // imageMapperFn: DocsImageMapperFn
//     mapper: paraEleMapper
//     bodyContent: DocsBodyContentModel

//     constructor(bodyContent:DocsBodyContentModel, mapper:paraEleMapper){
//         this.mapper = mapper
//         this.bodyContent = bodyContent
//     }

//     get elements(): Maybe<List<validDocsParagraphElementsz>>{
//        return Maybe.of(this.bodyContent?.paragraph?.elements).map(reduceToList).map(list => list.map(this.mapper))
//     }
// }

// type ParagraphElementTypesz = "image" | "textRun"
// type validDocsParagraphElementsz = DocsParagraphElementz<ParagraphElementTypesz>
// interface DocsParagraphElementz<Type extends ParagraphElementTypesz>{
//     type: Type
// }
// interface Imagez = DocsParagraphElementz<"image">

// class Imagez implements DocsParagraphElementz<"image">{
//     type: "image"
//     imageModel: DocsInlineObjectElementModel
//     imagePropsObj: DocsInlineObjectsModel

//     constructor( imageModel: DocsInlineObjectElementModel, imagePropsObj:DocsInlineObjectsModel){
//         this.imageModel = imageModel
//         this.imagePropsObj = imagePropsObj
//     }

//     get sourceUrl():Maybe<string>{
//         return Maybe.of((embeddedObj:DocsEmbeddedObjectModel) => embeddedObj?.imageProperties?.contentUri).ap(this.embeddedObj)
//     }
    
//     get size():Maybe<DocsInlineObjectSizeModel>{
//         return Maybe.of((embeddedObj:DocsEmbeddedObjectModel) => embeddedObj?.size).ap(this.embeddedObj)
//     }
    
//     get link():Maybe<string>{
//         return Maybe.of(this.imageModel?.textStyle?.link?.url)
//     }
    
//     private get id():Maybe<string>{
//         return Maybe.of(this.imageModel?.inlineObjectId)
//     }

//     private get embeddedObj():Maybe<DocsEmbeddedObjectModel>{
//         return Maybe.of(id => this.imagePropsObj[id]?.inlineObjectProperties?.embeddedObject).ap(this.id)
//     }
    
// }

// class TextRunz implements DocsParagraphElementz<"textRun">{
//     type: "textRun"
//     textRun: DocsTextRunModel

//     static of(textRun: DocsTextRunModel):TextRunz{
//         return new TextRunz(textRun)
//     }
//     constructor(textRun: DocsTextRunModel){
//         this.textRun = textRun
//     }

//     get text(): Maybe<string>{
//         return Maybe.of(this.textRun?.content)
//     }
//     get link(): Maybe<string>{
//         return Maybe.of(this.textRun?.textStyle?.link?.url)
//     }
// }


// // class DocsImage implements IDocsImage{
// //     properties: IDocsImageProperties
// // }

// import { DocsInlineObjectElementModel } from "../Models/DocsDocumentModel"
// import { DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel"
// import { IParagraph } from "../Models/DocumentModel"

// class DocsImageProperties implements IDocsImage{
//     id: string
//     link: Maybe<string>
//     propsObj: DocsInlineObjectsModel

//     constructor(inlineObj:DocsInlineObjectElementModel, propsObj: DocsInlineObjectsModel){
//         this.id = inlineObj.inlineObjectId
//         this.link = Maybe.of(inlineObj?.textStyle?.link?.url)
//         this.propsObj = propsObj
//     }

//     get sourceUrl():string{
//         return this.embeddedObject.map(obj => obj.imageProperties.contentUri).orElse("")
//     }
//     get size():DocsInlineObjectSizeModel{
//         return this.embeddedObject.map(obj => obj.size).unsafeUnwrap()
//     }
//     private get embeddedObject():Maybe<DocsEmbeddedObjectModel>{
//         return Maybe.of(this.propsObj[this.id]?.inlineObjectProperties?.embeddedObject)
//     }
// }

// class DocsTextRun implements IDocsTextRun{
//     text: Maybe<string>
//     link: Maybe<string>

//     static of(textRun:DocsTextRunModel):DocsTextRun{
//         return new DocsTextRun(textRun)
//     }

//     constructor(textRun:DocsTextRunModel){
//         this.text = Maybe.of(textRun.content)
//         this.link = Maybe.of(textRun?.textStyle?.link?.url)
//     }
// }

// interface IDocsParagraphElement{
//     textRun: Maybe<IDocsTextRun>
//     image: Maybe<IDocsImage>
// }

// class EmailParagraphElementMapper{

//     static from(docsParagraphElement:DocsParagraphElementModel, mapperFn:(x:IEmailHtmlElement) => EmailParagraphElement): EmailParagraphElement{
        
//         return mapperFn(docsParagraphElement)
//     }
// }

// class EmailParagraphElement implements IEmailHtmlElement{
//     htmlCreator: IHtmlCreator
//     value: IEmailHtmlElement

//     constructor(emailHtmlElement:IEmailHtmlElement){
//         this.value = emailHtmlElement
//     }

//     get asHtml():sValid_Html<HtmlTagNames>{
//         return this.value.asHtml
//     }

// }


// interface IDocsDocument{
//     document:DocsDocumentModel
//     bodyContent: IDocsBodyContent

//     docsParagraphCreatorFn: docsParagraphCreatorFn
// }

// interface IDocsBodyContent{
//     paragraphs: List<IDocsParagraph>
//     value:Maybe<List<DocsParagraph>>
// }

// interface IDocsParagraph{
//     elements: List<IDocsParagraphElement>
// }

// interface IDocsParagraphElement2{
//     textRun?:DocsTextRunModel
//     inlineObjectElement?:DocsInlineObjectElementModel
//     function docsElementsToParagraphElements(inlineObjects?:DocsInlineObjectsModel): typeof $docsElementsToParagraphElements{
//         return $docsElementsToParagraphElements
        
//         function $docsElementsToParagraphElements(element: DocsParagraphElementModel):ParagraphElement{
//             const textRun = Maybe.of(element.textRun).map(docsTextRunToTextRun).unsafeUnwrap()

//             const inlineImage = Maybe.of(inlineObjects)
//                .flatMap(inlineObj => InlineImageOptionsMapper.fromDocs(inlineObj, element.inlineObjectElement)) 
//                .map(options => InlineImage.of(options.imageSourceUrl, options))
//                .unsafeUnwrap()
//             Logger.log(inlineImage)
//             return ParagraphElement.of(textRun, inlineImage)
//         }
//     }

//     function docsTextRunToTextRun(docsTextRun: DocsTextRunModel):TextRun{
//         const text = docsTextRun?.content
//         const url = docsTextRun?.textStyle?.link?.url
//         return TextRun.of(text, url)
//     }
// }

// interface IDocsElement<subunit>{
//     value: Maybe<subunit>
// }

// type DocumentFromSubunitsListFn = (list: List<List<A>>) => IEmailDocument


// class DocsParagraph implements IDocsParagraph{
//     elements: List<DocsParagraphElementModel>

//     static of(elements: List<DocsParagraphElementModel>):DocsParagraph{
//         return new DocsParagraph(elements)
//     }
//     static from(docsParagraphModel:DocsParagraphModel):Maybe<DocsParagraph>{
//         return Maybe.of(docsParagraphModel?.elements).map(reduceToList).map(DocsParagraph.of)
//     }

//     constructor(elements: List<DocsParagraphElementModel>){
//         this.elements = elements
//     }
// }

// type docsParagraphCreatorFn = (docsParagraphModel:DocsParagraphModel) => IDocsParagraph





// class DocsDocument{
    
// }


// class DocsDocument2 implements IDocsDocment{
//     docsParagraphCreatorFn: docsParagraphCreatorFn
//     document: DocsDocumentModel

//     get bodyContent():Maybe<List<DocsBodyContentModel>>{
//         return Maybe.of(this.document?.body?.content).map(reduceToList)
//     }

//     get paragraphs():Maybe<List<IDocsParagraph>>{
//         return this.bodyContent.flatMap(list => list.compactMap(content => Maybe.of(content?.paragraph).map(this.docsParagraphCreatorFn), isSomething).sequence(Maybe.of))
//     }

//     get paraElem(){
//         return this.paragraphs.map(para => para.elements)
//     }

//     get paragraphElements():Maybe<List<List<DocsParagraphElementModel>>>{
//         return this.paragraphs.flatMap(getParagraphElements)

//         function getParagraphElements(paragraphs:List<DocsParagraphModel>):Maybe<List<List<DocsParagraphElementModel>>>{
//             return paragraphs.compactMap($getParagraphElements, isSomething).sequence(Maybe.of)
          
//             function $getParagraphElements(paragraph:DocsParagraphModel):Maybe<List<DocsParagraphElementModel>>{
//                 return Maybe.of(paragraph?.elements).map(reduceToList)
//             }
//         }
//     }
// }

// type DocumentFromSubunitsListFnz <A> = (list: List<List<A>>) => IDocument<A>

// export class DocsToDocumentMapper{
    
//     static of(docsDocument:DocsDocumentModel, subunitsToDocumentMapper:DocumentFromSubunitsListFnz<DocsParagraphElementModel> = Document.fromList): Maybe<Document<DocsParagraphElementModel>>{
//         return DocsToDocumentMapper.getBodyContent(docsDocument)
//             .flatMap(DocsToDocumentMapper.getParagraphs)
//             .flatMap(DocsToDocumentMapper.getParagraphElements)
//             .map(subunitsToDocumentMapper)
//     }

//     private static getParagraphElements(paragraphs:List<DocsParagraphModel>):Maybe<List<List<DocsParagraphElementModel>>>{
//         return paragraphs.compactMap($getParagraphElements, isSomething).sequence(Maybe.of)

//         function $getParagraphElements(paragraph:DocsParagraphModel):Maybe<List<DocsParagraphElementModel>>{
//             return Maybe.of(paragraph.elements).map(reduceToList)
//         }
//     }

//     private static getBodyContent(docsDocument:DocsDocumentModel):Maybe<List<DocsBodyContentModel>>{
//         return Maybe.of(docsDocument?.body?.content).map(reduceToList)
//     }
        
//     private static getParagraphs(bodyContent:List<DocsBodyContentModel>):Maybe<List<DocsParagraphModel>>{
//         return bodyContent.compactMap( content => Maybe.of(content.paragraph), isSomething ).sequence(Maybe.of)
//         }

//     static create():Document<DocsParagraphElementModel> {
//         return 
//     }
// }

