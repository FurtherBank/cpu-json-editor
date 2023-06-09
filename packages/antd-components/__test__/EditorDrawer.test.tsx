import { getExample } from '@cpu-json-editor/common-test-utils/src'
import { MockRender } from '@cpu-json-editor/common-test-utils/src/MockComponent'
import { CpuEditorContext, EditorProps, JsonSchemaEditor } from '@cpu-json-editor/core/src'
import { act, fireEvent } from '@testing-library/react'
import { ConfigProviderProps } from 'antd/lib/config-provider'
import { antdComponentMap, antdViewsMap } from '../src'

it('not render field while not visible', async () => {
  const [data, schema] = getExample('一系列测试')
  const editorProps: EditorProps<ConfigProviderProps> = {
    data,
    schema,
    componentMap: antdComponentMap,
    viewsMap: antdViewsMap
  }
  const { current: ctx } = MockRender<CpuEditorContext>(JsonSchemaEditor, editorProps)

  // 点击 detail
  act(() => ctx.interaction.setDrawer(['mess'], '1'))

  // 关闭 drawer
  act(() => {
    const drawer = document.querySelector('.cpu-drawer')!

    const drawerClose = drawer.querySelector('.ant-drawer-close')! as HTMLElement

    fireEvent.click(drawerClose)
  })

  act(() => ctx.executeAction('change', { route: [], field: 'mess', value: '' }))

  // 因为 immutable 性质，所以应当使用 ctx.getNowData 获取最新的 data
  expect(ctx.getNowData().mess).toBe('')
})
