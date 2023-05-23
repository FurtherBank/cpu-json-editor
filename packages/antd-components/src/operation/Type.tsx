import { ComponentModel, CpuEditorContext } from '@cpu-json-editor/core'
import { RefSelectProps, Select } from 'antd'
import React, { useMemo, useRef } from 'react'
import { useDefaultBtnKeyJump } from '../hooks/useDefaultBtnKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

interface TypeOperationProps {
  opHandler: (value: string) => void
  opValue: string
  opParam: string[]
  ctx: CpuEditorContext
  id: string
  model: ComponentModel
}

export const TypeOperation = (props: TypeOperationProps) => {
  const { opHandler, opValue, opParam, ctx, model, id } = props

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
  useRoleModelAttach(model, content, 'type')

  return (
    <Select
      key="type"
      size="small"
      options={opParam.map((value: string) => {
        return { value: value, label: value }
      })}
      onChange={opHandler}
      value={opValue}
      allowClear={false}
      style={{ width: '80px' }}
      ref={ref}
      onKeyDown={handleKeyDown}
      data-cpu-editor-focusable-role="type"
    />
  )
}
