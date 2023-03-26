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

// function letsgooo(){
//     const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
//     const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel

//     const intermediatedoc = new Document(doc1, (docsPara:DocsParagraphModel) =>  )
// }


// type IntermediateParagraphElementTypes = keyof typeof validParagraphElementTypes

// type $ParagraphElementSubtypes = IntermediateTextRun | IntermediateImage
// const validParagraphElementTypes = {
//     textRun:"textRun",
//     image:"image",
// } as const
// type IntermediateParagraphElement = Typed<IntermediateParagraphElementTypes> & $ParagraphElementSubtypes

// interface Typed<Type extends IntermediateParagraphElementTypes>{
//     type:Type
// }

// interface IntermediateDocument{
//     document:DocsDocumentModel
//     paragraphs:List<IntermediateParagraph>
// }

// type IntermediateParagraphCreatorFn = (docsParagraph: DocsParagraphModel) => IntermediateParagraph
// class Document implements IntermediateDocument{
//     document: DocsDocumentModel
//     mapper: IntermediateParagraphCreatorFn

//     constructor(document: DocsDocumentModel, mapper:IntermediateParagraphCreatorFn ){
//         this.document = document
//         this.mapper = mapper
//     }

//     get paragraphs():List<IntermediateParagraph>{
//         return this.document.body.content.map(content => this.mapper(content.paragraph)).reduce(toList, List.fromArr(Array<IntermediateParagraph>()))
//     }
// }

// interface IntermediateParagraph{
//     elements: List<IntermediateParagraphElement>
// }

// class Paragraph implements IntermediateParagraph{
//     elements: List<IntermediateParagraphElement>
    
//     static fromDocsParagraphModel(docsPara: DocsParagraphModel, intermediateElementMapper :docsParagraphCreatorFn ): Paragraph{
//         return docsPara?.elements?.reduce(toList, List.fromArr(Array<DocsParagraphModel>()))
//     }

//     constructor(elements:List<IntermediateParagraphElement>){
//         this.elements = elements
//     }
// }

// interface IDocsImageModified{
//     imageModel:DocsInlineObjectElementModel
//     imagePropsObj:DocsInlineObjectsModel
//     sourceUrl: string
//     link: string
//     size: DocsInlineObjectSizeModel
// }

// type RequireOneProp<T>{
//     [x in keyof T]: Record<x, T[x]> & Partial<Record<Exclude<keyof T, x>, never>>
// }[keyof T]


// interface TemplateDocsPargraphElementModelModified{
//     textRun: Maybe<DocsTextRunModel>
//     image: Maybe<IDocsImageModified>
//     $element: IntermediateParagraphElement
// }

// type IDocsPargraphElementModelModified = RequireOneProp<UnwrapProps<TemplateDocsPargraphElementModelModified>>

// type imageMapperFn = (image:DocsInlineObjectElementModel) => IDocsImageModified

// class ModifiedImageMapper implements IDocsImageModified{
//     imageModel: DocsInlineObjectElementModel
//     imagePropsObj: DocsInlineObjectsModel
    
//     static createMapper(imageProps?:DocsInlineObjectsModel):imageMapperFn{
//         return (image:DocsInlineObjectElementModel) => ModifiedImageMapper.of(image, imageProps)
//     }
//     static of(imageModel:DocsInlineObjectElementModel, imagePropsObj:DocsInlineObjectsModel):IDocsImageModified{
//         return new ModifiedImageMapper(imageModel, imagePropsObj)
//     }
//     constructor(imageModel:DocsInlineObjectElementModel, imagePropsObj:DocsInlineObjectsModel){
//         this.imageModel = imageModel
//         this.imagePropsObj = imagePropsObj
//     }

//     get sourceUrl():string{
//         return this.embeddedObj?.imageProperties?.contentUri
//     }
//     get link():string{
//         return this.imageModel?.textStyle?.link?.url
//     }
//     get size():DocsInlineObjectSizeModel{
//         return this.embeddedObj?.size
//     }

//     private get id():string{
//         return this.imageModel?.inlineObjectId
//     }
//     private get embeddedObj():DocsEmbeddedObjectModel{
//         return this.imagePropsObj[this.id]?.inlineObjectProperties?.embeddedObject
//     }
// }

// class DocsParagraphElementModelModified implements TemplateDocsPargraphElementModelModified{
//     element: DocsParagraphElementModel
//     imageMapperFn:imageMapperFn
//     iimagemapper:IImageMapper
//     itm:ITextRunMapper

//     constructor(element:DocsParagraphElementModel, imageMapper:imageMapperFn, iimagemapper:IImageMapper, itm: ITextRunMapper){
//         this.element = element
//         this.imageMapperFn = imageMapper
//         this.iimagemapper = iimagemapper
//         this.itm = itm
//     }

//     get textRun(): Maybe<DocsTextRunModel>{
//         return Maybe.of(this.element?.textRun)
//     }

//     get image(): Maybe<IDocsImageModified>{
//         return Maybe.of(this.element?.inlineObjectElement).map(this.imageMapperFn)
//     }

//     get $element():IntermediateParagraphElement{
//         return this.image.map(this.iimagemapper.mapToImage).orElseGet(() => this.textRun.map(this.itm.mapToTextRun).unsafeUnwrap())
//     }
// }

// interface IntermediateTextRun extends Typed<"textRun">{
//     text:Maybe<string>
//     link:Maybe<string>
// }
// type TextRunOf= (text?:string, link?:string) => IntermediateTextRun
// type TextRunMapperFn = (docsTextRun?:DocsTextRunModel) => IntermediateTextRun

