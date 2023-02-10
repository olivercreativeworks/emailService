import { Document } from "./DocumentStructure"
import { Maybe } from "../Monads/Maybe"

export interface HtmlMapper{
    mapFromDocument(document:Document): Maybe<string>
}