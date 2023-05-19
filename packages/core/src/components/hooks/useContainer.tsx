import React, { useEffect, useMemo } from 'react'
import CpuEditorContext from '../../context'
import { canFieldRename } from '../../definition/schema'
import { FieldProps, IField } from '../../Field'
import { concatAccess, getFieldDomId, jsonDataType } from '../../utils'
import { ComponentModel } from '../ComponentModel'

/**
 * [业务] 将 componentModel 挂载到 ctx.interaction
 * @param ctx
 * @param route
 * @param field
 * @param viewport
 * @param model
 * @returns
 */
export const useContainer = (ctx: CpuEditorContext, fieldProps: FieldProps, fieldInfo: IField) => {
  const { data, viewport, route, field } = fieldProps
  const { mergedValueSchema, mergedEntrySchema } = fieldInfo
  const {
    const: constValue,
    enum: enumValue,
    view: { type: valueEntryViewType = undefined } = {}
  } = mergedValueSchema || {}

  const dataType = jsonDataType(data)
  const valueType = constValue !== undefined ? 'const' : enumValue !== undefined ? 'enum' : dataType

  const id = getFieldDomId(viewport, concatAccess(route, field))
  const { format } = mergedValueSchema || {}

  const { view: { type: schemaEntryViewType = null } = {} } = mergedEntrySchema || {}
  const fieldNameRange = canFieldRename(ctx, fieldProps, fieldInfo)

  // 1. 设置标题组件
  const TitleComponent = ctx.getComponent(schemaEntryViewType, ['title'])

  // 2. 设置值组件
  const EditionComponent =
    valueType === 'string' && format
      ? ctx.getFormatComponent(valueEntryViewType, format)
      : ctx.getComponent(valueEntryViewType, ['edition', valueType])

  const editionInfo = {
    valueType,
    viewType: valueEntryViewType,
    format
  } as const

  const model = useMemo(() => new ComponentModel(), [])

  useEffect(() => {
    ctx.interaction.componentModelMap.set(id, model)
    return () => {
      ctx.interaction.componentModelMap.delete(id)
    }
  }, [ctx])

  return {
    titleElement: (
      <TitleComponent
        fieldNameRange={fieldNameRange}
        fieldProps={fieldProps}
        ctx={ctx}
        fieldInfo={fieldInfo}
        key={'title'}
        model={model}
      />
    ),
    editionElement: (
      <EditionComponent fieldProps={fieldProps} ctx={ctx} fieldInfo={fieldInfo} key={'edition'} model={model} />
    ),
    editionInfo,
    model,
    fieldNameRange,
    id
  }
}
