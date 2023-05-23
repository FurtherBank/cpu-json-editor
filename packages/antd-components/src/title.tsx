import { CloseCircleOutlined } from '@ant-design/icons'
import { isFieldRequired, ShortLevel } from '@cpu-json-editor/core'
import { InputRef, Tooltip } from 'antd'
import React, { useMemo, useRef } from 'react'

import { CInput } from './base/cacheInput'

import { TitleProps } from '@cpu-json-editor/core'
import './css/title.less'
import { useDefaultInputKeyJump } from './hooks/useDefaultInputKeyJump'
import { useRoleModelAttach } from './hooks/useRoleModelAttach'

const stopBubble = (e: React.SyntheticEvent) => {
  e.stopPropagation()
}

export const FieldTitle = (props: TitleProps) => {
  const { fieldProps, ctx, fieldInfo, fieldNameRange, model } = props
  const { route, field, short, canNotRename, fatherInfo } = fieldProps
  const { errors, mergedEntrySchema, id } = fieldInfo
  const { schemaEntry: parentSchemaEntry } = fatherInfo ?? {}
  const { description } = mergedEntrySchema || {}

  const titleName = fieldNameRange === '' || fieldNameRange instanceof RegExp ? field : fieldNameRange

  const isRequired = isFieldRequired(field, fatherInfo)

  const editable = !canNotRename && (fieldNameRange === '' || fieldNameRange instanceof RegExp)

  const spaceStyle =
    short === ShortLevel.short
      ? {
          width: '9.5em'
        }
      : {}

  const handleKeyDown = useDefaultInputKeyJump(ctx, id)

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

  useRoleModelAttach(model, content, 'title')

  return (
    <div onClick={stopBubble} style={spaceStyle} className="flex-center">
      {errors.length > 0 ? (
        <Tooltip
          title={errors.map((error: { message: string }) => error.message).join('\n')}
          placement="topLeft"
          key="valid"
        >
          <CloseCircleOutlined
            style={{
              color: 'red',
              marginRight: '0.25em',
              display: 'inline-block'
            }}
          />
        </Tooltip>
      ) : null}

      {short !== ShortLevel.extra ? (
        <Tooltip title={description} placement="topLeft" key="name">
          {editable ? (
            <CInput
              size="small"
              bordered={false}
              className="prop-name-editable"
              title={field}
              value={field} // todo: validate the propertyName
              validate={(v) => {
                return fieldNameRange instanceof RegExp ? fieldNameRange.test(v) : true
              }}
              ref={ref}
              onValueChange={(value) => {
                ctx.executeAction('rename', {
                  route,
                  field,
                  value,
                  schemaEntry: parentSchemaEntry
                })
              }}
              onKeyDown={handleKeyDown}
              data-cpu-editor-focusable-role="title"
            />
          ) : (
            <span className="prop-name inline-text-block" title={titleName!}>
              {isRequired ? (
                <span
                  style={{
                    color: 'orange',
                    width: '0.75em',
                    display: 'inline-block'
                  }}
                >
                  *
                </span>
              ) : null}
              {titleName}
            </span>
          )}
        </Tooltip>
      ) : null}
    </div>
  )
}
