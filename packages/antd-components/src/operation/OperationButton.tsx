import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  RedoOutlined,
  RetweetOutlined,
  UndoOutlined
} from '@ant-design/icons'
import { MenuActionProps } from '@cpu-json-editor/core'
import { Button } from 'antd'
import React, { useMemo, useRef } from 'react'
import { useDefaultBtnKeyJump } from '../hooks/useDefaultBtnKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

const actionIcon = {
  reset: <RetweetOutlined />,
  moveup: <ArrowUpOutlined />,
  movedown: <ArrowDownOutlined />,
  delete: <DeleteOutlined />,
  undo: <UndoOutlined />,
  redo: <RedoOutlined />,
  detail: null
}

export const OperationButton = (props: MenuActionProps) => {
  const { opType, opHandler, ctx, id, model } = props

  const handleKeyDown = useDefaultBtnKeyJump(ctx, id)

  // 挂载 roleModel
  const ref = useRef<HTMLElement>(null)
  const content = useMemo(
    () => ({
      keyJumpFocus: () => {
        if (ref.current) {
          ref.current.focus()
        }
      }
    }),
    []
  )
  useRoleModelAttach(model, content, opType)

  return (
    <Button
      key={opType}
      icon={actionIcon[opType]}
      size="small"
      shape="circle"
      onClick={opHandler}
      title={opType}
      ref={ref}
      onKeyDown={handleKeyDown}
      data-cpu-editor-focusable-role={opType}
    />
  )
}
