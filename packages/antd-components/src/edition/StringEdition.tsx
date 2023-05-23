import { EditionProps } from '@cpu-json-editor/core'
import { InputRef } from 'antd'
import React, { useCallback, useMemo, useRef } from 'react'
import { CInput } from '../base/cacheInput'
import { useDefaultInputKeyJump } from '../hooks/useDefaultInputKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

const allUsedProps = {
  size: 'small',
  key: 'value',
  validate: true
}

export const StringEdition = (props: EditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id }
  } = props

  const handleValueChange = useCallback(
    (value: string) => {
      if (value !== undefined) ctx.executeAction('change', { schemaEntry, route, field, value })
    },
    [schemaEntry, route, field, ctx]
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
      {...allUsedProps}
      style={{ flex: 1 }}
      value={data}
      onValueChange={handleValueChange}
      ref={ref}
      onKeyDown={handleKeyDown}
      data-cpu-editor-focusable-role="edition"
    />
  )
}
