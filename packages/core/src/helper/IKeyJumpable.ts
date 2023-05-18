export type FocusableRole = 'title' | 'edition'

export interface IKeyJumpable {
  keyJump: (key: string, fromId: string, fromRole: FocusableRole) => void
}

export const isKeyJumpable = (obj: any): obj is IKeyJumpable => {
  return typeof obj === 'object' && obj !== null && typeof obj.keyJump === 'function'
}
