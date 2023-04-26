import React from 'react'
import { IComponentMap } from '../../src/components/ComponentMap'

const suibianComponent = () => {
  return <div></div>
}

export const MockComponentMap: IComponentMap<any> = {
  containerNormal: suibianComponent,
  containerShort: suibianComponent,
  title: suibianComponent,
  menuAction: suibianComponent,
  operation: {
    oneOf: suibianComponent,
    type: suibianComponent
  },
  format: {},
  edition: {
    string: suibianComponent,
    number: suibianComponent,
    object: suibianComponent,
    array: suibianComponent,
    null: suibianComponent,
    boolean: suibianComponent,
    const: suibianComponent,
    enum: suibianComponent
  },
  drawer: suibianComponent,
  schemaErrorLogger: suibianComponent,
  globalProvider: (props) => {
    return props.children
  }
}
