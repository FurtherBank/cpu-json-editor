import { EllipsisOutlined } from '@ant-design/icons'
import { useContainer } from '@cpu-json-editor/core/dist/esm/components/hooks/useContainer'
import { ContainerProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { Button, Dropdown, Input } from 'antd'
import React from 'react'
import { useContainerKeyJump } from '../hooks/useContainerKeyJump'
import { useDefaultBtnKeyJump } from '../hooks/useDefaultBtnKeyJump'

export const FieldContainerShort = (props: ContainerProps) => {
  const { fieldProps, availableMenuActions, menuActionHandlers, fieldInfo, ctx } = props

  const {
    titleElement,
    editionElement,
    editionInfo: { valueType },
    model,
    id
  } = useContainer(ctx, fieldProps, fieldInfo)

  useContainerKeyJump(ctx, model, id)

  const menuAction = (e: { key: string }) => {
    const key = e.key as keyof typeof menuActionHandlers
    if (menuActionHandlers[key]) menuActionHandlers[key]()
  }

  const items = availableMenuActions.map((a) => ({
    key: a,
    label: a
  }))

  const compact = valueType !== 'boolean'

  // const onTabMenuFocus = useCallback((e: SyntheticEvent<HTMLElement, FocusEvent>) => {
  //   e.currentTarget.click()
  // }, [])
  const handleKeyDown = useDefaultBtnKeyJump(ctx, id, { supportedKeys: ['ArrowLeft', 'ArrowRight'] })

  return (
    <div style={{ display: 'flex' }} id={id} data-cpu-editor-field-id={id}>
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
          <Dropdown menu={{ items, onClick: menuAction }} placement="bottomRight" key="actions" trigger={['click']}>
            <Button
              icon={<EllipsisOutlined />}
              size="small"
              shape="circle"
              // onFocus={onTabMenuFocus}
              onKeyDown={handleKeyDown}
            />
          </Dropdown>
        ) : null}
      </Input.Group>
    </div>
  )
}
