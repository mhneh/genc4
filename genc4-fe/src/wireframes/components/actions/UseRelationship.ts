import {DiagramItem, getDiagramId, getRelationships, getShouldConnectedItems, useStore} from "@app/wireframes/model";
import {ImmutableMap, useEventCallback} from "@app/core";
import {useMemo} from "react";
import {UIAction} from "@app/wireframes/components/actions/shared.ts";
import {texts} from "@app/texts";
import {addRelationship, removeRelationship} from "@app/wireframes/redux/reducers/relationships.ts";
import {useAppDispatch} from "@app/wireframes/redux/store.ts";
import {Relationship} from "@app/wireframes/model/relationship/relationship.ts";

export function useRelationship() {

    const dispatch = useAppDispatch();
    const selectedDiagramId = useStore(getDiagramId);
    const shouldConnectedItems = useStore(getShouldConnectedItems);
    const relationships = useStore(getRelationships);
    const canConnect = shouldConnectedItems != null;
    const canUnconnect = isAlreadyConnected(relationships, shouldConnectedItems);

    const doConnect = useEventCallback(() => {
        if (!selectedDiagramId) {
            return;
        }
        const relationshipProps: any = {
            title: '',
            description: '',
            source: shouldConnectedItems?.source.id,
            target: shouldConnectedItems?.target.id,
        }
        dispatch(addRelationship(selectedDiagramId, relationshipProps));
    });

    const doUnconnect = useEventCallback(() => {
        if (!shouldConnectedItems) {
            return;
        }
        if (selectedDiagramId != null) {
            dispatch(removeRelationship(selectedDiagramId,
                shouldConnectedItems?.source.id,
                shouldConnectedItems?.target.id));
        }
    });

    const connect: UIAction = useMemo(() => ({
        disabled: !canConnect,
        icon: 'icon-share',
        label: texts.common.connect,
        shortcut: 'MOD + G',
        tooltip: texts.common.groupTooltip,
        onAction: doConnect,
    }), [canConnect, doConnect]);
    const unConnect: UIAction = useMemo(() => ({
        disabled: !canUnconnect,
        icon: 'icon-share_off',
        label: texts.common.disConnect,
        shortcut: 'MOD + G',
        tooltip: texts.common.groupTooltip,
        onAction: doUnconnect,
    }), [canUnconnect, doUnconnect]);
    return {connect, unConnect};
}

function isAlreadyConnected(relationships: ImmutableMap<Relationship> | undefined,
                            shouldConnectedItems: { source: DiagramItem; target: DiagramItem } | null): boolean {
    if (!relationships) {
        return false;
    }
    if (shouldConnectedItems == null) {
        return false;
    }
    const present = relationships.values
        .filter(relationship => {
            return relationship.source == shouldConnectedItems.source.id
                && relationship.target == shouldConnectedItems.target.id;
        });
    return present.length > 0;

}