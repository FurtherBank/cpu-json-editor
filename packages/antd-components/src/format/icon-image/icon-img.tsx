import { SelectOutlined } from '@ant-design/icons'
import { FormatEditionProps } from '@cpu-json-editor/core'
import { InputRef, Tooltip } from 'antd'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { CInput } from '../../base/cacheInput'
import { useDefaultInputKeyJump } from '../../hooks/useDefaultInputKeyJump'
import { useRoleModelAttach } from '../../hooks/useRoleModelAttach'
import { useSafeCallback } from '../../hooks/useSafeCallback'

export const IconImgEdition = (props: FormatEditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { route, field, data, schemaEntry },
    fieldInfo: { id, mergedValueSchema }
  } = props

  const { resPrefix } = mergedValueSchema || {}

  const handleValueChange = useCallback(
    (value: any) => {
      if (value !== undefined) ctx.executeAction('change', { route, field, value, schemaEntry })
    },
    [ctx]
  )

  // 选择图片
  const [isSelecting, setIsSelecting] = useState(ctx.resources.select === undefined)
  const selectCb = useSafeCallback(
    (value: any) => {
      if (typeof value === 'string') {
        handleValueChange(value)
      }
      setIsSelecting(false)
    },
    [handleValueChange]
  )
  const handleSelectBtnClick = useCallback(() => {
    setIsSelecting(true)
    ctx.resources.select?.(selectCb)
  }, [ctx.resources.select, selectCb])

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
    <div style={{ display: 'flex', flex: 1 }}>
      <img
        style={{ maxWidth: '80px', maxHeight: '32px', marginRight: '4px', display: 'inline-block' }}
        src={ctx.resources.mapToSrc(resPrefix ? resPrefix + data : data)}
      />
      <CInput
        size="small"
        key="value"
        value={data}
        onValueChange={handleValueChange}
        validate={true}
        style={{ flex: 1, minWidth: '400px' }}
        suffix={
          !isSelecting ? (
            <Tooltip title="选择图片文件">
              <SelectOutlined onClick={handleSelectBtnClick} />
            </Tooltip>
          ) : null
        }
        onKeyDown={handleKeyDown}
        ref={ref}
        data-cpu-editor-focusable-role="edition"
      />
    </div>
  )
}
