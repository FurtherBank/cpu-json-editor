import { getExample } from '@cpu-json-editor/common-test-utils/src'
import { MockRender } from '@cpu-json-editor/common-test-utils/src/MockComponent'
import { CpuEditorContext, EditorProps, JsonSchemaEditor } from '@cpu-json-editor/core/src'
import { ConfigProviderProps } from 'antd/lib/config-provider'
import { antdComponentMap, antdViewsMap } from '../../src'

it('icon: render img correctly', async () => {
  const [data, schema] = getExample('图标图片格式')
  const editorProps: EditorProps<ConfigProviderProps> = {
    data,
    schema,
    options: {
      resources: {
        mapToSrc: (src: string) => {
          return `https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/${src}?raw=true`
        }
      }
    },
    componentMap: antdComponentMap,
    viewsMap: antdViewsMap
  }
  MockRender<CpuEditorContext>(JsonSchemaEditor, editorProps)

  const img = document.querySelector('[data-cpu-editor-field-id="window:/earth"] img')
  expect(img).toBeTruthy()
  expect(img?.getAttribute('src')).toBe(
    'https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/土.png?raw=true'
  )
})

it('icon: render img correctly with resPrefix', async () => {
  const [data, schema] = getExample('图标图片格式')
  schema.definitions.ImageFormatJSON.additionalProperties.resPrefix = 'small/'
  const editorProps: EditorProps<ConfigProviderProps> = {
    data,
    schema,
    options: {
      resources: {
        mapToSrc: (src: string) => {
          return `https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/${src}?raw=true`
        }
      }
    },
    componentMap: antdComponentMap,
    viewsMap: antdViewsMap
  }
  MockRender<CpuEditorContext>(JsonSchemaEditor, editorProps)

  const img = document.querySelector('[data-cpu-editor-field-id="window:/earth"] img')
  expect(img).toBeTruthy()
  expect(img?.getAttribute('src')).toBe(
    'https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/small/土.png?raw=true'
  )
})

it('image: render img correctly', async () => {
  const [data, schema] = getExample('大图图片格式')
  const editorProps: EditorProps<ConfigProviderProps> = {
    data,
    schema,
    options: {
      resources: {
        mapToSrc: (src: string) => {
          return `https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/${src}?raw=true`
        }
      }
    },
    componentMap: antdComponentMap,
    viewsMap: antdViewsMap
  }
  MockRender<CpuEditorContext>(JsonSchemaEditor, editorProps)

  const img = document.querySelector('[data-cpu-editor-field-id="window:/earth"] img')
  expect(img).toBeTruthy()
  expect(img?.getAttribute('src')).toBe(
    'https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/土.png?raw=true'
  )
})

it('image: render img correctly with resPrefix', async () => {
  const [data, schema] = getExample('大图图片格式')
  schema.definitions.ImageFormatJSON.additionalProperties.resPrefix = 'small/'
  const editorProps: EditorProps<ConfigProviderProps> = {
    data,
    schema,
    options: {
      resources: {
        mapToSrc: (src: string) => {
          return `https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/${src}?raw=true`
        }
      }
    },
    componentMap: antdComponentMap,
    viewsMap: antdViewsMap
  }
  MockRender<CpuEditorContext>(JsonSchemaEditor, editorProps)

  const img = document.querySelector('[data-cpu-editor-field-id="window:/earth"] img')
  expect(img).toBeTruthy()
  expect(img?.getAttribute('src')).toBe(
    'https://github.com/FurtherBank/cpu-json-editor/blob/master/packages/docs/src/images/small/土.png?raw=true'
  )
})
