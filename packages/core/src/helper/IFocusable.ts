export interface IFocusable {
  focus: () => void
}

export const isFocusable = (obj: any): obj is IFocusable => {
  return typeof obj === 'object' && obj !== null && typeof obj.focus === 'function'
}
