import { ComponentModel } from '@cpu-json-editor/core/dist/esm/components/ComponentModel'
import CpuEditorContext from '@cpu-json-editor/core/dist/esm/context'
import { extractFieldDomId, getFieldDomId } from '@cpu-json-editor/core/dist/esm/utils'
import { useCallback } from 'react'
import { findNextElement } from '../helper/ElementKbdMovement'

export const useContainerKeyJump = (ctx: CpuEditorContext, model: ComponentModel, id: string) => {
  const keyJump = useCallback((key: string, fromId: string, fromElements: HTMLElement[]) => {
    console.log('✨容器接收', id, key, fromId, fromElements, model)

    const container = document.querySelector<HTMLElement>(`[data-cpu-editor-field-id="${id}"]`)
    const tryJumpParentModel = () => {
      const { viewport, pathArray } = extractFieldDomId(fromId)
      if (pathArray.length === 0) return
      pathArray.pop()
      const parentModel = ctx.interaction.componentModelMap.get(getFieldDomId(viewport, pathArray))
      if (parentModel && container) {
        parentModel.emit('keyJump', key, id, fromElements.concat([container]))
        console.log('🎇上报至：', getFieldDomId(viewport, pathArray))
      }
    }

    // 这里 filter 是因为，要直接在自己 container 下的 role 元素才可以作为候选
    const elements = container
      ? Array.from(container.querySelectorAll<HTMLElement>('[data-cpu-editor-focusable-role]')).filter((e) => {
          const fieldContainer = e.closest('[data-cpu-editor-field-id]')
          return fieldContainer === container
        })
      : []

    const element = findNextElement(elements, fromElements[fromElements.length - 1], key)
    console.log('🈲找到下个元素：' + id, element)

    if (element) {
      // 找到了可聚焦的下一个元素，直接聚焦
      const role = element.dataset['cpuEditorFocusableRole']!
      const roleModel = model.roles[role]
      console.log('📎最终聚焦到:', id, role, roleModel)
      if (roleModel) {
        // 设计要求但凡带属性选择器 role 的 roleModel 必须 focusable，因此这里直接 focus
        roleModel.keyJumpFocus(key, id, fromElements)
      }
    } else {
      // 试图上报
      tryJumpParentModel()
    }
  }, [])

  model.on('keyJump', keyJump)

  return () => {
    model.removeListener('keyJump', keyJump)
  }
}
