import {MathHelper, Record} from "@app/core";

type UpdatedProps = {
    title: string;
    description: string;
}

export type Props = {
    id: string;
    title: string;
    description: string;
    source: string;
    target: string;
    diagramId: string;
}

export class Relationship extends Record<Props> {

    public get id() {
        return this.get('id');
    }

    public get title() {
        return this.get('title');
    }

    public get description() {
        return this.get('description');
    }

    public get source() {
        return this.get('source');
    }

    public get target() {
        return this.get('target');
    }

    public get diagramId() {
        return this.get('diagramId');
    }

    public clone() {
        return this.set('id', MathHelper.guid());
    }

    public update(data: UpdatedProps) {
        this.set('title', data.title);
        this.set('description', data.description);
    }
}