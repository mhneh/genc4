import {Appearance} from "@app/wireframes/interface/common/appearance.ts";
import {Size} from "@app/wireframes/interface/common/size.ts";
import {Configurable} from "@app/wireframes/interface/common/configurable.ts";
import {ShapeSource} from "@app/wireframes/interface/shape/source/shape-source.ts";
import {CreatedShape} from "@app/wireframes/interface/shape/created-shape.ts";
import {RenderContext} from "@app/wireframes/interface/renderer/render-context.ts";
import {ConfigurableFactory, Constraint, ConstraintFactory} from "@app/wireframes/interface";
import {AssetType} from "@app/wireframes/interface/common/asset-type.ts";

export interface ShapePlugin {
    identifier(): string;

    defaultAppearance(): Appearance;

    defaultSize(): Size;

    configurables?(factory: ConfigurableFactory): Configurable[];

    constraint?(factory: ConstraintFactory): Constraint;

    previewOffset?(): { left: number; top: number; right: number; bottom: number };

    previewSize?(desiredWidth: number, desiredHeight: number): Size;

    create?(source: ShapeSource): CreatedShape | null | undefined;

    showInGallery?(): boolean;

    render(ctx: RenderContext): any;

    type(): AssetType,
}