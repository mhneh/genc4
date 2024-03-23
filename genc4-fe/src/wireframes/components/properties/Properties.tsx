/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import {Collapse} from 'antd';
import {CollapseProps} from 'antd/lib';
import classNames from 'classnames';
import {texts} from '@app/texts';
import {getDiagram, getSelection, useStore} from '@app/wireframes/model';
import {Colors} from './colors/Colors.tsx';
import {CustomProperties} from './custom/CustomProperties.tsx';
import {DiagramProperties} from './diagram/DiagramProperties.tsx';
import {LayoutProperties} from './layout/LayoutProperties.tsx';
import {MoreProperties} from './more/MoreProperties.tsx';
import {TransformProperties} from './transform/TransformProperties.tsx';
import {VisualProperties} from './visual/VisualProperties.tsx';
import {C4Properties} from "@app/wireframes/components/properties/c4/C4Properties.tsx";

const layoutItems: CollapseProps['items'] = [
    {
        key: 'layout',
        label: texts.common.layout,
        children: (
            <>
                <LayoutProperties/>

                <TransformProperties/>
            </>
        ),
    },
    {
        key: 'visual',
        label: texts.common.visual,
        children: <VisualProperties/>,
    },
    {
        key: 'more',
        label: texts.common.more,
        children: <MoreProperties/>,
    },
    {
        key: 'custom',
        label: texts.common.custom,
        children: <CustomProperties/>,
    },
];

const diagramItems: CollapseProps['items'] = [
    {
        key: 'diagram',
        label: texts.common.diagram,
        children: <DiagramProperties/>,
    },
    {
        key: 'colors',
        label: texts.common.colors,
        children: <Colors/>,
    },
];

const c4Items: CollapseProps['items'] = [
    {
        key: 'c4',
        label: texts.common.properties,
        children: <C4Properties/>,
    },
    {
        key: 'layout',
        label: texts.common.layout,
        children: (
            <>
                <LayoutProperties/>

                <TransformProperties/>
            </>
        ),
    },
    {
        key: 'visual',
        label: texts.common.visual,
        children: <VisualProperties/>,
    },
];

export const Properties = () => {
    const hasSelection = useStore(getSelection).selectedItems.length > 0;
    const hasDiagram = !!useStore(getDiagram);
    const selectionSet = useStore(getSelection);
    const selectedItem = selectionSet.selectedItems.length > 0
        ? selectionSet.selectedItems.at(0)
        : null;
    if (selectedItem && selectedItem.type === 'Components') {
        return <Collapse
            className={(classNames({hidden: !hasSelection}))}
            items={c4Items}
            bordered={false}
            defaultActiveKey={['c4', 'layout', 'visual']}
            activeKey={['c4', 'layout', 'visual']}
        />
    }

    return (
        <>
            <Collapse
                className={(classNames({hidden: !hasSelection}))}
                items={layoutItems}
                bordered={false}
                defaultActiveKey={['layout', 'visual', 'more', 'custom']}
                activeKey={['layout', 'visual', 'more', 'custom']}
            />

            <Collapse
                className={(classNames({hidden: hasSelection || !hasDiagram}))}
                items={diagramItems}
                bordered={false}
                defaultActiveKey={['diagram', 'colors']}
                activeKey={['diagram', 'colors']}
            />
        </>
    );
};