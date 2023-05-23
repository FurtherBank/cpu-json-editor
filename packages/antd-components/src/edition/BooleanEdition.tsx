import { EditionProps } from '@cpu-json-editor/core'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React, { SyntheticEvent, useCallback, useMemo, useRef } from 'react'
import { useDefaultBtnKeyJump } from '../hooks/useDefaultBtnKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

export const BooleanEdition = (props: EditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id }
  } = props

  const handleValueChange = useCallback(
    (e: CheckboxChangeEvent) => {
      ctx.executeAction('change', { schemaEntry, route, field, value: e.target.checked })
    },
    [ctx]
  )

  const keyJump = useDefaultBtnKeyJump(ctx, id)
  const handleKeyDown = useCallback(
    (event: SyntheticEvent<HTMLElement, KeyboardEvent>) => {
      if (event.nativeEvent.key === 'Enter') {
        // 按下回车切换 checked
        event.currentTarget.click()
      } else {
        keyJump(event)
      }
    },
    [keyJump]
  )

  // 挂载 roleModel
  const ref = useRef<HTMLInputElement>(null)
  const content = useMemo(
    () => ({
      keyJumpFocus: () => {
        if (ref.current) {
          ref.current.focus()
          return true
        }
        return false
      }
    }),
    []
  )
  useRoleModelAttach(model, content, 'edition')

  return (
    <Checkbox
      ref={ref}
      checked={data}
      onChange={handleValueChange}
      onKeyDown={handleKeyDown}
      data-cpu-editor-focusable-role="edition"
    />
  )
}
