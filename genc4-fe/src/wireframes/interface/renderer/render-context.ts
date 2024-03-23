import {Rect2} from "@app/wireframes/interface";
import {ShapeRenderer2} from "@app/wireframes/interface/shape/shape-renderer2.ts";
import {Shape} from "@app/wireframes/interface/shape/shape.ts";

export interface RenderContext {
    readonly shape: Shape;
    readonly renderer2: ShapeRenderer2;
    readonly rect: Rect2;
}