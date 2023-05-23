import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import {
  CpuEditorContext,
  extractFieldDomId,
  getFieldDomId,
  isFocusable,
  MergedSchema,
  useArrayCreator,
  useObjectCreator
} from '@cpu-json-editor/core'
import { AutoComplete, Button, Input, InputRef, message } from 'antd'
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface CreateNameProps {
  ctx: CpuEditorContext
  access: string[]
  data: any
  schemaEntry: string | undefined
  mergedValueSchema: MergedSchema | false | undefined
  style?: React.CSSProperties
  id: string
}

export const ObjectPropCreator = (props: CreateNameProps) => {
  const { data, access, style, schemaEntry, mergedValueSchema, ctx, id } = props

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')

  const { properties } = mergedValueSchema || {}

  // todo: 考察 notInAutoFill 以及 create 是否允许
  const optionStrings = properties
    ? Object.keys(properties).filter((key) => {
        return data[key] === undefined
      })
    : []
  const autoCompleteOptions = optionStrings.map((key) => {
    return { value: key }
  })

  // name 编辑交互
  const handleClick = useCallback(() => {
    setEditing(!editing)
    setName('')
  }, [editing, setEditing, setName])

  const handleNameChange = (value: string) => {
    setName(value)
  }

  // 编辑状态变化自动 focus
  const inputRef = useRef<InputRef>(null)
  const buttonRef = useRef<HTMLElement>(null)
  useEffect(() => {
    return () => {
      // 开始时不执行，所以放在这里
      if (inputRef.current && isFocusable(inputRef.current)) {
        inputRef.current.focus()
      }
      // if (buttonRef.current && isFocusable(buttonRef.current)) {
      //   buttonRef.current.focus()
      // }
    }
  }, [editing])

  // 从 object 创建 prop 事件
  const createObjectProp = useObjectCreator(ctx, data, access, schemaEntry, mergedValueSchema)

  const handleObjectCreate = useCallback(() => {
    const actionOrError = createObjectProp(name)
    if (typeof actionOrError === 'string') {
      message.error(actionOrError)
    } else {
      setEditing(false)
    }
  }, [name, createObjectProp, setEditing])

  // 键盘跳转处理
  const createId = useMemo(() => {
    const { viewport, pathArray } = extractFieldDomId(id)
    return getFieldDomId(viewport, pathArray.concat(['']))
  }, [])
  const handleInputKeyDown = useCallback(
    (event: SyntheticEvent<HTMLInputElement, KeyboardEvent>) => {
      const supportedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
      const model = ctx.interaction.componentModelMap.get(id)
      if (!model) return
      const input = event.currentTarget
      const key = event.nativeEvent.key

      if (supportedKeys.includes(key) && model.roles['edition']) {
        if (input.selectionStart === 0 && input.selectionEnd === 0) {
          // 左方向键，且光标在最左侧
          if (['ArrowLeft', 'ArrowUp'].indexOf(key) >= 0) {
            model.roles['edition'].keyJumpFocus(key, createId, [input, input])
            event.preventDefault()
          }
        }
        if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
          // 右方向键，且光标在最右侧
          if (['ArrowRight', 'ArrowDown'].indexOf(key) >= 0) {
            model.roles['edition'].keyJumpFocus(key, createId, [input, input])
            event.preventDefault()
          }
        }
      }
    },
    [ctx]
  )
  return editing ? (
    <div style={{ display: 'flex' }} data-creator={'object'} onBlur={handleClick}>
      <AutoComplete
        options={autoCompleteOptions}
        filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        value={name}
        onChange={handleNameChange}
        style={{ flex: '1' }}
      >
        <Input
          size="small"
          addonBefore={'新属性名称'}
          onPressEnter={handleObjectCreate}
          onKeyDown={handleInputKeyDown}
          data-creator-id={id}
          data-creator={'object'}
          ref={inputRef}
        />
      </AutoComplete>

      <Button size="small" shape="circle" onClick={handleObjectCreate} style={{ margin: '0 6px' }}>
        <CheckOutlined />
      </Button>
      <Button size="small" shape="circle" onClick={handleClick} data-creator={'object'}>
        <CloseOutlined />
      </Button>
    </div>
  ) : (
    <Button
      type="dashed"
      icon={<PlusOutlined />}
      size="small"
      block
      onClick={handleClick}
      style={style}
      onFocus={(e) => {
        console.log(e)
      }}
      ref={buttonRef}
      data-creator={'object'}
      data-creator-id={id}
    >
      Property
    </Button>
  )
}

export const ArrayItemCreator = (props: CreateNameProps) => {
  const { data, access, style, mergedValueSchema, ctx, schemaEntry, id } = props

  const createArrayItem = useArrayCreator(ctx, data, access, mergedValueSchema, schemaEntry)

  // 键盘跳转处理
  const createId = useMemo(() => {
    const { viewport, pathArray } = extractFieldDomId(id)
    return getFieldDomId(viewport, pathArray.concat(['']))
  }, [])
  const handleButtonKeyDown = useCallback(
    (event: SyntheticEvent<HTMLElement, KeyboardEvent>) => {
      const supportedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
      const model = ctx.interaction.componentModelMap.get(id)
      if (!model) return
      const btn = event.currentTarget
      const key = event.nativeEvent.key

      if (supportedKeys.includes(key) && model.roles['edition']) {
        model.roles['edition'].keyJumpFocus(key, createId, [btn, btn])
        event.preventDefault()
      }
    },
    [ctx]
  )

  return (
    <Button
      type="dashed"
      icon={<PlusOutlined />}
      size="small"
      block
      onClick={createArrayItem}
      onKeyDown={handleButtonKeyDown}
      style={style}
      data-creator={'array'}
      data-creator-id={id}
    >
      Item
    </Button>
  )
}
