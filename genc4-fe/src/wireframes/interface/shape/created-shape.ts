import {Appearance} from "@app/wireframes/interface/common/appearance.ts";

export type CreatedShape = {
    renderer: string;
    size?: { x: number; y: number };
    appearance?: Appearance
};