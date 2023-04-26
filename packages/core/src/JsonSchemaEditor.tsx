import Ajv from 'ajv'
import React, { CSSProperties, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import { Provider } from 'react-redux'
import EditorDrawer from './EditorDrawer'
import Field from './Field'

import { IComponentMap, IViewsMap } from './components/ComponentMap'
import CpuEditorContext from './context'
import { CpuInteraction } from './context/interaction'
import defaultAjvInstance from './definition/ajvInstance'
import { JSONSchema } from './type/Schema'

export interface EditorProps<T = any> {
  onChange?: (data: any) => void | null
  data?: any
  schema?: JSONSchema | boolean
  id?: string | undefined
  style?: CSSProperties
  componentMap: IComponentMap<T>
  viewsMap?: Record<string, IViewsMap>
  rootMenuItems?: JSX.Element[]
  options?: {
    ajvInstance?: Ajv
  }
  providerProps?: T
}

export const InfoContext = React.createContext<CpuEditorContext>(null!)

const emptyArray: never[] = []
const Editor = <T,>(props: EditorProps<T>, ref: React.ForwardedRef<CpuEditorContext>) => {
  const {
    schema,
    data,
    onChange,
    id,
    viewsMap = {},
    componentMap,
    rootMenuItems,
    providerProps = {},
    options: { ajvInstance = defaultAjvInstance } = {}
  } = props

  // 详细抽屉功能
  const drawerRef = useRef(null) as React.RefObject<any>
  const setDrawer = useCallback(
    (...args: any[]) => {
      // console.log('setDrawer', drawerRef.current);
      if (drawerRef.current) drawerRef.current.setDrawer(...args)
    },
    [drawerRef]
  )

  const interaction = useMemo(() => {
    return new CpuInteraction(setDrawer)
  }, [setDrawer])

  // 新建 ctx
  const ctx = useMemo(() => {
    return new CpuEditorContext(data, schema, ajvInstance, id, interaction, componentMap, viewsMap)
  }, [schema, interaction, componentMap, viewsMap])

  // 给 store 订阅 change(做成 effect)
  useEffect(() => {
    const change = () => {
      const changedData = ctx.store.getState().present.data
      if (onChange && typeof onChange === 'function') {
        onChange(changedData)
      }
    }
    const unsubscribe = ctx.store.subscribe(change)
    return unsubscribe
  }, [onChange, ctx])

  // 暴露一下 api
  useImperativeHandle(
    ref,
    () => {
      return ctx
    },
    [ctx]
  )

  // 如果 data 更新来自外部，通过 setData 与 store 同步
  const presentData = ctx.store.getState().present.data
  if (data !== presentData) {
    // console.log('检测到外部更新：', data, presentData);
    ctx.store.dispatch({
      type: 'setData',
      value: data
    })
  }

  const SchemaErrorLogger = ctx.getComponent(null, ['schemaErrorLogger'])
  const GlobalProvider = ctx.getComponent(null, ['globalProvider'])
  return (
    <Provider store={ctx.store}>
      {ctx.schemaError ? <SchemaErrorLogger error={ctx.schemaError.toString()} /> : null}
      <InfoContext.Provider value={ctx}>
        <GlobalProvider {...providerProps}>
          <Field viewport="window" route={emptyArray} schemaEntry="#" rootMenuItems={rootMenuItems} />
          <EditorDrawer ref={drawerRef} />
        </GlobalProvider>
      </InfoContext.Provider>
    </Provider>
  )
}

export default React.memo(forwardRef(Editor))
