import {RendererWidth} from "@app/wireframes/interface/renderer/renderer-width.ts";
import {ShapePropertiesFunc} from "@app/wireframes/interface/shape/properties/shape-properties-func.ts";
import {RendererElement} from "@app/wireframes/interface/renderer/renderer-element.ts";
import {RendererText} from "@app/wireframes/interface/renderer/renderer-text.ts";
import {ShapeFactoryFunc} from "@app/wireframes/interface/shape/factory/shape-factory-func.ts";
import {Rect2} from "@app/core";

export interface ShapeFactory {
    ellipse(strokeWidth: RendererWidth, bounds: Rect2, properties?: ShapePropertiesFunc): RendererElement;

    rectangle(strokeWidth: RendererWidth, radius: number, bounds: Rect2, properties?: ShapePropertiesFunc): RendererElement;

    roundedRectangleLeft(strokeWidth: RendererWidth, radius: number, bounds: Rect2, properties?: ShapePropertiesFunc): RendererElement;

    roundedRectangleRight(strokeWidth: RendererWidth, radius: number, bounds: Rect2, properties?: ShapePropertiesFunc): RendererElement;

    roundedRectangleTop(strokeWidth: RendererWidth, radius: number, bounds: Rect2, properties?: ShapePropertiesFunc): RendererElement;

    roundedRectangleBottom(strokeWidth: RendererWidth, radius: number, bounds: Rect2, properties?: ShapePropertiesFunc): RendererElement;

    path(strokeWidth: RendererWidth, path: string, properties?: ShapePropertiesFunc): RendererElement;

    raster(source: string, bounds: Rect2, preserveAspectRatio?: boolean, properties?: ShapePropertiesFunc): RendererElement;

    text(config: RendererText, bounds: Rect2, properties?: ShapePropertiesFunc, allowMarkdown?: boolean): RendererElement;

    textMultiline(config: RendererText, bounds: Rect2, properties?: ShapePropertiesFunc, allowMarkdown?: boolean): RendererElement;

    getOuterBounds(strokeWidth: RendererWidth, bounds: Rect2): Rect2;

    group(items: ShapeFactoryFunc, clip?: ShapeFactoryFunc, properties?: ShapePropertiesFunc): RendererElement;
}