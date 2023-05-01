import { useFatherInfo } from '@cpu-json-editor/core/dist/esm/components/hooks/useFatherInfo'
import { useObjectListContent } from '@cpu-json-editor/core/dist/esm/components/hooks/useObjectListContent'
import { EditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { concatAccess } from '@cpu-json-editor/core/dist/esm/utils'
import React, { useMemo } from 'react'
import { ListDisplayPanel } from '../base/ListDisplayPanel'
import { ConstEdition } from './ConstEdition'

const ObjectEditionPanel = (props: EditionProps) => {
  const {
    ctx,
    fieldProps: { viewport, data, route, field, schemaEntry },
    fieldInfo
  } = props
  const { valueEntry, mergedValueSchema } = fieldInfo

  console.assert(typeof data === 'object' && !(data instanceof Array))

  const access = useMemo(() => {
    return concatAccess(route, field)
  }, [route, field])

  const fatherInfo = useFatherInfo(data, schemaEntry, valueEntry, mergedValueSchema)

  const lists = useObjectListContent(ctx, data, schemaEntry, fieldInfo)

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

export const ObjectEdition = (props: EditionProps) => {
  const {
    fieldProps: { short }
  } = props
  return short ? <ConstEdition {...props} /> : <ObjectEditionPanel {...props} />
}
