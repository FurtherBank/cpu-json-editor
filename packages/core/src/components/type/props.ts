import { ReactNode } from 'react'
import CpuEditorContext from '../../context'
import { FieldProps, IField } from '../../Field'
import { MenuActionType } from '../../menu/MenuActions'
import { ComponentModel } from '../ComponentModel'

export interface EditionProps {
  children?: ReactNode
  fieldInfo: IField
  fieldProps: FieldProps
  ctx: CpuEditorContext
  model: ComponentModel
}

export interface TitleProps extends EditionProps {
  fieldNameRange: string | RegExp
}

export interface FormatEditionProps extends EditionProps {
  format: string
}

export type MenuActionHandlers = Record<MenuActionType, () => void>

/**
 * 应用短优化的容器组件使用的属性。
 *
 * 相比普通容器组件，不会从属性中继承 菜单动作组件 和 选择操作组件。
 */
export interface ContainerProps extends Omit<EditionProps, 'model'> {
  availableMenuActions: MenuActionType[]
  menuActionHandlers: MenuActionHandlers
}

export interface MenuActionProps<T extends MenuActionType = MenuActionType> {
  opType: T
  opHandler: () => void
  ctx: CpuEditorContext
  id: string
  model: ComponentModel
}

export interface EditorDrawerProps {
  open: boolean
  children?: ReactNode
  onClose: () => void
}
