import CpuEditorContext from '@cpu-json-editor/core/dist/esm/context'
import { SyntheticEvent, useCallback } from 'react'
import { DefaultKeyJumpOption } from './useDefaultInputKeyJump'

export const useDefaultBtnKeyJump = (ctx: CpuEditorContext, id: string, options: DefaultKeyJumpOption = {}) => {
  return useCallback(
    (event: SyntheticEvent<HTMLElement, KeyboardEvent>) => {
      // console.log('👆触发：', event.currentTarget)
      const { supportedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], preventDefault = true } = options
      const model = ctx.interaction.componentModelMap.get(id)
      if (!model) return
      const input = event.currentTarget
      const key = event.nativeEvent.key

      if (supportedKeys.includes(key)) {
        model.emit('keyJump', key, id, [input])
        if (preventDefault) event.preventDefault()
      }
    },
    [options, ctx]
  )
}
