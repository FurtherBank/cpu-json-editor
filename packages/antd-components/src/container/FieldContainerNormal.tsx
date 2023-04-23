import { useMenuActionComponents } from '@cpu-json-editor/core/dist/esm/components/hooks/useMenuActionComponents';
import { ContainerProps } from '@cpu-json-editor/core/dist/esm/components/type/props';
import { getFormatType } from '@cpu-json-editor/core/dist/esm/definition/formats';
import {
  concatAccess,
  getFieldDomId,
  jsonDataType,
} from '@cpu-json-editor/core/dist/esm/utils';
import { Card, Collapse, Space } from 'antd';
import React from 'react';
import { maxCollapseLayer } from '../config';

const { Panel } = Collapse;

const stopBubble = (e: React.SyntheticEvent) => {
  e.stopPropagation();
};

export const FieldContainerNormal = (props: ContainerProps) => {
  const {
    data,
    route,
    field,
    titleComponent,
    valueComponent,
    rootMenuItems = [],
    fieldInfo,
    viewport,
  } = props;
  const { mergedValueSchema } = fieldInfo;

  const dataType = jsonDataType(data);
  const access = concatAccess(route, field);

  const [operationComponents, menuActionComponents] =
    useMenuActionComponents(props);

  const { format } = mergedValueSchema || {};
  const formatType = getFormatType(format);

  const dataIsObject = dataType === 'object' || dataType === 'array';
  const canCollapse = dataIsObject && access.length > 0;
  const editionIsMultiline = dataIsObject || formatType === 2;

  const extraComponents = operationComponents
    .concat(rootMenuItems)
    .concat(menuActionComponents);

  return canCollapse ? (
    <Collapse
      defaultActiveKey={
        access.length < maxCollapseLayer ? ['theoneandtheonly'] : undefined
      }
      className="cpu-field"
    >
      <Panel
        key="theoneandtheonly"
        header={titleComponent}
        extra={<Space onClick={stopBubble}>{extraComponents}</Space>}
        id={getFieldDomId(viewport, access)}
      >
        {valueComponent}
      </Panel>
    </Collapse>
  ) : (
    <Card
      title={titleComponent}
      size="small"
      extra={
        <Space>
          {!editionIsMultiline ? valueComponent : null}
          {extraComponents}
        </Space>
      }
      bodyStyle={!editionIsMultiline ? { display: 'none' } : {}}
      id={getFieldDomId(viewport, access)}
      className="cpu-field"
    >
      {editionIsMultiline ? valueComponent : null}
    </Card>
  );
};
