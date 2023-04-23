import { EllipsisOutlined } from '@ant-design/icons';
import { ContainerProps } from '@cpu-json-editor/core/dist/esm/components/type/props';
import {
  concatAccess,
  getFieldDomId,
  jsonDataType,
} from '@cpu-json-editor/core/dist/esm/utils';
import { Button, Dropdown, Input } from 'antd';
import React from 'react';

export const FieldContainerShort = (props: ContainerProps) => {
  const {
    data,
    route,
    field,
    viewport,
    availableMenuActions,
    menuActionHandlers,
    titleComponent,
    valueComponent,
    fieldInfo,
  } = props;
  const { mergedValueSchema } = fieldInfo;

  // 这里单独拿出来是为防止 ts 认为是 undefined

  const dataType = jsonDataType(data);
  const access = concatAccess(route, field);
  const { const: constValue, enum: enumValue } = mergedValueSchema || {};

  const valueType =
    constValue !== undefined
      ? 'const'
      : enumValue !== undefined
      ? 'enum'
      : dataType;

  const menuAction = (e: { key: string }) => {
    const key = e.key as keyof typeof menuActionHandlers;
    if (menuActionHandlers[key]) menuActionHandlers[key]();
  };

  const items = availableMenuActions.map((a) => ({
    key: a,
    label: a,
  }));

  const compact = valueType !== 'boolean';
  return (
    <div
      className="cpu-field"
      style={{ display: 'flex' }}
      id={getFieldDomId(viewport, access)}
    >
      {titleComponent}
      <Input.Group
        compact={compact}
        size="small"
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {valueComponent}
        {items.length !== 0 ? (
          <Dropdown
            menu={{ items, onClick: menuAction }}
            placement="bottomRight"
            key="actions"
          >
            <Button icon={<EllipsisOutlined />} size="small" shape="circle" />
          </Dropdown>
        ) : null}
      </Input.Group>
    </div>
  );
};
