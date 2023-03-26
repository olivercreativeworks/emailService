// import { EmailConstructor } from "./Main/EmailConstructor"
// // import { DocumentToHtmlMapper } from "./Classes/HtmlMapper"
// import { GmailTemplate } from "./Main/EmailTemplates"
// // import { CustomEmail } from "./Classes/CustomEmail"
// import { MyDocument } from "./Main/DocumentStructure"
// import { Document } from "./Models/DocumentModel"
// import { mymain } from "./Main/DocumentStructure"
// import { DocsDocumentModel } from "./Models/DocsDocumentModel"

import { DocumentToHtmlMapper } from "./Main2/DocumentStructure"
import { DocsDocumentModel } from "./Models/DocsDocumentModel"
import { List } from "./Monads/List"
import { Maybe } from "./Monads/Maybe"
import { DocsToDocumentMapper } from "./Models/SimplifiedDocsDocumentModel"
import { EmailDocument } from "./Main2/EmailDocument"
import { DocsInlineObjectsModel } from "./Models/DocsInlineObjectModel"
import { DocsParagraphElementModel } from "./Models/DocsDocumentModel"
import { ParagraphElement } from "./Models/DocumentModel"
import { InlineImageOptionsMapper } from "./Models/DocumentImageModel"
import { InlineImage } from "./Models/DocumentImageModel"
import { DocsTextRunModel } from "./Models/DocsDocumentModel"
import { TextRun } from "./Models/DocumentModel"
// import { mytime } from "./Main/Mapper"

function callmytime(){
  mytime()
}

function callTesting(){
  Logger.log("Hello me")
  const doc1 = Docs.Documents.get('1Y29ar26MwC5tYw1-fLoh2Ndget5jMLUcGOdwmMd3vwo') as DocsDocumentModel
  const doc2 = Docs.Documents.get('1-ngp__00XaqhpnNaSJ4xXDBn7UKkAxM-kdab1a5avWI') as DocsDocumentModel

  const getAgain = (doc: DocsDocumentModel) => {
    return DocsToDocumentMapper.of(doc).map(document => document.mapParagraphBaseUnit(docsElementsToParagraphElements(doc.inlineObjects)))
  }

  const again = EmailDocument.concatMultipleDocs(List.of(doc1, doc2).map(getAgain).sequence(Maybe.of).unsafeUnwrap())
    
    Logger.log(again)
    
    return again


    function docsElementsToParagraphElements(inlineObjects?:DocsInlineObjectsModel): typeof $docsElementsToParagraphElements{
      return $docsElementsToParagraphElements
      
      function $docsElementsToParagraphElements(element: DocsParagraphElementModel):ParagraphElement{
          const textRun = Maybe.of(element.textRun).map(docsTextRunToTextRun).unsafeUnwrap()

          const inlineImage = Maybe.of(inlineObjects)
             .flatMap(inlineObj => InlineImageOptionsMapper.fromDocs(inlineObj, element.inlineObjectElement)) 
             .map(options => InlineImage.of(options.imageSourceUrl, options))
             .unsafeUnwrap()
          Logger.log(inlineImage)
          return ParagraphElement.of(textRun, inlineImage)
      }
  }

  function docsTextRunToTextRun(docsTextRun: DocsTextRunModel):TextRun{
      const text = docsTextRun?.content
      const url = docsTextRun?.textStyle?.link?.url
      return TextRun.of(text, url)
  }
}





// function myTest4(docId){
//   const emailConstructor = new EmailConstructor(
//       new DocumentToHtmlMapper(), 
//       GmailTemplate.createNew(CustomEmail)
//   )

//   const email = emailConstructor.createEmailHtmlFromDocument(
//       MyDocument.of(Docs.Documents.get(docId)), 
//       "oliver@urbanupbound.org", 
//       "This is a test",
//       {senderDisplayName: "Oliver Cummings"}
//   )
//   email.send()
// }

function doGet(){
  return HtmlService.createTemplateFromFile('index').evaluate()
}

// function sendMonthlyWCBDIEmail() {
//     const date = CustomDate.of(new Date())
//     Logger.log('Sending Email')
//     GmailApp.sendEmail('oliver@urbanupbound.org', `TA/Edu Services for ${date.month}`, null, EmailTemplate.create(date, new HtmlFormatter()))
//     Logger.log('The email has been sent')
//   }
  

  


  

  

  