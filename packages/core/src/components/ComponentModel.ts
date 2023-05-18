import EventEmitter from 'eventemitter3'

export interface IRoleModel {
  keyJumpFocus: (key: string, fromId: string, fromElements: HTMLElement[]) => void
}
/**
 * 每一个 fieldComponent 具备的 componentModel
 * 该 model 在整个组件声明周期中都是不变的
 */
export class ComponentModel extends EventEmitter {
  /**
   *
   */
  constructor(public roles: Record<string, IRoleModel> = {}) {
    super()
  }
}
