import React, { useCallback } from 'react'
import { CpuEditorContext } from '../../context/CpuEditorContext'
import { ShortLevel } from '../../definition/definitions'
import { IField } from '../../Field'
import { getFieldSchema } from '../../utils/schemaWithRef'
import { FatherInfo } from '../type/list'

/**
 * [业务]返回一个函数，传入 key 和 shortLevel 可以取得 subField 的 Field 组件
 * @param ctx
 * @param data
 * @param access
 * @param fieldInfo
 * @param fatherInfo
 * @param viewport
 * @returns
 */
export const useSubFieldQuery = (
  ctx: CpuEditorContext,
  data: Record<string, any> | any[],
  access: string[],
  fieldInfo: IField,
  fatherInfo: FatherInfo,
  viewport: string
) => {
  const { mergedValueSchema, valueEntry } = fieldInfo
  return useCallback(
    (key: string, short: ShortLevel) => {
      const subEntry = getFieldSchema(data, valueEntry, mergedValueSchema, key) || undefined
      const Field = ctx.Field
      return (
        <Field
          key={'property-' + key}
          viewport={viewport}
          route={access}
          field={key}
          fatherInfo={fatherInfo}
          schemaEntry={subEntry}
          short={short}
        />
      )
    },
    [data, access, valueEntry, fieldInfo, fatherInfo, ctx]
  )
}
