import { ComponentModel, CpuEditorContext, ofSchemaCache } from '@cpu-json-editor/core'
import { RefSelectProps, TreeSelect } from 'antd'
import React, { useMemo, useRef } from 'react'
import { useDefaultBtnKeyJump } from '../hooks/useDefaultBtnKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

interface OneOfOperationProps {
  opHandler: (value: string) => void
  opValue: string
  opParam: ofSchemaCache
  ctx: CpuEditorContext
  id: string
  model: ComponentModel
}

export const OneOfOperation = (props: OneOfOperationProps) => {
  const { opHandler, opValue, opParam, ctx, id, model } = props

  const handleKeyDown = useDefaultBtnKeyJump(ctx, id, { supportedKeys: ['ArrowLeft', 'ArrowRight'] })

  // 挂载 roleModel
  const ref = useRef<RefSelectProps>(null)
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
  useRoleModelAttach(model, content, 'oneOf')

  return (
    <TreeSelect
      key="oneOf"
      size="small"
      treeData={opParam.options}
      onChange={opHandler}
      style={{ minWidth: '90px' }}
      dropdownMatchSelectWidth={180}
      value={opValue}
      allowClear={false}
      ref={ref}
      onKeyDown={handleKeyDown}
      data-cpu-editor-focusable-role="oneOf"
    />
  )
}
