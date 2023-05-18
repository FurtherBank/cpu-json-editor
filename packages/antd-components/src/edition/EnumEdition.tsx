import { EditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { toConstName } from '@cpu-json-editor/core/dist/esm/definition'
import { Input, RefSelectProps, Select } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { useCallback, useMemo, useRef } from 'react'
import { useDefaultBtnKeyJump } from '../hooks/useDefaultBtnKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'

export const EnumEdition = (props: EditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id, mergedValueSchema }
  } = props
  const { enum: enumValue = [] } = mergedValueSchema || {}

  const handleValueChange = useCallback(
    (key: string) => {
      const i = parseInt(key)
      const value = enumValue[i]

      if (value !== undefined) ctx.executeAction('change', { schemaEntry, route, field, value })
    },
    [ctx]
  )

  const enumIndex = enumValue.findIndex((v) => isEqual(v, data))

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
  useRoleModelAttach(model, content, 'edition')

  return (
    <Input.Group compact style={{ display: 'flex', flex: 1 }}>
      <Select
        key="enum"
        size="small"
        options={enumValue.map((value: any, i: number) => {
          return {
            value: i,
            label: toConstName(value)
          }
        })}
        className="resolve-flex"
        style={{ flex: 1 }}
        onChange={handleValueChange}
        onKeyDown={handleKeyDown}
        value={enumIndex === -1 ? '' : toConstName(enumValue[enumIndex])}
        allowClear={false}
        data-cpu-editor-focusable-role="edition"
        ref={ref}
      />
    </Input.Group>
  )
}
