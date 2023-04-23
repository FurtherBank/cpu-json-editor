import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  RedoOutlined,
  RetweetOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { MenuActionProps } from '@cpu-json-editor/core/dist/esm/components/type/props';
import { Button } from 'antd';
import React from 'react';

const actionIcon = {
  reset: <RetweetOutlined />,
  moveup: <ArrowUpOutlined />,
  movedown: <ArrowDownOutlined />,
  delete: <DeleteOutlined />,
  undo: <UndoOutlined />,
  redo: <RedoOutlined />,
  detail: null,
};

export const OperationButton = (props: MenuActionProps) => {
  const { opType, opHandler } = props;
  return (
    <Button
      key={opType}
      icon={actionIcon[opType]}
      size="small"
      shape="circle"
      onClick={opHandler}
      title={opType}
    />
  );
};
