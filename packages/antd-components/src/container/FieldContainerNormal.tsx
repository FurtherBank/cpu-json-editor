import { useContainer } from '@cpu-json-editor/core/dist/esm/components/hooks/useContainer'
import { useMenuActionComponents } from '@cpu-json-editor/core/dist/esm/components/hooks/useMenuActionComponents'
import { ContainerProps } from '@cpu-json-editor/core/dist/esm/components/type/props'
import { getFormatType } from '@cpu-json-editor/core/dist/esm/definition/formats'
import { canFieldRename } from '@cpu-json-editor/core/dist/esm/definition/schema'
import { concatAccess } from '@cpu-json-editor/core/dist/esm/utils'
import { Card, Collapse, Space } from 'antd'
import React, { useEffect } from 'react'
import { maxCollapseLayer } from '../config'

const { Panel } = Collapse

const stopBubble = (e: React.SyntheticEvent) => {
  e.stopPropagation()
}

export const FieldContainerNormal = (props: ContainerProps) => {
  const { ctx, fieldProps, fieldInfo } = props
  const { route, field, rootMenuItems = [], canNotRename } = fieldProps

  const access = concatAccess(route, field)

  const [operationComponents, menuActionComponents] = useMenuActionComponents(props)

  const extraComponents = operationComponents.concat(rootMenuItems).concat(menuActionComponents)

  const {
    titleElement,
    editionElement,
    editionInfo: { valueType, format },
    model,
    id
  } = useContainer(ctx, fieldProps, fieldInfo)

  const dataIsObject = valueType === 'object' || valueType === 'array'
  const formatType = getFormatType(format)
  const editionIsMultiline = valueType || formatType === 2

  const canCollapse = dataIsObject && access.length > 0

  const fieldNameRange = canFieldRename(fieldProps, fieldInfo)
  const canRename = !canNotRename && (fieldNameRange === '' || fieldNameRange instanceof RegExp)

  useEffect(() => {
    const keyJump = (key: string, fromId: string, fromRole: 'title' | 'edition') => {
      let focusRoleName: 'title' | 'edition' | undefined = undefined
      if (id === fromId) {
        if (!editionIsMultiline && (key === 'ArrowUp' || key === 'ArrowDown')) {
          // 非超长组件，按↑或↓，直接向上层 model 透传
          const parentModel = ctx.interaction.componentModelMap.get(fromId)
          if (parentModel) parentModel.keyJump(key, fromId, fromRole)
        } else {
          // 其它情况，在可聚焦 role 列表前后调整
          const focusableRoles = ['title', 'edition']
          let nowRuleIndex = focusableRoles.indexOf(fromRole)
          nowRuleIndex += key === 'ArrowLeft' || key === 'ArrowUp' ? -1 : 1
          if (nowRuleIndex < 0 || nowRuleIndex >= focusableRoles.length) {
            const parentModel = ctx.interaction.componentModelMap.get(fromId)
            if (parentModel) parentModel.keyJump(key, fromId, fromRole)
            return
          } else {
          }
        }
      } else if (fromId.startsWith(id + '/')) {
        // 来自下层告知，丢给 edition
        focusRoleName = 'edition'
      } else {
        // 认为是直接进入该组件，不考虑来源字段和角色，只通过按键决定
        focusRoleName = key === 'ArrowRight' ? 'title' : key === 'ArrowLeft' ? 'edition' : fromRole
      }
      // 在这之前没有 return，即触发该 model 聚焦/透传到列表
      if (!canRename) focusRoleName = 'edition'
      const roleRefName = (focusRoleName + 'Ref') as 'titleRef' | 'editionRef'
      const ref = model[roleRefName].current
      if (typeof ref === 'object' && ref !== null) {
        if (typeof ref.keyJump === 'function') {
          // 对象或数组类型的 edition 具有 keyjump 函数，交给它处理
          ref.keyJump(key, fromId, fromRole)
        } else if (typeof ref.focus === 'function') {
          // 其它类型的 edition 直接 focus
          ref.focus()
        }
      }
    }

    model.on('keyJump', keyJump)

    return () => {
      model.removeListener('keyJump', keyJump)
    }
  }, [editionIsMultiline, canRename, model, ctx])

  return canCollapse ? (
    <Collapse
      defaultActiveKey={access.length < maxCollapseLayer ? ['theoneandtheonly'] : undefined}
      className="cpu-field"
    >
      <Panel
        key="theoneandtheonly"
        header={titleElement}
        extra={<Space onClick={stopBubble}>{extraComponents}</Space>}
        id={id}
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
      className="cpu-field"
    >
      {editionIsMultiline ? editionElement : null}
    </Card>
  )
}
