import { defineConfig } from 'dumi';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'cpu-json-editor',
  },
  // https://umijs.org/zh-CN/guide/boost-compile-speed#monaco-editor-%E7%BC%96%E8%BE%91%E5%99%A8%E6%89%93%E5%8C%85
  chainWebpack: (config: any, { webpack }: any) => {
    config.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [
      {
        languages: ['json'],
      },
    ]);
  },

  // dumi 文档发布需要做的事情
  history: {
    type: 'hash',
  },
  // base: '/json-schemaeditor-antd/',
  publicPath:
    process.env.NODE_ENV === 'production' ? '/json-schemaeditor-antd/' : '/',
});
