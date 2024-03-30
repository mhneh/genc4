/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { DiagramItem } from '@app/wireframes/model';
import {Relationship} from "@app/wireframes/model/relationship/relationship.ts";

export type PreviewStart = {
    type: 'Start';
};

export type PreviewEnd = {
    type: 'End';
};

export type PreviewUpdate = {
    type: 'Update';

    // All the items.
    items: { [id: string]: DiagramItem };

    relationships?: {[id: string]: Relationship};
};

export type PreviewEvent = PreviewStart | PreviewEnd | PreviewUpdate;