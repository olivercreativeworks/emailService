import { Html_Image } from "../../HtmlMapper/ParagraphElements/Html_Image/Html_Image";
import { IDocsImage } from "../DocsElements/DocsImage";
import { SizeInPixels } from "./SizeInPixelsMapper";

export class DocsImageToHtml_ImageMapper{
    static from(image:IDocsImage):Html_Image{
        return Html_Image.of(image.sourceUrl, SizeInPixels.convertDocsSizeToPixelSize(image.size), image.link)
    }
}