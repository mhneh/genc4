import {getDiagramId, getSelection, useStore} from "@app/wireframes/model";
import {Col, Row} from "antd";
import {texts} from "@app/texts";
import {Text} from "@app/wireframes/components/properties/common/Text.tsx";
import {DefaultAppearance} from "@app/wireframes/interface";
import {useAppearance} from "@app/wireframes/components/actions";

export const C4Properties = () => {
    const selectedDiagramId = useStore(getDiagramId);
    const selectionSet = useStore(getSelection);

    const [title, setTitle] = useAppearance<string | undefined>(
        selectedDiagramId, selectionSet, DefaultAppearance.TITLE, true, true);
    const [desc, setDesc] = useAppearance<string | undefined>(
        selectedDiagramId, selectionSet, DefaultAppearance.DESC, true, true);
    const [tech, setTech] = useAppearance<string | undefined>(
        selectedDiagramId, selectionSet, DefaultAppearance.TECH, true, true);

    return (
        <>
            <div style={{display: (selectionSet.selectedItems.length > 0 ? 'block' : 'none')}}>
                <div className='property-subsection visual-properties'>
                    <Row className='property'>
                        <Col span={12} className='property-label'>{texts.common.title}</Col>
                        <Col span={12} className='property-value'>
                            <Text
                                text={title.value}
                                selection={selectionSet.selectedItems}
                                onTextChange={setTitle}
                            />
                        </Col>
                    </Row>

                    <Row className='property'>
                        <Col span={12} className='property-label'>{texts.common.desc}</Col>
                        <Col span={12} className='property-value'>
                            <Text
                                text={desc.value}
                                selection={selectionSet.selectedItems}
                                onTextChange={setDesc}
                            />
                        </Col>
                    </Row>

                    <Row className='property'>
                        <Col span={12} className='property-label'>{texts.common.tech}</Col>
                        <Col span={12} className='property-value'>
                            <Text
                                text={tech.value}
                                selection={selectionSet.selectedItems}
                                onTextChange={setTech}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}