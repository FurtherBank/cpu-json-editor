import { Config, configUmiAlias, createConfig } from 'umi/test'

export default async () => {
  try {
    const result = (await configUmiAlias({
      ...createConfig({
        target: 'browser',
        jsTransformer: 'esbuild',
        // config opts for esbuild , it will pass to esbuild directly
        jsTransformerOpts: { jsx: 'automatic' }
      }),

      setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
      collectCoverageFrom: [
        'src/**/*.{ts,js,tsx,jsx}',
        '!src/.umi/**',
        '!src/.umi-test/**',
        '!src/.umi-production/**',
        // .dumi 下被 ignore 的文件
        '!.dumi/**'
      ]
      // if you require some es-module npm package, please uncomment below line and insert your package name
      // transformIgnorePatterns: ['node_modules/(?!.*(lodash-es|your-es-pkg-name)/)']
    })) as Config.InitialOptions

    // monorepo 开发模式下模块导入映射(不知道为啥一定要 core 映射到 src 才能正常运行，明明都一样的)
    result.moduleNameMapper!['^@cpu-json-editor/core$'] = '@cpu-json-editor/core/src'

    return result
  } catch (e) {
    console.log(e)
    throw e
  }
}
