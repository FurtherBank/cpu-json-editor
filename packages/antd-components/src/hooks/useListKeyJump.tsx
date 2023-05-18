import CpuEditorContext from '@cpu-json-editor/core/dist/esm/context'
import { RefObject, useCallback } from 'react'
import { findNextElement } from '../helper/ElementKbdMovement'

export const useListKeyJump = (ctx: CpuEditorContext, panelRef: RefObject<HTMLDivElement>, id: string) => {
  return useCallback(
    (key: string, fromId: string, fromElements: HTMLElement[]) => {
      const div = panelRef.current
      const elements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('[data-cpu-editor-field-id]') || []
      ).filter((e) => {
        const focusableRoleElement = e.querySelector('[data-cpu-editor-focusable-role]')
        return focusableRoleElement
      })
      const createElement = panelRef.current?.querySelector<HTMLElement>('[data-creator]')
      if (createElement) elements.push(createElement)
      const toElement = findNextElement(elements, fromElements[fromElements.length - 1], key)
      if (toElement) {
        console.log(`📇列表${id}转：`, fromId, fromElements[fromElements.length - 1], '->', toElement)
        if (toElement.dataset['creator']) {
          // 创建交互
          const creatorInput = div?.querySelector('[data-creator]') as HTMLInputElement | undefined
          if (creatorInput) {
            if (creatorInput.dataset['creator'] === 'object') {
              creatorInput.click()
            } else {
              creatorInput.focus()
            }
          }
        } else {
          // 给下层字段去掉该层元素后传递
          const childId = toElement.dataset['cpuEditorFieldId']!
          const childModel = ctx.interaction.componentModelMap.get(childId)
          if (childModel) {
            return childModel.emit('keyJump', key, fromId, fromElements.slice(0, -1))
          }
        }
      } else {
        // 编辑组件无法容纳，转为跳出 edition 指令给本字段模型
        const model = ctx.interaction.componentModelMap.get(id)
        if (model) {
          const reportKey = ['ArrowLeft', 'ArrowUp'].includes(key) ? 'ArrowLeft' : 'ArrowRight'
          return model.emit('keyJump', reportKey, id, [panelRef.current!])
        }
      }
    },
    [ctx]
  )
}

// export const useListKeyJump = (
//   ctx: CpuEditorContext,
//   ref: ForwardedRef<any>,
//   panelRef: RefObject<HTMLDivElement>,
//   lists: FieldDisplayList[],
//   id: string
// ) => {
//   useImperativeHandle(
//     ref,
//     () => {
//       const keyJump = (key: string, fromId: string, fromElements: HTMLElement) => {
//         console.log(key, fromId, fromElements)
//         const elements = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('[data-cpu-editor-field-id]') || [])
//         const createElement = panelRef.current?.querySelector<HTMLElement>('[data-creator]')
//         if (createElement) elements.push(createElement)
//         const toElement = findNextElement(elements, fromElements, key)
//         if (toElement) {

//         } else {

//         }
//         const fieldPath = extractFieldDomId(fromId).pathArray
//         if (fieldPath.length === 0) return
//         const fieldName = fieldPath[fieldPath.length - 1]
//         // 先判断 fromId 是否在网格内
//         let listIndex = -1
//         let itemIndex = -1
//         for (let i = 0; i < lists.length; i++) {
//           const { items } = lists[i]
//           const itemIndexInList = items.findIndex((value) => value.key === fieldName)
//           if (itemIndexInList !== -1) {
//             listIndex = i
//             itemIndex = itemIndexInList
//           }
//         }
//         console.log('fromPos:', listIndex, itemIndex, lists, fieldName)

//         // 如果找到了 fromId 的位置，计算目标位置
//         if (itemIndex !== -1) {
//           const { short, items } = lists[listIndex]
//           const stepMap = {
//             ArrowLeft: -1,
//             ArrowRight: 1,
//             ArrowUp: short ? -2 : -1,
//             ArrowDown: short ? 2 : 1
//           }
//           itemIndex += stepMap[key as keyof typeof stepMap]
//           // 越界处理，保证最终目标位置一定合法
//           if (itemIndex < 0) {
//             listIndex--
//             if (listIndex >= 0 && listIndex < lists.length) {
//               const targetListItems = lists[listIndex].items
//               itemIndex = targetListItems.length - 1
//             } else {
//               listIndex = itemIndex = -1
//             }
//           } else if (itemIndex > items.length) {
//             listIndex++
//             if (listIndex >= 0 && listIndex < lists.length) {
//               itemIndex = 0
//             } else {
//               listIndex = itemIndex = -1
//             }
//           }
//         }
//         console.log('toPos:', listIndex, itemIndex, lists, fieldName)

//         // 进行跳转处理
//         if (listIndex >= 0 && listIndex < lists.length) {
//           const item = lists[listIndex].items[itemIndex]
//           if (childDataNotEmpty(item)) {
//             // 给下层字段透传
//             const { viewport, path } = extractFieldDomId(id)
//             const arrayPath = pointer.parse(path)
//             const childId = getFieldDomId(viewport, arrayPath.concat(item.key))
//             const childModel = ctx.interaction.componentModelMap.get(childId)
//             console.log('trans:', childId, childModel)

//             if (childModel) childModel.emit('keyJump', key, fromId, fromElements)
//           } else {
//             // 聚焦到 create
//             const div = panelRef.current
//             if (div) {
//               const creatorInput = div.querySelector('[data-creator]') as HTMLInputElement
//               if (creatorInput) {
//                 if (creatorInput.dataset['creator'] === 'object') {
//                   creatorInput.click()
//                 } else {
//                   creatorInput.focus()
//                 }
//               }
//             }
//           }
//         } else {
//           // 编辑组件无法容纳，转为跳出 edition 指令给本字段模型
//           const model = ctx.interaction.componentModelMap.get(id)
//           if (model) {
//             const key = listIndex < 0 ? 'ArrowLeft' : 'ArrowRight'
//             model.emit('keyJump', key, id, 'edition')
//           }
//         }
//       }
//       return {
//         keyJump
//       }
//     },
//     [lists, ctx]
//   )
// }
