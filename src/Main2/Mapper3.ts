// import { DocsBodyContentModel, DocsDocumentModel, DocsInlineObjectElementModel, DocsParagraphModel, DocsTextRunModel } from "../Models/DocsDocumentModel";
// import { curryLiftA2, isSomething, Maybe } from "../Monads/Maybe";
// import { List, reduceToList, toList } from "../Monads/List";
// import { DocsParagraphElementModel } from "../Models/DocsDocumentModel";
// import { DocsEmbeddedObjectModel, DocsInlineObjectSizeModel, DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel";
// import { concatStrings } from "../Models/UtilityFunctions";
// import { HtmlMapper } from "./HtmlMapper";


// class HtmlCreatorMapper{
//     static wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string{
//         return `<img src="${sourceUrl}", height="${sizeInPixels.height}", width="${sizeInPixels.width}"></img>`
//     }
//     static wrapInLinkTag (link:string, text:string): string{
//         return `<a href="${link}">${text}</a>`
//     }
//     static wrapInParagraphTag(text:string):string{
//         return `<p>${text}</p>`
//     }
// }

// class DocsHtmlCreatorMapper implements IHtmlLinkTagCreator, IHtmlImageTagCreator, IHtmlParagraphTagCreator{
//     private constructor(){}
//     static initialize():DocsHtmlCreatorMapper{
//         return new DocsHtmlCreatorMapper()
//     }
//     wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string{
//         return `<img src="${sourceUrl}", height="${sizeInPixels.height}", width="${sizeInPixels.width}"></img>`
//     }
//     wrapInLinkTag (link:string, text:string): string{
//         return `<a href="${link}">${text}</a>`
//     }
//     wrapInParagraphTag(text:string):string{
//         return `<p>${text}</p>`
//     }
// }

// interface IHtmlLinkTagCreator{
//     wrapInLinkTag (link:string, text:string): string
// }
// interface IHtmlImageTagCreator{
//     wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string
// }
// interface IHtmlParagraphTagCreator{
//     wrapInParagraphTag(text:string):string
// }

// type DocsImageHtmlCreator = IHtmlImageTagCreator & IHtmlLinkTagCreator

// interface IPixelSizeConverter{
//     convertDocsSizeToPixelSize(size:DocsInlineObjectSizeModel):ISizeInPixels
// }

// interface IDocsImageMapper extends IImageHtmlMapper, IPixelSizeConverter{}
// interface IImageHtmlMapper extends IHtmlLinkTagCreator, IHtmlImageTagCreator{}

// interface ITextRunHtmlMapper extends IHtmlLinkTagCreator{}

// type createLinkTagFn = (link:string, text:string) => string
// type createImageTagFn = (sourceUrl:string, sizeInPixels:SizeInPixels) => string
// type wrapInParagraphTagFn = (text:string) => string
// type convertDocsSizeToPixelSizeFn = (size: DocsInlineObjectSizeModel) => ISizeInPixels

// class DocsImageHtmlMapper implements IImageHtmlMapper{
//     wrapInImageTag:createImageTagFn
//     wrapInLinkTag: createLinkTagFn
    
//     private constructor(createImageTag:createImageTagFn, createLinkTag:createLinkTagFn){
//         this.wrapInImageTag = createImageTag
//         this.wrapInLinkTag = createLinkTag
//     }
//     static of(createImageTag:createImageTagFn, createLinkTag:createLinkTagFn):DocsImageHtmlMapper{
//         return new DocsImageHtmlMapper(createImageTag, createLinkTag)
//     }

//     static initializeWithDefaults():DocsImageHtmlMapper{
//         return DocsImageHtmlMapper.of(HtmlCreatorMapper.wrapInImageTag, HtmlCreatorMapper.wrapInLinkTag)
//     }
// }

// class DocsTextRunMapper implements ITextRunHtmlMapper{
//     wrapInLinkTag:createLinkTagFn

//     private constructor(createLinkTag:createLinkTagFn){
//         this.wrapInLinkTag = createLinkTag
//     }

//     @bindClassMethodsToClassInstance
//     static of(createLinkTag:createLinkTagFn):DocsTextRunMapper{
//         return new DocsTextRunMapper(createLinkTag)
//     }

//     static initializeWithDefaults():DocsTextRunMapper{
//         return DocsTextRunMapper.of(HtmlCreatorMapper.wrapInLinkTag)
//     }
// }

