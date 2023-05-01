import React, { useRef } from 'react'
import CpuEditorContext from '../../context'
import { FieldProps, IField } from '../../Field'
import { jsonDataType } from '../../utils'

export const useEditionComponent = (ctx: CpuEditorContext, fieldProps: FieldProps, fieldInfo: IField) => {
  const { data } = fieldProps
  const { mergedValueSchema } = fieldInfo
  const {
    const: constValue,
    enum: enumValue,
    view: { type: valueEntryViewType = undefined } = {}
  } = mergedValueSchema || {}

  const dataType = jsonDataType(data)
  const valueType = constValue !== undefined ? 'const' : enumValue !== undefined ? 'enum' : dataType

  const { format } = mergedValueSchema || {}
  const ref = useRef()

  // 设置值组件
  const EditionComponent =
    valueType === 'string' && format
      ? ctx.getFormatComponent(valueEntryViewType, format)
      : ctx.getComponent(valueEntryViewType, ['edition', valueType])

  const editionInfo = {
    valueType,
    viewType: valueEntryViewType,
    format
  } as const
  return [
    <EditionComponent fieldProps={fieldProps} ctx={ctx} fieldInfo={fieldInfo} key={'edition'} ref={ref} />,
    ref,
    editionInfo
  ] as const
}
