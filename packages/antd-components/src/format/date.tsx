import { FormatEditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import React, { useCallback, useMemo, useRef } from 'react'
import { useDefaultBtnKeyJump } from '../hooks/useDefaultBtnKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

export const DateEdition = (props: FormatEditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id }
  } = props

  const dateValue = useMemo(() => {
    return moment(data)
  }, [data])

  const handleValueChange = useCallback(
    (value: Moment | null, dateString: string) => {
      if (value !== undefined)
        ctx.executeAction('change', {
          route,
          field,
          value: dateString,
          schemaEntry
        })
    },
    [ctx]
  )

  const handleKeyDown = useDefaultBtnKeyJump(ctx, id, { supportedKeys: ['ArrowLeft', 'ArrowRight'] })

  // 挂载 roleModel
  const ref = useRef<any>(null)

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
    <DatePicker
      size="small"
      key="value"
      value={dateValue}
      onChange={handleValueChange}
      style={{ width: '100%' }}
      allowClear={false}
      onKeyDown={handleKeyDown}
      ref={ref}
      data-cpu-editor-focusable-role="edition"
    />
  )
}
