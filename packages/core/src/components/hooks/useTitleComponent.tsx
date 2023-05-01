import React, { useRef } from 'react'
import CpuEditorContext from '../../context'
import { FieldProps, IField } from '../../Field'

export const useTitleComponent = (ctx: CpuEditorContext, fieldProps: FieldProps, fieldInfo: IField) => {
  const { mergedEntrySchema } = fieldInfo

  const { view: { type: schemaEntryViewType = null } = {} } = mergedEntrySchema || {}

  const ref = useRef()
  // 设置标题组件
  const TitleComponent = ctx.getComponent(schemaEntryViewType, ['title'])

  return [
    <TitleComponent fieldProps={fieldProps} ctx={ctx} fieldInfo={fieldInfo} key={'title'} ref={ref} />,
    ref
  ] as const
}
