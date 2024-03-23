/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { DiagramItem, InitialShapeProps } from '../diagram/diagram-item.ts';
import {Size} from "@app/wireframes/interface/common/size.ts";
import {ShapePlugin} from "@app/wireframes/interface/shape/shape-plugin.ts";

type DefaultProps = Omit<Omit<InitialShapeProps, 'transform'>, 'id'> & { size: Size };

export interface Renderer {
    identifier(): string;

    plugin(): ShapePlugin;

    defaultAppearance(): { [key: string]: any };

    createDefaultShape(): DefaultProps;

    setContext(context: any): Renderer;

    render(shape: DiagramItem, existing: any, options?: { debug?: boolean; noOpacity?: boolean; noTransform?: boolean }): any;
}
