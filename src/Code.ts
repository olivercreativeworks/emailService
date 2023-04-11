import { DocsDocument } from "./Main/ParagraphElements/DocsDocument"
import { HtmlMapper3 } from "./Main/ParagraphElements/DocsToHtmlMapper"
import { DocsDocumentModel } from "./Models/DocsDocumentModel"
import { liftA2 } from "./Utility/Utility"


// function concatDocs(...docs:DocsDocumentModel[]):Maybe<string>{
//     return List.fromArr(docs)
//         .compactMap(doc => DocsDocsDocumentAsMultipleParagraphs.getParagraphs(doc)
//             .map(paragraphs => HtmlMapper3.createHtml(paragraphs, doc.inlineObjects)), isSomething)
//         .sequence(Maybe.of)
//         .map(list => list.reduce(concatStrings))



        
// }

function myTime3(){
    const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
    const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel

    const myDocument = DocsDocument.createDocsDocument(doc1).map(HtmlMapper3.createHtml)
    const myDocument2 = DocsDocument.createDocsDocument(doc2).map(HtmlMapper3.createHtml)
    Logger.log(myDocument)
    Logger.log(myDocument2)
    
    liftA2(x=>y=> x.concat(y), myDocument, myDocument2).map(Logger.log)
    // const docsHtml = concatDocs(doc1, doc2)
    // // const docsHtml = DocsToHtmlMapper.concatDocs(doc1, doc2)
    // const subjectLine =  "Testing this new email"
    // const recipients:List<Email> = List.of("oliver@urbanupbound.org")
    
    // docsHtml.map(html => sendEmail(recipients, subjectLine, html))
}

function doGet(){
    return HtmlService.createHtmlOutputFromFile("src/index")
  }