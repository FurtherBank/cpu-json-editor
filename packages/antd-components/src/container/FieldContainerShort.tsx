import { EllipsisOutlined } from '@ant-design/icons'
import { useContainer } from '@cpu-json-editor/core/dist/esm/components/hooks/useContainer'
import { ContainerProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { Button, Dropdown, Input } from 'antd'
import React from 'react'

export const FieldContainerShort = (props: ContainerProps) => {
  const { fieldProps, availableMenuActions, menuActionHandlers, fieldInfo, ctx } = props

  const {
    titleElement,
    editionElement,
    editionInfo: { valueType },
    // model,
    id
  } = useContainer(ctx, fieldProps, fieldInfo)

  const menuAction = (e: { key: string }) => {
    const key = e.key as keyof typeof menuActionHandlers
    if (menuActionHandlers[key]) menuActionHandlers[key]()
  }

  const items = availableMenuActions.map((a) => ({
    key: a,
    label: a
  }))

  const compact = valueType !== 'boolean'
  return (
    <div className="cpu-field" style={{ display: 'flex' }} id={id}>
      {titleElement}
      <Input.Group
        compact={compact}
        size="small"
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {editionElement}
        {items.length !== 0 ? (
          <Dropdown menu={{ items, onClick: menuAction }} placement="bottomRight" key="actions">
            <Button icon={<EllipsisOutlined />} size="small" shape="circle" />
          </Dropdown>
        ) : null}
      </Input.Group>
    </div>
  )
}
