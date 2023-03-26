// import { DocsDocumentModel, DocsParagraphElementModel, DocsTextRunModel} from "../Models/DocsDocumentModel"
// import { TextRun, ParagraphElement } from "../Models/DocumentModel"
// import { DocsInlineObjectsModel } from "../Models/DocsInlineObjectModel"
// import { Maybe } from "../Monads/Maybe"
// import { InlineImage, InlineImageOptionsMapper } from "../Models/DocumentImageModel"
// import { DocsToDocumentMapper } from "../Models/SimplifiedDocsDocumentModel"
// import { EmailDocument } from "./EmailDocument"


// function mymain(docsDocument:DocsDocumentModel):Maybe<string>{
//     const again = DocsToDocumentMapper.of(docsDocument)
//         .map(document => document.mapParagraphBaseUnit(docsElementsToParagraphElements(docsDocument.inlineObjects)))
//         .map(EmailDocument.of)
//         .map(emailDoc => emailDoc.contentAsHtmlString())
    
//     Logger.log(again.unsafeUnwrap())
    
//     return again


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