import { ChildData, EmptyChildData, ListDisplayPanelProps, ShortLevel, useSubFieldQuery } from '@cpu-json-editor/core'
import React, { CSSProperties, ForwardedRef, forwardRef } from 'react'
import { CreateName } from './creator'

const style: CSSProperties = {}

const shortGridStyle: CSSProperties = {
  ...style,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(24.5em, 1fr))',
  gridGap: '0 1em',
  alignItems: 'center'
}

const extraShortGridStyle: CSSProperties = {
  ...style,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(15em, 1fr))',
  gridGap: '0 1em',
  alignItems: 'center'
}

export const ListDisplayPanel = forwardRef((props: ListDisplayPanelProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { viewport, data, access, fieldInfo, fatherInfo, lists, ctx, id, domAttributes = {} } = props
  const { schemaEntry } = fatherInfo
  const { mergedValueSchema } = fieldInfo

  const getSubField = useSubFieldQuery(ctx, data, access, fieldInfo, fatherInfo, viewport)

  const renderItem = (shortLv: ShortLevel) => {
    return (item: ChildData | EmptyChildData) => {
      if (item.key !== '') {
        const { key } = item
        return getSubField(key, shortLv)
      } else {
        return (
          <CreateName
            key="end"
            data={data}
            access={access}
            mergedValueSchema={mergedValueSchema}
            ctx={ctx}
            schemaEntry={schemaEntry}
            id={id}
          />
        )
      }
    }
  }

  // const keys = Object.keys(data)
  // // todo: 排查属性的 order 关键字并写入 cache，然后在这里排个序再 map
  // const renderItems = keys.map((key: number | string) => {
  //   return <Field
  //     key={`property-${key}`}
  //     route={access}
  //     field={key.toString()}
  //     fatherInfo={fatherInfo.type ? fatherInfo : undefined}
  //     schemaEntry={getFieldSchema(fieldProps, fieldInfo, key.toString())}
  //     short={short}
  //   />
  // })
  // // 创建新属性组件
  // if (canCreate) renderItems.push(
  //   <CreateName
  //     fatherInfo={fatherInfo}
  //     fieldProps={fieldProps}
  //     fieldInfo={fieldInfo}
  //   />
  // )

  // return (
  //   <div style={{
  //     gridTemplateColumns: 'repeat(auto-fit, minmax(24.5em, 1fr))',
  //     gridGap: '0.25em 0.25em',
  //     gridAutoFlow: 'dense',
  //   }}>
  //     {renderItems}
  //   </div>
  // )
  return (
    <div ref={ref} {...domAttributes}>
      {lists.map((list, i) => {
        const { items, short } = list
        const render = renderItem(short)
        const layoutStyle =
          short === ShortLevel.extra ? extraShortGridStyle : short === ShortLevel.short ? shortGridStyle : {}
        const panelStyle = i === 0 ? layoutStyle : { marginTop: '0.25em', ...layoutStyle }
        return (
          <div key={i} className="cpu-editor-list-panel" style={panelStyle}>
            {items.map((item) => {
              return render(item)
            })}
          </div>
        )
      })}
    </div>
  )
})
