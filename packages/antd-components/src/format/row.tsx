import { FormatEditionProps } from '@cpu-json-editor/core'
import { InputRef } from 'antd'
import React, { useCallback, useMemo, useRef } from 'react'
import { CInput } from '../base/cacheInput'
import { useDefaultInputKeyJump } from '../hooks/useDefaultInputKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

export const RowEdition = (props: FormatEditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id }
  } = props

  const handleValueChange = useCallback(
    (value: any) => {
      if (value !== undefined) ctx.executeAction('change', { route, field, value, schemaEntry })
    },
    [ctx]
  )

  const handleKeyDown = useDefaultInputKeyJump(ctx, id)

  // 挂载 roleModel
  const ref = useRef<InputRef>(null)
  const content = useMemo(
    () => ({
      keyJumpFocus: () => {
        if (ref.current) {
          ref.current.select()
        }
      }
    }),
    []
  )
  useRoleModelAttach(model, content, 'edition')

  return (
    <CInput
      size="small"
      key="value"
      value={data}
      onValueChange={handleValueChange}
      validate={true}
      style={{ flex: 1, minWidth: '400px' }}
      onKeyDown={handleKeyDown}
      ref={ref}
      data-cpu-editor-focusable-role="edition"
    />
  )
}
