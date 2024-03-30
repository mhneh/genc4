import {PureComponent} from "react";
import {
    InteractionHandler,
    InteractionService,
    SvgEvent
} from "@app/wireframes/renderer/interaction/interaction-service.ts";
import svg from "@svgdotjs/svg.js";
import {Diagram, DiagramItem, DiagramItemSet, SnapManager, SnapMode, Transform} from "@app/wireframes/model";
import {OverlayManager} from "@app/wireframes/contexts/OverlayContext.tsx";
import {Rotation, Subscription, SVGHelper, Timer, Vec2} from "@app/core";
import {PreviewEvent} from "@app/wireframes/renderer/common/preview.ts";
import {SVGRenderer2} from "@app/wireframes/shapes/utils/svg/svg-renderer2.ts";
import {TransformAdornerProps} from "@app/wireframes/renderer/adorner/transform/TransformAdorner.tsx";

export interface RelationshipAdornerProps {
    adorners: svg.Container;

    // The selected diagram.
    selectedDiagram: Diagram;

    // The selected items.
    selectionSet: DiagramItemSet;

    // The interaction service.
    interactionService: InteractionService;

    // The snap manager.
    snapManager: SnapManager;

    // The overlay manager.
    overlayManager: OverlayManager;

    // The preview subscription.
    previewStream: Subscription<PreviewEvent>;

    onConnectItems: (diagramId: string, source: string, target: string) => any;
}

export class RelationshipAdorner extends PureComponent<RelationshipAdornerProps> implements InteractionHandler {

    constructor(props: RelationshipAdornerProps) {
        super(props);

        this.props.interactionService.addHandler(this);
    }

    public componentWillUnmount() {
        this.props.interactionService.removeHandler(this);
    }

    public componentDidUpdate(prevProps: RelationshipAdornerProps) {

    }

    private hasSelection(): boolean {
        return this.props.selectionSet.selectedItems.length > 0;
    }

    public onKeyDown(event: KeyboardEvent, next: (event: KeyboardEvent) => void) {

    }

    public onKeyUp(event: KeyboardEvent, next: (event: KeyboardEvent) => void) {

    }

    public onMouseDown(event: SvgEvent, next: (event: SvgEvent) => void) {

    }

    public onMouseDrag(event: SvgEvent, next: (event: SvgEvent) => void) {

    }

    public onMouseUp(event: SvgEvent, next: (event: SvgEvent) => void) {

    }

    public onBlur(event: FocusEvent, next: (event: FocusEvent) => void) {

    }

    public render(): any {
        return null;
    }
}