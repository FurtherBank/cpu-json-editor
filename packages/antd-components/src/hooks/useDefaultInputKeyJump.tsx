import { CpuEditorContext } from '@cpu-json-editor/core'
import { SyntheticEvent, useCallback } from 'react'

export interface DefaultKeyJumpOption {
  supportedKeys?: string[]
  preventDefault?: boolean
}

export const useDefaultInputKeyJump = (ctx: CpuEditorContext, id: string, options: DefaultKeyJumpOption = {}) => {
  return useCallback(
    (event: SyntheticEvent<HTMLInputElement, KeyboardEvent>) => {
      const { supportedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], preventDefault = true } = options
      const model = ctx.interaction.componentModelMap.get(id)
      if (!model) return
      const input = event.currentTarget
      const key = event.nativeEvent.key

      if (supportedKeys.includes(key)) {
        // console.log('👆触发：', event.currentTarget)
        if (input.selectionStart === 0 && input.selectionEnd === 0) {
          // 左方向键，且光标在最左侧
          if (['ArrowLeft', 'ArrowUp'].indexOf(key) >= 0) {
            model.emit('keyJump', key, id, [input])
            if (preventDefault) event.preventDefault()
          }
        }
        if (input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
          // 右方向键，且光标在最右侧
          if (['ArrowRight', 'ArrowDown'].indexOf(key) >= 0) {
            model.emit('keyJump', key, id, [input])
            if (preventDefault) event.preventDefault()
          }
        }
      }
    },
    [options, ctx]
  )
}
