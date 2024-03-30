import {ActionReducerMapBuilder, createAction} from "@reduxjs/toolkit";
import {Diagram, EditorState} from "@app/wireframes/model";
import {Relationship} from "@app/wireframes/model/relationship/relationship.ts";

export const addRelationship = createAction('relationship/add',
    (diagramId: string, props: {
        id?: string,
        title?: string,
        description?: string,
        target?: string,
        source?: string,
    } = {}) => {
        return {
            payload: {
                id: props.id,
                diagramId: diagramId,
                title: props.title,
                description: props.description,
                target: props.target,
                source: props.source,
            }
        }
    })

export const removeRelationship = createAction(
    'relationship/remove',
    (digramId: string, target: string, source: string) => {
        return {
            payload: {
                diagramId: digramId,
                source: source,
                target: target,
            }
        }
    }
)

export function buildRelationships(builder: ActionReducerMapBuilder<EditorState>) {
    return builder
        .addCase(addRelationship, (state, action) => {
            const {
                diagramId,
                target,
                source,
            } = action.payload;
            return state.updateDiagram(diagramId, (diagram: Diagram) => {
                const newRelationship = {
                    diagramId: diagramId,
                    source: source,
                    target: target
                } as Relationship;
                return diagram.addRelationship(newRelationship);
            });
        })
        .addCase(removeRelationship, (state, action) => {
            const {
                diagramId,
                source,
                target
            } = action.payload;
            return state.updateDiagram(diagramId, (diagram: Diagram) => {
                const relationship = diagram.findRelationship(source, target);
                if (!relationship) {
                    return diagram;
                }
                return diagram.removeRelationship(relationship.id);
            });
        });
}