// class DocsSizeMapper implements IPixelSizeConverter{
//     convertDocsSizeToPixelSize: convertDocsSizeToPixelSizeFn

//     private constructor(convertDocsSizeToPixelSizeFn:convertDocsSizeToPixelSizeFn){
//         this.convertDocsSizeToPixelSize = convertDocsSizeToPixelSizeFn
//     }
//     static of(convertDocsSizeToPixelSizeFn:convertDocsSizeToPixelSizeFn):DocsSizeMapper{
//         return new DocsSizeMapper(convertDocsSizeToPixelSizeFn)
//     }

//     static initializeWithDefaults():DocsSizeMapper{
//         return DocsSizeMapper.of(SizeInPixels.convertDocsSizeToPixelSize)
//     }
// }

// type sizeUnits = "pixel"
// interface ISize<unitOfMeasure extends sizeUnits>{
//     height:number
//     width:number
//     unit: unitOfMeasure
// }
// type ISizeInPixels = ISize<"pixel">

// class SizeInPixels implements ISizeInPixels{
//     height:number
//     width:number
//     unit: "pixel" = "pixel"

//     static of(width:number, height:number):SizeInPixels{
//         return new SizeInPixels(width, height)
//     }
//     static convertDocsSizeToPixelSize(size:DocsInlineObjectSizeModel):SizeInPixels{
//         const widthInPoints = size?.width?.magnitude
//         const heightInPoints = size?.height?.magnitude
//         return SizeInPixels.of( SizeInPixels.convertPointSizetoPixelSize(widthInPoints), SizeInPixels.convertPointSizetoPixelSize(heightInPoints) )
//     }
//     private static convertPointSizetoPixelSize(pointSize:number):number{
//         return pointSize * (4/3)
//     }
//     constructor(width:number, height:number){
//         this.height = height
//         this.width = width
//     }
// }

// function bindClassMethodsToClassInstance(target:any, propertyKey: string, descriptor:PropertyDescriptor) {
//     const originalMethod = descriptor.value
//     descriptor.value = function (...args){
//         const classInstance = originalMethod(...args)
//         const classMethods = Object.getOwnPropertyNames(target.prototype)
//             .filter(isNotAConstructor)
//             .filter(isAMethodNameInClassInstance(classInstance)) 
            
//         classMethods.forEach(bindMethodToObj(classInstance))
//         return classInstance
//     }

//     function isNotAConstructor(name:string){
//         return name != "constructor"
//     }
//     function isAMethodNameInClassInstance(obj:object){
//         return (name:string) => typeof obj[name] == "function"
//     }
//     function bindMethodToObj(obj:object){
//         return (methodName:string) => {
//             obj[methodName] = obj[methodName].bind(obj)
//         }
//     }
// }


// class DocsImageMapper implements IDocsImageMapper{
//     htmlMapper:IImageHtmlMapper
//     sizeMapper: IPixelSizeConverter

//     @bindClassMethodsToClassInstance
//     static of(htmlMapper:IImageHtmlMapper, sizeMapper: IPixelSizeConverter):DocsImageMapper{
//         return new DocsImageMapper(htmlMapper, sizeMapper)
//     }

//     static initialzeWithDefaults():DocsImageMapper{
//         return DocsImageMapper.of(DocsImageHtmlMapper.initializeWithDefaults(), DocsSizeMapper.initializeWithDefaults())
//     }

//     private constructor(htmlMapper:IImageHtmlMapper, sizeMapper: IPixelSizeConverter){
//         this.htmlMapper = htmlMapper
//         this.sizeMapper = sizeMapper
//     }
//     wrapInLinkTag(link:string, text:string): string{
//         return this.htmlMapper.wrapInLinkTag(link, text)
//     }
//     wrapInImageTag(sourceUrl:string, sizeInPixels:SizeInPixels): string{
//         return this.htmlMapper.wrapInImageTag(sourceUrl, sizeInPixels)
//     }
//     convertDocsSizeToPixelSize(size: DocsInlineObjectSizeModel): ISizeInPixels {
//         return this.sizeMapper.convertDocsSizeToPixelSize(size)
//     }
// }


// class Image3{
//     static createHtml(inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel, mapper:IDocsImageMapper = DocsImageMapper.initialzeWithDefaults()):string{
//         const embeddedObj = getEmbeddedObject(inlineObj, imageProps)
//         const imgHtml = wrapInImageTag(mapper, embeddedObj.flatMap(getSourceUrl), embeddedObj.flatMap(getSizeInPixels(mapper)))
//         return wrapInLinkTag(mapper, getLink(inlineObj), imgHtml).orElseGet(() => imgHtml.orElse(`<img></img>`))

