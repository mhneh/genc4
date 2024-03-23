import {ShapeFactory} from "@app/wireframes/interface/shape/factory/shape-factory.ts";
import {RendererElement} from "@app/wireframes/interface/renderer/renderer-element.ts";
import {Rect2} from "@app/core";

export interface ShapeRenderer2 extends ShapeFactory {
    getBounds(element: RendererElement): Rect2;

    getLocalBounds(element: RendererElement): Rect2;

    getTextWidth(text: string, fontSize: number, fontFamily: string): number;
}