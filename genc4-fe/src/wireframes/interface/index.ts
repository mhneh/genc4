/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import {Vec2} from '@app/core/utils';
import {Configurable} from "@app/wireframes/interface/common/configurable.ts";
import {Shape} from "@app/wireframes/interface/shape/shape.ts";

export {Color, Rect2, Vec2} from '@app/core/utils';

export const DefaultAppearance = {
    BACKGROUND_COLOR: 'FOREGROUND_COLOR',
    FONT_FAMILY: 'FONT_FAMILY',
    FONT_SIZE: 'FONT_SIZE',
    FOREGROUND_COLOR: 'BACKGROUND_COLOR',
    ICON_FONT_FAMILY: 'ICON_FONT_FAMILY',
    LINK: 'LINK',
    OPACITY: 'OPACITY',
    STROKE_COLOR: 'STROKE_COLOR',
    STROKE_THICKNESS: 'STROKE_THICKNESS',
    TEXT_ALIGNMENT: 'TEXT_ALIGNMENT',
    TEXT_DISABLED: 'TEXT_DISABLED',
    TEXT: 'TEXT',
    TITLE: 'TITLE',
    DESC: 'DESCRIPTION',
    TECH: 'TECHNOLOGY',
};

export function getPageLink(id: string) {
    return `page://${id}`;
}

export function getPageLinkId(link: string) {
    return link.substring(7);
}

export function isPageLink(link: string | null | undefined) {
    return link?.indexOf('page://') === 0;
}

export interface Constraint {
    updateSize(shape: Shape, size: Vec2, prev?: Shape): Vec2;

    calculateSizeX(): boolean;

    calculateSizeY(): boolean;
}

export interface ConstraintFactory {
    size(width?: number, height?: number): Constraint;

    minSize(): Constraint;

    textHeight(padding: number): Constraint;

    textSize(paddingX?: number, paddingY?: number, lineHeight?: number, resizeWidth?: false, minWidth?: number): Constraint;
}

export interface ConfigurableFactory {
    selection(name: string, label: string, options: string[]): Configurable;

    slider(name: string, label: string, min: number, max: number): Configurable;

    number(name: string, label: string, min: number, max: number): Configurable;

    text(name: string, label: string): Configurable;

    toggle(name: string, label: string): Configurable;

    color(name: string, label: string): Configurable;
}