//         function wrapInLinkTag(mapper:IHtmlLinkTagCreator, link:Maybe<string>, html:Maybe<string>):Maybe<string>{
//             return curryLiftA2(mapper.wrapInLinkTag, link, html)
//         }
//         function wrapInImageTag(mapper: IHtmlImageTagCreator, sourceUrl:Maybe<string>, size:Maybe<SizeInPixels> ):Maybe<string>{
//             return curryLiftA2(mapper.wrapInImageTag, sourceUrl, size)
//         }

//         function getLink(inlineObj:DocsInlineObjectElementModel):Maybe<string>{
//             return Maybe.of(inlineObj?.textStyle?.link?.url)
//         }
//         function getSourceUrl(embeddedObj:DocsEmbeddedObjectModel):Maybe<string>{
//             return Maybe.of(embeddedObj?.imageProperties?.contentUri)
//         }
            
//         function getEmbeddedObject(inlineObj:DocsInlineObjectElementModel, imageProps:DocsInlineObjectSizeModel ):Maybe<DocsEmbeddedObjectModel>{
//             return Maybe.of(inlineObj?.inlineObjectId).map(id => imageProps[id]?.inlineObjectProperties?.embeddedObject)
//         }

//         function getSizeInPixels(mapper:IPixelSizeConverter): (embeddedObj:DocsEmbeddedObjectModel) => Maybe<SizeInPixels>{
//             return (embeddedObj:DocsEmbeddedObjectModel) => Maybe.of(embeddedObj?.size).map(mapper.convertDocsSizeToPixelSize)
//         }
//     }
// }


// class TextRun3{
//     static createHtml(textRun: DocsTextRunModel, mapper:ITextRunHtmlMapper = DocsTextRunMapper.initializeWithDefaults()):string{
//         const text = getText(textRun)
//         return wrapInLinkTag(mapper, getLink(textRun), text)
//             .orElseGet(() => text.orElse("<p></p>"))
        
//         function wrapInLinkTag(mapper:IHtmlLinkTagCreator, link:Maybe<string>, text:Maybe<string>):Maybe<string>{
//             return curryLiftA2(mapper.wrapInLinkTag, link, text)
//         }

//         function getText(textRun:DocsTextRunModel):Maybe<string>{
//             return Maybe.of(textRun?.content)
//         }
//         function getLink(textRun:DocsTextRunModel):Maybe<string>{
//             return Maybe.of(textRun?.textStyle?.link?.url)
//         }
//     }
// }

// type SingleParagraph = List<DocsParagraphElementModel>
// type MultipleParagraphs = List<SingleParagraph>

// type documentContentToHtmlMapper = (documentContent:MultipleParagraphs, imageProps?:DocsInlineObjectsModel) => string
// type createImageHtmlFn = (inlineObj:DocsInlineObjectElementModel, imageProps: DocsInlineObjectsModel) => string
// type createTextRunHtmlFn = (textRun: DocsTextRunModel) => string


// interface ImageHtmlMapper{
//     createImageHtml:createImageHtmlFn
// }
// interface TextRunHtmlMapper{
//     createTextRunHtml: createTextRunHtmlFn
// }
// interface ParagraphHtmlWrapper{
//     wrapInParagraphTag: wrapInParagraphTagFn
// }

// interface IDocsHtmlMapper extends ImageHtmlMapper, TextRunHtmlMapper, ParagraphHtmlWrapper{}

// class HtmlMapperz implements IDocsHtmlMapper{
//     wrapInParagraphTag: wrapInParagraphTagFn;
//     createImageHtml: createImageHtmlFn;
//     createTextRunHtml: createTextRunHtmlFn;

//     constructor(wrapInParagraphTagFn: wrapInParagraphTagFn, createImageHtmlFn:createImageHtmlFn, createTextRunHtmlFn:createTextRunHtmlFn){
//         this.wrapInParagraphTag = wrapInParagraphTagFn
//         this.createImageHtml = createImageHtmlFn
//         this.createTextRunHtml = createTextRunHtmlFn
//     }

//     @bindClassMethodsToClassInstance
//     static of(wrapInParagraphTagFn: wrapInParagraphTagFn, createImageHtmlFn:createImageHtmlFn, createTextRunHtmlFn:createTextRunHtmlFn):HtmlMapperz{
//         return new HtmlMapperz(wrapInParagraphTagFn, createImageHtmlFn, createTextRunHtmlFn)
//     }
    
