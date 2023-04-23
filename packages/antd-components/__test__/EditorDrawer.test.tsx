import CpuEditorContext from '@cpu-json-editor/core/dist/esm/context';
import JsonSchemaEditor, {
  EditorProps,
} from '@cpu-json-editor/core/dist/esm/JsonSchemaEditor';
import { getExample } from '@cpu-json-editor/core/dist/esm/__test__/test-utils';
import { MockRender } from '@cpu-json-editor/core/dist/esm/__test__/test-utils/MockComponent';
import { act, fireEvent } from '@testing-library/react';
import { antdComponentMap, antdViewsMap } from '../src';

it('not render field while not visible', async () => {
  const [data, schema] = getExample('一系列测试');
  const editorProps: EditorProps = {
    data,
    schema,
    componentMap: antdComponentMap,
    viewsMap: antdViewsMap,
  };
  const { current: ctx } = MockRender<CpuEditorContext>(
    JsonSchemaEditor,
    editorProps,
  );

  // 点击 detail
  act(() => ctx.interaction.setDrawer(['mess'], '1'));

  // 关闭 drawer
  act(() => {
    const drawer = document.querySelector('.cpu-drawer')!;

    const drawerClose = drawer.querySelector(
      '.ant-drawer-close',
    )! as HTMLElement;

    fireEvent.click(drawerClose);
  });

  ctx.executeAction('change', { route: [], field: 'mess', value: '' });

  // 因为 immutable 性质，所以应当使用 ctx.getNowData 获取最新的 data
  expect(ctx.getNowData().mess).toBe('');
});
