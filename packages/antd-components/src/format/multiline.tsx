import { FormatEditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { InputRef } from 'antd'
import React, { useCallback, useMemo, useRef } from 'react'
import { CTextArea } from '../base/cacheInput'
import { useDefaultInputKeyJump } from '../hooks/useDefaultInputKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

export const MultilineEdition = (props: FormatEditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id }
  } = props

  const handleValueChange = useCallback(
    (value: any) => {
      if (value !== undefined) ctx.executeAction('change', { schemaEntry, route, field, value })
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
          ref.current.focus()
        }
      }
    }),
    []
  )
  useRoleModelAttach(model, content, 'edition')

  return (
    <CTextArea
      size="small"
      key="value"
      value={data}
      onValueChange={handleValueChange}
      validate={true}
      style={{ flex: 1 }}
      autoSize={{ minRows: 3, maxRows: 5 }}
      onPressEnter={undefined}
      onKeyDown={handleKeyDown}
      ref={ref}
      data-cpu-editor-focusable-role="edition"
    />
  )
}
