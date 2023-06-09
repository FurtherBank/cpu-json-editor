import { getExample } from '@cpu-json-editor/common-test-utils/src'
import { MockRender } from '@cpu-json-editor/common-test-utils/src/MockComponent'
import {
  default as CpuEditorContext,
  default as JsonSchemaEditor,
  EditorProps,
  JSONSchema
} from '@cpu-json-editor/core/src'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ConfigProviderProps } from 'antd/lib/config-provider'
import React from 'react'
import { antdComponentMap, antdViewsMap } from '../../src'

test('view is list when schema has view.type === list', async () => {
  const [data, schema] = getExample('view: list')
  // const { asFragment } =
  render(<JsonSchemaEditor data={data} schema={schema} componentMap={antdComponentMap} viewsMap={antdViewsMap} />)
  // asserts
  const listItems = document.querySelectorAll('.list-item')
  expect(listItems).toHaveLength(data.length)
})

test('view is not list when schema has view.type === list but data is not root', async () => {
  const schema = {
    $schema: 'http://json-schema.org/draft-06/schema#',
    type: 'object',
    properties: {
      a: {
        type: 'array',
        view: {
          type: 'list'
        },
        items: [
          {
            type: 'null'
          },
          {
            type: 'string'
          }
        ],
        additionalItems: {
          type: 'integer'
        }
      }
    }
  }

  // const { asFragment } =
  render(
    <JsonSchemaEditor
      data={{ a: [null, 'abcd', 0, 12, 5] }}
      schema={schema as JSONSchema}
      componentMap={antdComponentMap}
      viewsMap={antdViewsMap}
    />
  )
  // asserts
  const listItems = document.querySelectorAll('.list-item')
  expect(listItems).toHaveLength(0)
})

test('view is not list when root schema is array but data not', async () => {
  const [, schema] = getExample('view: list')
  // const { asFragment } =
  render(<JsonSchemaEditor data={123} schema={schema} componentMap={antdComponentMap} viewsMap={antdViewsMap} />)
  // asserts
  const listItems = document.querySelectorAll('.list-item')
  expect(listItems).toHaveLength(0)
})

test('parse in need', () => {
  const [data, schema] = getExample('view: list')
  // const { asFragment } =

  const editorProps: EditorProps<ConfigProviderProps> = {
    data,
    schema,
    componentMap: antdComponentMap,
    viewsMap: antdViewsMap
  }
  const { current: ctx } = MockRender<CpuEditorContext>(JsonSchemaEditor, editorProps)
  // console.log(ctx.mergedSchemaMap.keys());

  // only parse direct subField of array item
  expect(ctx.mergedSchemaMap.has('#/items/0')).toBe(true)
  expect(ctx.mergedSchemaMap.has('#/items/2')).toBe(true)
  expect(ctx.mergedSchemaMap.has('#/items/2/properties/name')).toBe(false)
})
