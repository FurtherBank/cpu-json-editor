import { Config, configUmiAlias, createConfig } from 'umi/test';

export default async () => {
  try {
    return (await configUmiAlias({
      ...createConfig({
        target: 'browser',
        jsTransformer: 'esbuild',
        // config opts for esbuild , it will pass to esbuild directly
        jsTransformerOpts: { jsx: 'automatic' },
      }),

      setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
      collectCoverageFrom: [
        'src/**/*.{ts,js,tsx,jsx}',
        '!src/.umi/**',
        '!src/.umi-test/**',
        '!src/.umi-production/**',
        // .dumi 下被 ignore 的文件
        '!.dumi/**',
      ],
      // if you require some es-module npm package, please uncomment below line and insert your package name
      // transformIgnorePatterns: ['node_modules/(?!.*(lodash-es|your-es-pkg-name)/)']
    })) as Config.InitialOptions;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
