import { IComponentMap } from '@cpu-json-editor/core/dist/esm/components/ComponentMap'
import { FieldContainerNormal } from './container/FieldContainerNormal'
import { FieldContainerShort } from './container/FieldContainerShort'
import { FieldDrawer } from './drawer/FieldDrawer'
import { BooleanEdition } from './edition/BooleanEdition'
import { ConstEdition } from './edition/ConstEdition'
import { EnumEdition } from './edition/EnumEdition'
import { NullEdition } from './edition/NullEdition'
import { NumberEdition } from './edition/NumberEdition'
import { StringEdition } from './edition/StringEdition'
import { MultilineEdition } from './format/multiline'
import { RowEdition } from './format/row'
import { OneOfOperation } from './operation/OneOf'
import { OperationButton } from './operation/OperationButton'
import { TypeOperation } from './operation/Type'
import { SchemaErrorLogger } from './SchemaErrorLogger'
import { FieldTitle } from './title'
import { ArrayListViewEdition } from './views/list'

import { ConfigProvider } from 'antd'
import { ConfigProviderProps } from 'antd/lib/config-provider'
import './css/index.less'
import { ArrayEdition } from './edition/ArrayEdition'
import { ObjectEdition } from './edition/ObjectEdition'
import { DateEdition } from './format/date'
import { DateTimeEdition } from './format/date-time'
import { IconImgEdition } from './format/icon-image/icon-img'
import { TimeEdition } from './format/time'

export const antdComponentMap: IComponentMap<ConfigProviderProps> = {
  containerNormal: FieldContainerNormal,
  containerShort: FieldContainerShort,
  title: FieldTitle,
  menuAction: OperationButton,
  operation: {
    oneOf: OneOfOperation,
    type: TypeOperation
  },
  format: {
    multiline: MultilineEdition,
    date: DateEdition,
    time: TimeEdition,
    'date-time': DateTimeEdition,
    row: RowEdition,
    uri: RowEdition,
    'uri-reference': RowEdition,
    image: IconImgEdition
  },
  edition: {
    object: ObjectEdition,
    array: ArrayEdition,
    string: StringEdition,
    number: NumberEdition,
    boolean: BooleanEdition,
    null: NullEdition,
    enum: EnumEdition,
    const: ConstEdition
  },
  drawer: FieldDrawer,
  schemaErrorLogger: SchemaErrorLogger,
  globalProvider: ConfigProvider
}

export const antdViewsMap = {
  list: {
    edition: {
      array: ArrayListViewEdition
    },
    shortable: false
  }
}