//     static initializeWithDefaults():HtmlMapperz{
//         return HtmlMapperz.of(HtmlCreatorMapper.wrapInParagraphTag, Image3.createHtml, TextRun3.createHtml)
//     }
// }

// type ParagraphElementHtmlMapper = ImageHtmlMapper & TextRunHtmlMapper

// class HtmlMapper3{
//     static createHtml(documentContent:MultipleParagraphs, imageProps?:DocsInlineObjectsModel, mapper:IDocsHtmlMapper = HtmlMapperz.initializeWithDefaults()):string{
//         return documentContent.map(paragraphToString(mapper, Maybe.of(imageProps)))
//             .map(mapper.wrapInParagraphTag)
//             .reduce(concatStrings)
        
//         function paragraphToString(mapper: ParagraphElementHtmlMapper, imageProps:Maybe<DocsInlineObjectsModel>):(paragraph:SingleParagraph) => string{
//             return (paragraph:SingleParagraph) => paragraph.map(mapElementToHtml(mapper, imageProps)).reduce(concatStrings)
//         }

//         function mapElementToHtml(mapper: ParagraphElementHtmlMapper, imageProps:Maybe<DocsInlineObjectsModel>):(paragraphElement: DocsParagraphElementModel) => string {
//             return (paragraphElement:DocsParagraphElementModel) => createImageHtml(mapper, paragraphElement, imageProps)
//                 .orElseGet(() => createTextRunHtml(mapper, paragraphElement).orElse("") );
//         }

//         function createTextRunHtml(mapper:TextRunHtmlMapper, paragraphElement:DocsParagraphElementModel):Maybe<string>{
//             return Maybe.of(paragraphElement?.textRun).map(mapper.createTextRunHtml)
//         }

//         function createImageHtml(mapper: ImageHtmlMapper, paragraphElement:DocsParagraphElementModel,imageProps:Maybe<DocsInlineObjectsModel>):Maybe<string>{
//             return curryLiftA2(mapper.createImageHtml, getInlineObjectElement(paragraphElement), imageProps)
//         }

//         function getInlineObjectElement(paragraphElement:DocsParagraphElementModel):Maybe<DocsInlineObjectElementModel>{
//             return Maybe.of(paragraphElement?.inlineObjectElement)
//         }
//     }
// }

// class DocsDocsDocumentAsMultipleParagraphs{
//     static getParagraphs(docsDocument: DocsDocumentModel):Maybe<MultipleParagraphs>{
//         return getBodyContent(docsDocument)
//             .flatMap(toParagraphs)
//             .flatMap(toParagraphElements)
        
//         function toParagraphElements(paragraphs: List<DocsParagraphModel>): Maybe<List<List<DocsParagraphElementModel>>>{
//             return paragraphs.compactMap(toElements, isSomething).sequence(Maybe.of)

//             function toElements(paragraph:DocsParagraphModel):Maybe<List<DocsParagraphElementModel>>{
//                 return Maybe.of(paragraph?.elements).map(reduceToList)
//             }
//         }

//         function getBodyContent(docsDocument:DocsDocumentModel): Maybe<List<DocsBodyContentModel>>{
//             return Maybe.of(docsDocument?.body?.content).map(reduceToList)
//         }

//         function toParagraphs (bodyContent: List<DocsBodyContentModel>): Maybe<List<DocsParagraphModel>>{
//             return bodyContent.compactMap(content => Maybe.of(content?.paragraph), isSomething).sequence(Maybe.of)
//         }
//     }
// }

// class DocsToHtmlMapper{
//     static docToHtml(docsDocument:DocsDocumentModel):Maybe<string>{
//         return DocsDocsDocumentAsMultipleParagraphs.getParagraphs(docsDocument)
//             .map(paragraphs => HtmlMapper3.createHtml(paragraphs, docsDocument?.inlineObjects))
//     }
    
//     static concatDocs(...docs:DocsDocumentModel[]):string{
//         return docs.reduce((str:string, doc:DocsDocumentModel) => DocsToHtmlMapper.docToHtml(doc).map(html => str.concat(html)).orElse(str), " ").trim()
//     }
// }

// export function myTime3(){
//     const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
//     const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel
//     Logger.log(DocsToHtmlMapper.concatDocs(doc1, doc2))
// }
