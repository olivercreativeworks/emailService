// import { Maybe, isSomething } from "../Monads/Maybe"
// import { List, reduceToList} from "../Monads/List"
// import { DocsDocumentModel, DocsParagraphModel, DocsParagraphElementModel, DocsBodyContentModel } from "./DocsDocumentModel"
// import { Document, IDocument } from "./DocumentModel"

// type DocumentFromSubunitsListFn <A> = (list: List<List<A>>) => IDocument<A>

// export class DocsToDocumentMapper{
    
//     static of(docsDocument:DocsDocumentModel, subunitsToDocumentMapper:DocumentFromSubunitsListFn<DocsParagraphElementModel> = Document.fromList): Maybe<Document<DocsParagraphElementModel>>{
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