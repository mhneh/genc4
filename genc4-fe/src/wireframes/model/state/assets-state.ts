/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import {ICONS_FONT_AWESOME} from '../../../icons/font_awesome_unified.ts';
import {ICONS_MATERIAL_DESIGN} from '../../../icons/material_icons_unified.ts';
import {RendererService} from '../renderer/renderer.service.ts';
import {ShapePlugin} from "@app/wireframes/interface/shape/shape-plugin.ts";

export interface AssetInfo {
    // The name of the asset.
    name: string;

    // The display name.
    displayName: string;

    // The display search property.
    displaySearch: string;
}

export interface ShapeInfo extends AssetInfo {
    // The plugin.
    plugin: ShapePlugin;
}

export interface IconInfo extends AssetInfo {
    // The name of the icon.
    text: string;

    // The font family.
    fontFamily: string;

    // The font class.
    fontClass: string;
}

export interface ComponentInfo extends AssetInfo {

}

export interface AssetsState {
    // The icons by name.
    icons: { [name: string]: IconInfo[] };

    // The icon set.
    iconSet: string;

    // The icon filter,
    iconsFilter: string;

    // The shapes to show.
    shapes: ShapeInfo[];

    // The shapes filter.
    shapesFilter: string;

    contexts: ShapeInfo[];

    contextsFilter: string;

    containers: ShapeInfo[];

    containersFilter: string;

    components: ShapeInfo[];

    componentsFilter: string;
}

export const createInitialAssetsState: () => AssetsState = () => {
    const allShapes = RendererService.all()
        .filter(x => x[1].plugin().showInGallery?.() !== false)
        .map(([name, renderer]) => {
            return {
                plugin: renderer.plugin(),
                displayName: name,
                displaySearch: name,
                name,
            };
        });
    const allContexts = RendererService.all()
        .filter(x => x[1].plugin().type() === 'Contexts')
        .map(([name, renderer]) => {
            return {
                plugin: renderer.plugin(),
                displayName: name,
                displaySearch: name,
                name,
            };
        });
    const allContainers = RendererService.all()
        .filter(x => x[1].plugin().type() === 'Containers')
        .map(([name, renderer]) => {
            return {
                plugin: renderer.plugin(),
                displayName: name,
                displaySearch: name,
                name,
            };
        });
    const allComponents = RendererService.all()
        .filter(x => x[1].plugin().type() === 'Components')
        .map(([name, renderer]) => {
            return {
                plugin: renderer.plugin(),
                displayName: name,
                displaySearch: name,
                name,
            };
        });
    return {
        shapes: allShapes,
        shapesFilter: '',
        icons: {
            'Font Awesome': ICONS_FONT_AWESOME,
            'Material Design': ICONS_MATERIAL_DESIGN
        },
        iconsFilter: '',
        iconSet: 'Font Awesome',
        contexts: allContexts,
        contextsFilter: '',
        containers: allContainers,
        containersFilter: '',
        components: allComponents,
        componentsFilter: '',
    };
};

export interface AssetsStateInStore {
    assets: AssetsState;
}
