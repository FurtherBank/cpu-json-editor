export interface ISelectable {
  select: () => void
}

export const isSelectable = (obj: any): obj is ISelectable => {
  return typeof obj === 'object' && obj !== null && typeof obj.select === 'function'
}
