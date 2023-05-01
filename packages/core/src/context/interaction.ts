export interface ComponentModel {
  containerRef: any
  titleRef?: any
  editionRef?: any
}

/**
 * 负责管理用户与编辑器的交互
 */
export class CpuInteraction {
  componentModelMap: Map<string, any>
  constructor(public setDrawer: (route: string[], field: string | undefined) => void) {
    this.componentModelMap = new Map()
  }
}
