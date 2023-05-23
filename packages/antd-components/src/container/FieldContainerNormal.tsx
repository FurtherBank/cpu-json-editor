import {
  concatAccess,
  ContainerProps,
  getFormatType,
  useContainer,
  useMenuActionComponents
} from '@cpu-json-editor/core'
import { Card, Collapse, Space } from 'antd'
import React from 'react'
import { maxCollapseLayer } from '../config'
import { useContainerKeyJump } from '../hooks/useContainerKeyJump'

const { Panel } = Collapse

const stopBubble = (e: React.SyntheticEvent) => {
  e.stopPropagation()
}

export const FieldContainerNormal = (props: ContainerProps) => {
  const { ctx, fieldProps, fieldInfo } = props
  const { route, field, rootMenuItems = [] } = fieldProps

  const access = concatAccess(route, field)

  const {
    titleElement,
    editionElement,
    editionInfo: { valueType, format },
    model,
    id
  } = useContainer(ctx, fieldProps, fieldInfo)

  const [operationComponents, menuActionComponents] = useMenuActionComponents(props, model)

  const extraComponents = operationComponents.concat(rootMenuItems).concat(menuActionComponents)

  const dataIsObject = valueType === 'object' || valueType === 'array'
  const formatType = getFormatType(format)
  const editionIsMultiline = dataIsObject || formatType === 2

  const canCollapse = editionIsMultiline && access.length > 0

  useContainerKeyJump(ctx, model, id)

  return canCollapse ? (
    <Collapse defaultActiveKey={access.length < maxCollapseLayer ? ['theoneandtheonly'] : undefined}>
      <Panel
        key="theoneandtheonly"
        header={titleElement}
        extra={<Space onClick={stopBubble}>{extraComponents}</Space>}
        id={id}
        data-cpu-editor-field-id={id}
      >
        {editionElement}
      </Panel>
    </Collapse>
  ) : (
    <Card
      title={titleElement}
      size="small"
      extra={
        <Space>
          {!editionIsMultiline ? editionElement : null}
          {extraComponents}
        </Space>
      }
      bodyStyle={!editionIsMultiline ? { display: 'none' } : {}}
      id={id}
      data-cpu-editor-field-id={id}
    >
      {editionIsMultiline ? editionElement : null}
    </Card>
  )
}
