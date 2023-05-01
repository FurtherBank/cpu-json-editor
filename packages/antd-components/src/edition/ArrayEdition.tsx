import { useArrayListContent } from '@cpu-json-editor/core/dist/esm/components/hooks/useArrayListContent'
import { useFatherInfo } from '@cpu-json-editor/core/dist/esm/components/hooks/useFatherInfo'
import { EditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { concatAccess } from '@cpu-json-editor/core/dist/esm/utils'
import React, { useMemo } from 'react'
import { ListDisplayPanel } from '../base/ListDisplayPanel'
import { ConstEdition } from './ConstEdition'

const ArrayEditionPanel = (props: EditionProps) => {
  const {
    fieldProps: { viewport, data, route, field, schemaEntry },
    ctx,
    fieldInfo
  } = props
  const { valueEntry, mergedValueSchema } = fieldInfo

  console.assert(data instanceof Array)

  const access = useMemo(() => {
    return concatAccess(route, field)
  }, [route, field])

  const fatherInfo = useFatherInfo(data, schemaEntry, valueEntry, mergedValueSchema)

  const lists = useArrayListContent(ctx, data, schemaEntry, fieldInfo)

  return (
    <ListDisplayPanel
      ctx={ctx}
      viewport={viewport}
      lists={lists}
      data={data}
      fieldInfo={fieldInfo}
      fatherInfo={fatherInfo}
      access={access}
    />
  )
}

export const ArrayEdition = (props: EditionProps) => {
  const {
    fieldProps: { short }
  } = props
  return short ? <ConstEdition {...props} /> : <ArrayEditionPanel {...props} />
}
