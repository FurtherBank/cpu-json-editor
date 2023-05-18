import merge from 'lodash/merge'
import { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react'
import { IFocusable } from '../helper/IFocusable'
import { IKeyJumpable } from '../helper/IKeyJumpable'
import { JSONSchema } from '../type/Schema'
import { ContainerProps, EditionProps, MenuActionProps } from './type/props'

export type CpuEditionType = 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null' | 'enum' | 'const'
/**
 * 编辑器使用的所有组件的 map。
 *
 * 根据对应的组件角色索引到对应使用的组件。
 */
export interface IComponentMap<T = Record<string, never>> {
  containerNormal: ComponentType<ContainerProps>
  containerShort: ComponentType<ContainerProps>
  title: ForwardRefExoticComponent<EditionProps & RefAttributes<any>>
  menuAction: ComponentType<MenuActionProps>
  operation: Record<string, ComponentType<any>>
  format: Record<string, ComponentType<any>>
  edition: Record<
    CpuEditionType,
    // 这里写了三遍纯粹是感觉不爽……
    | ForwardRefExoticComponent<EditionProps & RefAttributes<IFocusable | IKeyJumpable>>
    | ForwardRefExoticComponent<EditionProps & RefAttributes<IFocusable>>
    | ForwardRefExoticComponent<EditionProps & RefAttributes<IKeyJumpable>>
  >
  drawer: ComponentType<any>
  schemaErrorLogger: ComponentType<any>
  globalProvider: ComponentType<T>
}

type PartialIComponentMap = Partial<
  {
    operation: Partial<Record<string, ComponentType<any>>>
    format: Partial<Record<string, ComponentType<any>>>
    edition: Partial<Record<CpuEditionType, ComponentType<EditionProps>>>
  } & Omit<IComponentMap, 'operation' | 'format' | 'edition' | 'globalProvider'>
>

export interface IViewsMap extends PartialIComponentMap {
  /**
   * 使用该自定义 view 的字段是否可以作为 [短字段](https://github.com/FurtherBank/json-schemaeditor-antd#短字段)。
   *
   * 注意，viewMap 中的所有组件都使用`shortable`的统一设置。
   *
   * 如果您需要对不同的组件设置不同的`shortable`值，可以使用不同的`viewType`
   */
  shortable: boolean
  /**
   * 使用该自定义 view 的字段参数的 schema。
   *
   * 如果不设置，将认为该自定义 view 没有任何参数。
   *
   * 注：该字段仅供对外声明使用，为提高性能，并不对传入的参数进行校验。
   */
  paramSchema?: JSONSchema
}

/**
 * 将合并 componentMap 和 viewsMap 的函数放在这个单例之中
 */
export class ComponentMap {
  /**
   * 合并 ComponentMap 或 ViewsMap
   * @param maps
   * @returns
   */
  static merge<T extends IComponentMap | IViewsMap>(...maps: T[]) {
    return maps.reduce((resultMap, newMap) => {
      return merge(resultMap, newMap)
    })
  }
}
