const glob = require('glob')
const path = require('path')
const fs = require('fs')
const { get } = require('http')

// 获取所有 TypeScript 文件路径
const files = glob.sync('src/**/*.{ts,tsx,json}')

const getFilePathAttributes = (file) => {
  const filePath = file
    .replace(/\.ts$/, '')
    .replace(/\.tsx$/, '')
    .replace(/\.json$/, '')
  const isIndex = filePath.endsWith('index')
  const filename = isIndex ? path.basename(path.dirname(filePath)) : path.basename(filePath)
  const importPath = filePath.replace(/\\/g, '/').replace(/^\.\/src/g, './')
  return {
    filePath,
    isIndex,
    filename,
    importPath
  }
}

// 生成导入语句
const importStatements = files
  .map((file) => {
    const { filename, importPath } = getFilePathAttributes(file)
    return `import * as ${filename} from './${importPath}';`
  })
  .join('\n')

// 生成导出语句
const exportContents = files
  .map((file) => {
    const { filename, importPath } = getFilePathAttributes(file)
    return `  ...${filename}`
  })
  .join(',\n')
const exportStatement = `export {\n${exportContents}\n};`

// 生成入口文件内容
const content = `${importStatements}\n\n${exportStatement}`

// 写入入口文件
fs.writeFileSync('src/index.ts', content)
