import { List } from "../Monads/List"
import { Maybe } from "../Monads/Maybe"

export interface Document{
    body:Maybe<Body>
}
export interface Body{
    bodyContent:Maybe<BodyContent>
}
export interface BodyContent{
    paragraphs: Maybe<Paragraphs>
}

type Paragraphs = List<Paragraph>

export interface Paragraph{
    elements:Maybe<ParagraphAsSubunit<ParagraphElement>>
}

export type ParagraphAsSubunit<SubunitType> = List<SubunitType>

export interface ParagraphElement{
    textRun: Maybe<TextRun>
}

export type TextRuns = List<TextRun>

export interface TextRun{
    content:Maybe<string>
    url:Maybe<string>
}