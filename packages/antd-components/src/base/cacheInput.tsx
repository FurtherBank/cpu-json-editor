/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AutoComplete, AutoCompleteProps, Input, InputNumber } from 'antd'
import { debounce } from 'lodash'
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  SyntheticEvent,
  useCallback,
  useLayoutEffect,
  useState
} from 'react'
const { TextArea } = Input

interface InputComProps {
  value?: any
  onChange?: (e: React.SyntheticEvent | any) => void
  onBlur?: (e: any) => void
  [k: string]: any
}

interface CachedComProps
  extends Pick<AutoCompleteProps, 'backfill' | 'defaultActiveFirstOption' | 'options' | 'filterOption' | 'open'> {
  onValueChange?: (e: any) => void
  validate: boolean | ((v: any) => boolean)
  [k: string]: any
}

/**
 * 构建缓存式 input 组件的 HOC。
 * 传入 input 组件，输出后，得到缓存式的 input 组件。
 * 缓存式组件防抖式的更新 value，且在失去焦点和组件卸载两个时机强制更新。
 * 这时可以对输入进行验证，不通过可以阻止其更新，回到之前的输入。
 * @param InputComponent Input 组件。可以是普通的 input，也可以是封装的 input React.ComponentType<InputComProps>
 * @returns
 */
const cacheInput = (InputComponent: React.ComponentType<InputComProps>): React.FC<CachedComProps> => {
  return forwardRef(
    (
      {
        value,
        onValueChange,
        validate,
        onBlur,
        onFocus,
        // autoComplete props
        backfill,
        defaultActiveFirstOption,
        options,
        filterOption,
        open,
        ...props
      },
      ref: ForwardedRef<any>
    ) => {
      const [nowInputValue, setNowInputValue] = useState(value) // cache总是input的属性
      const [prev, setPrev] = useState(value)
      const [focused, setFocused] = useState(false)

      // 如果之前的 value 不同于现在的 value，就是外部属性引起的value更新，此时同步更改 nowInputValue
      if (prev !== value) {
        setPrev(value)
        setNowInputValue(value)
      }

      const syncPropValue = useCallback(
        (value: any, inputValue: any) => {
          if (value !== inputValue) {
            const valid = typeof validate === 'boolean' ? validate : validate(inputValue)
            if (valid) {
              setPrev(inputValue)
              // 调用 onValueChange，告诉父组件可以改 value 属性了
              if (onValueChange && typeof onValueChange === 'function') onValueChange(inputValue)
            } else {
              setNowInputValue(value)
            }
          }
        },
        [onValueChange, validate]
      )

      const debounceOnChange = useCallback(debounce(syncPropValue, 500), [syncPropValue])

      const onChange = useCallback(
        (e: string | number | SyntheticEvent<HTMLInputElement, ChangeEvent>) => {
          if (e !== null) {
            const inputValue = typeof e !== 'object' ? e : e.currentTarget.value
            setNowInputValue(inputValue)
            debounceOnChange(value, inputValue)
          }
        },
        [value, setNowInputValue, debounceOnChange]
      )

      const newOnBlur = (e: SyntheticEvent<HTMLInputElement, FocusEvent>) => {
        debounceOnChange.cancel()
        syncPropValue(value, nowInputValue)
        setFocused(false)
        // 如果有 onBlur 一并执行
        if (onBlur && typeof onBlur === 'function') onBlur(e)
      }

      const newOnFocus = useCallback(
        (e: SyntheticEvent<HTMLInputElement, FocusEvent>) => {
          setFocused(true)
          // 如果有 onFocus 一并执行
          if (onFocus && typeof onFocus === 'function') onFocus(e)
        },
        [onFocus]
      )

      // 组件卸载时，如果 input 在聚焦状态时保存(不在聚焦状态下的卸载是动作导致，此时如果保存会发送错误动作)
      useLayoutEffect(() => {
        return () => {
          if (focused) {
            debounceOnChange.cancel()
            onValueChange && onValueChange(value)
          }
        }
      }, [])

      const autoCompleteFields = {
        backfill,
        defaultActiveFirstOption,
        options,
        open,
        filterOption
      }

      return options ? (
        <AutoComplete {...autoCompleteFields} onChange={onChange} value={nowInputValue}>
          <InputComponent onBlur={newOnBlur} onFocus={newOnFocus} ref={ref} {...props} />
        </AutoComplete>
      ) : (
        <InputComponent
          onBlur={newOnBlur}
          onFocus={newOnFocus}
          {...props}
          onChange={onChange}
          value={nowInputValue}
          ref={ref}
        />
      )
    }
  )
}

export const CInput = cacheInput(Input),
  CInputNumber = cacheInput(InputNumber),
  CTextArea = cacheInput(TextArea)

export default cacheInput
