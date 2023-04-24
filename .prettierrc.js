module.exports = {
  pluginSearchDirs: false,
  plugins: [require.resolve('prettier-plugin-organize-imports'), require.resolve('prettier-plugin-packagejson')],
  singleQuote: true,
  trailingComma: 'none',
  semi: false,
  printWidth: 120,
  proseWrap: 'never',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve'
      }
    }
  ]
}
