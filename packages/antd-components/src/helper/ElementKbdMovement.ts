export function getRectPadding(r1: DOMRect, r2: DOMRect, axis: 'x' | 'y'): number {
  if (axis === 'y') {
    if (r1.top <= r2.bottom && r2.top <= r1.bottom) {
      return 0
    } else if (r2.top > r1.bottom) {
      // r2 在下
      return r2.top - r1.bottom
    } else {
      // r1 在下
      return r1.top - r2.bottom
    }
  } else {
    if (r1.left <= r2.right && r2.left <= r1.right) {
      return 0
    } else if (r2.left > r1.right) {
      // r2 在右
      return r2.left - r1.right
    } else {
      // r1 在右
      return r1.left - r2.right
    }
  }
}

/**
 * 在一个网格元素列表中，找到按下方向键返回的下一个元素
 * @param elements 元素列表，元素保证是从左到右从上到下顺序排的
 * @param fromElement
 * @param key
 * @returns
 */
export const findNextElement = (elements: HTMLElement[], fromElement: HTMLElement, key: string) => {
  const elementIndex = elements.indexOf(fromElement)
  let startIndex = elementIndex !== -1 ? elementIndex : ['ArrowLeft', 'ArrowUp'].includes(key) ? elements.length : -1
  let searchDir = ['ArrowLeft', 'ArrowUp'].includes(key) ? -1 : 1

  if (['ArrowLeft', 'ArrowRight'].includes(key)) {
    // 左右移动可以直接确定 index
    return startIndex + searchDir >= 0 && startIndex + searchDir < elements.length
      ? elements[startIndex + searchDir]
      : null
  } else {
    // 上下移动，寻找不在一行的，与 fromElement 相距最近的点
    let lastConsideringElement: HTMLElement | null = null
    let closestConsideringElement: HTMLElement | null = null
    let closestElementDiff = Infinity
    const fromElementRect = fromElement.getBoundingClientRect()
    const fromElementXCenter = fromElementRect.x + fromElementRect.width / 2
    for (let i = startIndex + searchDir; i < elements.length && i >= 0; i += searchDir) {
      const element = elements[i]
      const elementRect = element.getBoundingClientRect()
      const elementXCenter = elementRect.x + elementRect.width / 2
      const elementXCenterDiff = elementXCenter - fromElementXCenter
      if (closestConsideringElement && lastConsideringElement) {
        const lastConsideringElementRect = lastConsideringElement.getBoundingClientRect()
        if (getRectPadding(elementRect, lastConsideringElementRect, 'y') === 0) {
          const lastConsideringElementXCenter = lastConsideringElementRect.x + lastConsideringElementRect.width / 2
          const lastConsideringElementXCenterDiff = lastConsideringElementXCenter - fromElementXCenter

          if (elementXCenterDiff * lastConsideringElementXCenterDiff < 0) {
            // elements 的顺序性，使得找到相邻两个中心在 fromElement 两侧的元素，即可确定最近者
            return Math.abs(elementXCenterDiff) < Math.abs(lastConsideringElementXCenterDiff)
              ? element
              : lastConsideringElement
          } else if (Math.abs(elementXCenterDiff) < closestElementDiff) {
            // 找到最近的元素
            closestConsideringElement = element
            closestElementDiff = Math.abs(elementXCenterDiff)
          }
        } else {
          // 当前元素跑到在下一行，退出，返回该行最近者
          break
        }
      } else if (getRectPadding(elementRect, fromElementRect, 'y') !== 0) {
        // 不同一行第一个遇到的
        closestConsideringElement = element
        closestElementDiff = Math.abs(elementXCenterDiff)
      }
      lastConsideringElement = element
    }
    return closestConsideringElement || lastConsideringElement
  }
}
