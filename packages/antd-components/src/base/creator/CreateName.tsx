import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useArrayCreator } from '@cpu-json-editor/core/dist/esm/components/hooks/useArrayCreator'
import { useObjectCreator } from '@cpu-json-editor/core/dist/esm/components/hooks/useObjectCreator'
import CpuEditorContext from '@cpu-json-editor/core/dist/esm/context'
import { MergedSchema } from '@cpu-json-editor/core/dist/esm/context/mergeSchema'
import { isFocusable } from '@cpu-json-editor/core/dist/esm/helper/IFocusable'
import { extractFieldDomId, getFieldDomId } from '@cpu-json-editor/core/dist/esm/utils'
import { AutoComplete, Button, Input, InputRef, message } from 'antd'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDefaultBtnKeyJump } from '../../hooks/useDefaultBtnKeyJump'
import { useDefaultInputKeyJump } from '../../hooks/useDefaultInputKeyJump'

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

  const createId = useMemo(() => {
    const { viewport, pathArray } = extractFieldDomId(id)
    return getFieldDomId(viewport, pathArray.concat(['']))
  }, [])

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
      if (buttonRef.current && isFocusable(buttonRef.current)) {
        buttonRef.current.focus()
      }
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

  const handleButtonKeyDown = useDefaultBtnKeyJump(ctx, createId)
  const handleInputKeyDown = useDefaultInputKeyJump(ctx, createId)
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
          ref={inputRef}
        />
      </AutoComplete>

      <Button
        size="small"
        shape="circle"
        onClick={handleObjectCreate}
        onKeyDown={handleButtonKeyDown}
        style={{ margin: '0 6px' }}
        data-creator={'object'}
      >
        <CheckOutlined />
      </Button>
      <Button size="small" shape="circle" onClick={handleClick} onKeyDown={handleButtonKeyDown} data-creator={'object'}>
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
      onKeyDown={handleButtonKeyDown}
      style={style}
      onFocus={(e) => {
        console.log(e)
      }}
      ref={buttonRef}
      data-creator={'object'}
    >
      Property
    </Button>
  )
}

export const ArrayItemCreator = (props: CreateNameProps) => {
  const { data, access, style, mergedValueSchema, ctx, schemaEntry, id } = props

  const createId = useMemo(() => {
    const { viewport, pathArray } = extractFieldDomId(id)
    return getFieldDomId(viewport, pathArray.concat(['']))
  }, [])

  const createArrayItem = useArrayCreator(ctx, data, access, mergedValueSchema, schemaEntry)
  const handleButtonKeyDown = useDefaultBtnKeyJump(ctx, createId)

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
    >
      Item
    </Button>
  )
}
