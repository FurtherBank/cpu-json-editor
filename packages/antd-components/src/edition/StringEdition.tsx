import { EditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import React, { forwardRef, SyntheticEvent, useCallback } from 'react'
import { CInput } from '../base/cacheInput'

const allUsedProps = {
  size: 'small',
  key: 'value',
  validate: true
}

export const StringEdition = forwardRef((props: EditionProps, ref) => {
  const {
    ctx,
    fieldProps: { route, field, data, schemaEntry }
  } = props

  const handleValueChange = useCallback(
    (value: string) => {
      if (value !== undefined) ctx.executeAction('change', { schemaEntry, route, field, value })
    },
    [route, field, ctx]
  )

  return (
    <CInput
      {...allUsedProps}
      style={{ flex: 1 }}
      value={data}
      onValueChange={handleValueChange}
      onPressEnter={(e: any) => {
        e.currentTarget.blur()
      }}
      ref={ref}
      onKeyDown={(event: SyntheticEvent<HTMLInputElement, KeyboardEvent>) => {
        const input = event.target as HTMLInputElement

        if (input.selectionStart === 0 && input.selectionEnd === 0) {
          // 左方向键，且光标在最左侧
          if (event.nativeEvent.key === 'ArrowLeft') {
            console.log('左侧')
          }
        } else if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
          // 右方向键，且光标在最右侧
          if (event.nativeEvent.key === 'ArrowRight') {
            console.log('左侧')
          }
        }
      }}
    />
  )
})
