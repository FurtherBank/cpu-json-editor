import { EditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { InputRef } from 'antd'
import React, { useCallback, useMemo, useRef } from 'react'
import { CInputNumber } from '../base/cacheInput'
import { useDefaultInputKeyJump } from '../hooks/useDefaultInputKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

export const NumberEdition = (props: EditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id }
  } = props

  const handleValueChange = useCallback(
    (value: number) => {
      ctx.executeAction('change', { schemaEntry, route, field, value })
    },
    [ctx]
  )

  const handleKeyDown = useDefaultInputKeyJump(ctx, id, { supportedKeys: ['ArrowLeft', 'ArrowRight'] })

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
    <CInputNumber
      ref={ref}
      size="small"
      key="value"
      value={data as number}
      validate
      onValueChange={handleValueChange}
      onKeyDown={handleKeyDown}
      style={{ flex: 1 }}
      data-cpu-editor-focusable-role="edition"
    />
  )
}
