import React, { useEffect, useRef } from 'react'
import CpuEditorContext from '../../context'
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

  const titleRef = useRef()
  const editionRef = useRef()

  const dataType = jsonDataType(data)
  const valueType = constValue !== undefined ? 'const' : enumValue !== undefined ? 'enum' : dataType

  const id = getFieldDomId(viewport, concatAccess(route, field))
  const { format } = mergedValueSchema || {}

  const { view: { type: schemaEntryViewType = null } = {} } = mergedEntrySchema || {}

  // 1. 设置标题组件
  const TitleComponent = ctx.getComponent(schemaEntryViewType, ['title'])

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

  const model = new ComponentModel(titleRef, editionRef)

  useEffect(() => {
    ctx.interaction.componentModelMap.set(id, model)
    return () => {
      ctx.interaction.componentModelMap.delete(id)
    }
  }, [model, field, route, ctx, viewport])

  return {
    titleElement: (
      <TitleComponent fieldProps={fieldProps} ctx={ctx} fieldInfo={fieldInfo} key={'title'} ref={titleRef} />
    ),
    titleRef,
    editionElement: (
      <EditionComponent fieldProps={fieldProps} ctx={ctx} fieldInfo={fieldInfo} key={'edition'} ref={editionRef} />
    ),
    editionRef,
    editionInfo,
    model,
    id
  }
}
