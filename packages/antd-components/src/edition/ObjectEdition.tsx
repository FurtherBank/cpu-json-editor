import { concatAccess, EditionProps, useFatherInfo, useObjectListContent } from '@cpu-json-editor/core'
import React, { useMemo, useRef } from 'react'
import { ListDisplayPanel } from '../base/ListDisplayPanel'
import { useListKeyJump } from '../hooks/useListKeyJump'
import { useRoleModelAttach } from '../hooks/useRoleModelAttach'
import { ConstEdition } from './ConstEdition'

const ObjectEditionPanel = (props: EditionProps) => {
  const {
    ctx,
    model,
    fieldProps: { viewport, data, route, field, schemaEntry },
    fieldInfo
  } = props
  const { valueEntry, mergedValueSchema, id } = fieldInfo

  console.assert(typeof data === 'object' && !(data instanceof Array))

  const access = useMemo(() => {
    return concatAccess(route, field)
  }, [route, field])

  const fatherInfo = useFatherInfo(data, schemaEntry, valueEntry, mergedValueSchema)

  const lists = useObjectListContent(ctx, data, schemaEntry, fieldInfo)

  const panelRef = useRef<HTMLDivElement>(null)

  // 挂载 roleModel
  const keyJumpFocus = useListKeyJump(ctx, panelRef, id, lists)
  const content = useMemo(
    () => ({
      keyJumpFocus
    }),
    [keyJumpFocus]
  )
  useRoleModelAttach(model, content, 'edition')

  return (
    <ListDisplayPanel
      ref={panelRef}
      ctx={ctx}
      viewport={viewport}
      lists={lists}
      data={data}
      fieldInfo={fieldInfo}
      fatherInfo={fatherInfo}
      access={access}
      domAttributes={{ 'data-cpu-editor-focusable-role': 'edition' }}
      id={id}
    />
  )
}

export const ObjectEdition = (props: EditionProps) => {
  const {
    fieldProps: { short }
  } = props
  return short ? <ConstEdition {...props} /> : <ObjectEditionPanel {...props} />
}
