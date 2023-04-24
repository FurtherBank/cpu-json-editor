import { defineConfig } from 'dumi'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'
import path from 'path'

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'cpu-json-editor'
  },
  // https://umijs.org/zh-CN/guide/boost-compile-speed#monaco-editor-%E7%BC%96%E8%BE%91%E5%99%A8%E6%89%93%E5%8C%85
  chainWebpack: (config: any, { webpack }: any) => {
    config.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [
      {
        languages: ['json']
      }
    ])
  },
  // monorepo 额外配置：https://d.umijs.org/guide/upgrading#%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E5%8D%87%E7%BA%A7
  alias: {
    '@cpu-json-editor/core/dist/esm': path.join(__dirname, 'packages/core/src'),
    '@cpu-json-editor/core': path.join(__dirname, 'packages/core/src'),
    '@cpu-json-editor/antd-components': path.join(__dirname, 'packages/antd-components/src'),
    '@cpu-json-editor/test-examples': path.join(__dirname, 'packages/test-examples')
  },
  // 组件文档配置
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'demo', dir: 'packages/docs/src' }]
  },
  // dumi 文档发布需要做的事情
  history: {
    type: 'hash'
  },
  // base: '/json-schemaeditor-antd/',
  publicPath: process.env.NODE_ENV === 'production' ? '/json-schemaeditor-antd/' : '/'
})