// interface ITextRunMapper{
//     mapToTextRun(docsTextRun?:DocsTextRunModel):IntermediateTextRun
// }
// class TextRunMapper implements ITextRunMapper{
//     mapper: TextRunOf
//     constructor(mapper:TextRunOf = TextRun.of){
//         this.mapper = mapper
//     }
//     mapToTextRun(docsTextRun?:DocsTextRunModel):IntermediateTextRun{
//         const text = docsTextRun?.content
//         const link = docsTextRun?.textStyle?.link?.url
//         return this.mapper(text, link)
//     }
// }

// class TextRun implements IntermediateTextRun{
//     text: Maybe<string>
//     link: Maybe<string>
//     type: "textRun"

//     static of(text?:string, link?:string):TextRun{
//         return new TextRun(text, link)
//     }

//     constructor(text?:string, link?:string){
//         this.text = Maybe.of(text)
//         this.link = Maybe.of(link)
//     }
// }


// interface IntermediateImage extends Typed<"image">{
//     sourceUrl: Maybe<string>
//     link: Maybe<string>
//     size: Maybe<DocsInlineObjectSizeModel>
// }

// type ImageOf = (sourceUrl?:string, link?:string, size?:DocsInlineObjectSizeModel) => IntermediateImage
// type MapToImageFn = (image:IDocsImageModified) => IntermediateImage
// interface IImageMapper{
//     mapToImage(image:IDocsImageModified):IntermediateImage
// }

// class ImageMapper implements IImageMapper{
//     mapper:ImageOf
//     constructor(mapper:ImageOf = Image.of){
//         this.mapper = mapper
//     }
//     mapToImage(image:IDocsImageModified): IntermediateImage{
//         const id = imageModel?.inlineObjectId
//         const embeddedObj = imagePropsObj[id]?.inlineObjectProperties?.embeddedObject
//         const sourceUrl = embeddedObj?.imageProperties?.contentUri
//         const link = imageModel?.textStyle?.link?.url
//         const size = embeddedObj?.size
//         return this.mapper(sourceUrl, link, size)
//     }
// }

// class Image implements IntermediateImage{
//     sourceUrl: Maybe<string>
//     link: Maybe<string>
//     size: Maybe<DocsInlineObjectSizeModel>
//     type: "image"

//     static of(sourceUrl?:string, link?:string, size?:DocsInlineObjectSizeModel):Image{
//         return new Image(sourceUrl, link, size)
//     }
//     constructor(sourceUrl?:string, link?:string, size?:DocsInlineObjectSizeModel){
//         this.sourceUrl = Maybe.of(sourceUrl)
//         this.link = Maybe.of(link)
//         this.size = Maybe.of(size)
//     }
// }




// // const a:IntermediateTextRun
// // const b:IntermediateImage
// // // const d:IntermediateFake
// // const c: IntermediateParagraph = {
// //     elements: List.fromArr([a, b]),
// //     value: Maybe.of(List.fromArr([a,b]))
// // }

// // interface IntermediateFake extends Typed<"image">{
// //     link: Maybe<string>
// //     size: Maybe<DocsInlineObjectSizeModel>
// //     text:Maybe<string>
// //     box:Maybe<number>
// // }
// // c.elements.asArray().forEach(e => {
// //     switch (e.type){
// //         case validParagraphElementTypes.fake:
// //             return e.link
// //     }
// // })

// // function switchOnType(e: IntermediateParagraphElement){
// //     switch(e.type){
// //         case "image":
// //             if ("text" in e){
// //                 e.
// //             }
// //     }
// // }

// // type TextRunMapperFn= (textRunModel: DocsTextRunModel) => IntermediateTextRun
// // type ImageMapperFn = (inlineObj:DocsInlineObjectElementModel) => IntermediateImage
// // type DocsImageMapperFn = (inlineObjectsModel: DocsInlineObjectsModel) => ImageMapperFn
// // type ParagraphMapperFn = (bodyContent: DocsBodyContentModel) => IntermediateParagraph


// // type ImageMapperFn = (inlineObj:DocsInlineObjectElementModel, propsObj: DocsInlineObjectsModel) => IDocsImage

// // class DocsParagraphElement implements IntermediateParagraphElement{
// //     // textRun: Maybe<IDocsTextRun>
// //     // image: Maybe<IDocsImage>
// //     paragraphElement: DocsParagraphElementModel
// //     textRunMapperFn: TextRunMapperFn 
// //     imageMapperFn: ImageMapperFn
// //     // textRun: DocsTextRunModel
// //     // image: DocsImagePropertiesModel
// //     get textRun(): Maybe<IntermediateTextRun>{
// //         return Maybe.of(this.paragraphElement?.textRun).map(this.textRunMapperFn)
// //     }
// //     get image():Maybe<IntermediateImage>{
// //         return Maybe.of(this.paragraphElement?.inlineObjectElement).map(this.imageMapperFn)
// //     }
// // }

// class DocsDocumentz{
//     paragraphs:List<IntermediateParagraphElement>
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
// import { UnwrapProps } from "../Models/UtilityTypes"

// class DocsImageProperties implements IntermediateImage{
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

// class DocsTextRun implements IntermediateTextRun{
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


// class DocsParagraph implements IntermediateParagraph{
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

// type docsParagraphCreatorFn = (docsParagraphModel:DocsParagraphModel) => IntermediateParagraph





// class DocsDocument{
    
// }


// class DocsDocument2 implements IDocsDocment{
//     docsParagraphCreatorFn: docsParagraphCreatorFn
//     document: DocsDocumentModel

//     get bodyContent():Maybe<List<DocsBodyContentModel>>{
//         return Maybe.of(this.document?.body?.content).map(reduceToList)
//     }

//     get paragraphs():Maybe<List<IntermediateParagraph>>{
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

