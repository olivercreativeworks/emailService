import { ParagraphElement } from "../../InterfaceLayer/ParagraphElements"
import { IHtml_Image } from "./Html_Image/Html_Image"
import { IHtml_TextRun } from "./Html_TextRun/Html_TextRun"

export interface IHtml_ParagraphElementType<A extends ElementTypes> {
    type: A
}
type ElementTypes = "html_image" | "html_textRun" 

export type IImageElement = IHtml_Image & IHtml_ParagraphElementType<"html_image"> 
export type ITextElement = IHtml_TextRun & IHtml_ParagraphElementType<"html_textRun">
export type IHtml_ParagragraphElement = IImageElement | ITextElement