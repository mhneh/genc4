/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { ConfigurableFactory, DefaultAppearance } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';
import {RenderContext} from "@app/wireframes/interface/renderer/render-context.ts";
import {ShapePlugin} from "@app/wireframes/interface/shape/shape-plugin.ts";

const BORDER_RADIUS = 'BORDER_RADIUS';
const PADDING_HORIZONTAL = 'PADDING_HORIZONTAL2';
const PADDING_VERTICAL = 'PADDING_VERTICAL2';

const DEFAULT_APPEARANCE = {
    [BORDER_RADIUS]: 0,
    [DefaultAppearance.BACKGROUND_COLOR]: 0xFFFFFF,
    [DefaultAppearance.FONT_SIZE]: CommonTheme.CONTROL_FONT_SIZE,
    [DefaultAppearance.FOREGROUND_COLOR]: 0,
    [DefaultAppearance.STROKE_COLOR]: CommonTheme.CONTROL_BORDER_COLOR,
    [DefaultAppearance.STROKE_THICKNESS]: CommonTheme.CONTROL_BORDER_THICKNESS,
    [DefaultAppearance.TEXT_ALIGNMENT]: 'center',
    [DefaultAppearance.TEXT]: 'Rectangle',
    [PADDING_HORIZONTAL]: 10,
    [PADDING_VERTICAL]: 10,
};

export class Rectangle implements ShapePlugin {
    type(): string {
        return "";
    }
    public identifier(): string {
        return 'Rectangle';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 100, y: 60 };
    }

    public configurables(factory: ConfigurableFactory) {
        return [
            factory.slider(BORDER_RADIUS, 'Border Radius', 0, 40),
            factory.number(PADDING_HORIZONTAL, 'Padding Horizontal', 0, 40),
            factory.number(PADDING_VERTICAL, 'Padding Vertical', 0, 40),
        ];
    }

    public render(ctx: RenderContext) {
        this.createShape(ctx);
        this.createText(ctx);
    }

    private createShape(ctx: RenderContext) {
        const borderRadius = ctx.shape.getAppearance(BORDER_RADIUS);

        ctx.renderer2.rectangle(ctx.shape, borderRadius, ctx.rect, p => {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
    }

    private createText(ctx: RenderContext) {
        const paddingVertical = ctx.shape.getAppearance(PADDING_VERTICAL);
        const paddingHorizontal = ctx.shape.getAppearance(PADDING_HORIZONTAL);

        ctx.renderer2.text(ctx.shape, ctx.rect.deflate(paddingHorizontal, paddingVertical), p => {
            p.setForegroundColor(ctx.shape);
        }, true);
    }
}
