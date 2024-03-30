/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/
import { ConstraintFactory, DefaultAppearance } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';
import {ShapeSource} from "@app/wireframes/interface/shape/source/shape-source.ts";
import {RenderContext} from "@app/wireframes/interface/renderer/render-context.ts";
import {ShapePlugin} from "@app/wireframes/interface/shape/shape-plugin.ts";
import {AssetType} from "@app/wireframes/interface/common/asset-type.ts";

const DEFAULT_APPEARANCE = {
    [DefaultAppearance.FONT_SIZE]: CommonTheme.CONTROL_FONT_SIZE,
    [DefaultAppearance.FOREGROUND_COLOR]: CommonTheme.CONTROL_TEXT_COLOR,
    [DefaultAppearance.TEXT]: 'Label',
};

export class Label implements ShapePlugin {

    type(): AssetType {
        return "Shape";
    }

    public identifier(): string {
        return 'Label';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 46, y: 30 };
    }

    public create(source: ShapeSource) {
        if (source.type == 'Text') {
            const { text } = source;

            return {
                renderer: this.identifier(),
                appearance: {
                    [DefaultAppearance.TEXT]: text,
                },
            };
        }

        return null;
    }

    public constraint(factory: ConstraintFactory) {
        return factory.textSize(5, 5);
    }

    public render(ctx: RenderContext) {
        ctx.renderer2.text(ctx.shape, ctx.rect, p => {
            p.setForegroundColor(ctx.shape);
        }, true);
    }
}
