import {RendererColor} from "@app/wireframes/interface/renderer/renderer-color.ts";
import {RendererText} from "@app/wireframes/interface/renderer/renderer-text.ts";
import {RendererOpacity} from "@app/wireframes/interface/renderer/renderer-opacity.ts";
import {TextDecoration} from "@app/wireframes/interface/text/text-decoration.ts";

export interface ShapeProperties {
    readonly shape: any;

    setForegroundColor(color: RendererColor): ShapeProperties;

    setBackgroundColor(color: RendererColor): ShapeProperties;

    setStrokeColor(color: RendererColor): ShapeProperties;

    setStrokeStyle(cap: string, join: string): ShapeProperties;

    setFontFamily(fontFamily: RendererText | string): ShapeProperties;

    setOpacity(opacity: RendererOpacity): ShapeProperties;

    setText(text: RendererText | string): ShapeProperties;

    setTextDecoration(decoration: TextDecoration): ShapeProperties;

    setFontSize(size: number): ShapeProperties;
}