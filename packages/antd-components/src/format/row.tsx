import { EditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { InputRef } from 'antd'
import React, { useCallback, useMemo, useRef } from 'react'
import { CInput } from '../base/cacheInput'
import { useDefaultInputKeyJump } from '../hooks/useDefaultInputKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

export const RowEdition = (props: EditionProps) => {
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
      ref={ref}
      size="small"
      key="value"
      value={data}
      onValueChange={handleValueChange}
      validate={true}
      onPressEnter={(e: any) => {
        e.currentTarget.blur()
      }}
      onKeyDown={handleKeyDown}
      style={{ flex: 1, minWidth: '400px' }}
      data-cpu-editor-focusable-role="edition"
    />
  )
}
