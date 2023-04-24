# dumi 下 monorepo 使用说明书

## 创建包

首先你的`pnpm-workspace.yaml`配置好。

在这个模板中新添加一个包，操作流程如下，以创建`liba`为例：

```bash
cd .\packages\
mkdir liba
cd liba
pnpm dlx create-father ./

# 根据提示选择或输入你的信息。
# √ Pick target platform(s) » Browser
# √ Pick NPM client » pnpm
# √ Input NPM package name ... liba
# √ Input NPM package description ...
# √ Input NPM package author (Name <email@example.com>) ...
```

## 添加子包依赖

在同一仓库内引用，比如`docs`项目引用`liba`。只需要在`docs`项目中执行添加包命令，并加上`-w`参数，表面是引用 workspace 中的包。

```
# 项目根目录操作需要带过滤条件
pnpm add liba -w --filter docs

# 进入包的目录可以直接添加
cd .\packages\docs
pnpm add liba -w

```

## ts 引用

开发组件库的情况下，用户一般会从你的打包产物`dist/esm`目录中引用，但是在开发过程中，它不会打包，而是要引用源代码`src`。

以`docs`引用`liba`为例，所以应该在`docs/tsconfig.json`加入以下配置：

```json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "liba/dist/esm": ["./node_modules/liba/src"],
      "liba/dist/esm/*": ["./node_modules/liba/src/*", "*"],
    },
  },

```

注意事项：

1. 先把包安装好。不然没有。
2. 必须是`include`范围内的文件才能应用`paths`的路径映射，不在其中的文件，如`__test__`等，必须导入开发时原本`src`的文件名。但也因为这部分代码进不了生产，所以也行。但总是感觉不太对劲。

## 参考文献

讲 changeset 发布 npm 包：[https://github.com/DavidWells/pnpm-workspaces-example](https://github.com/DavidWells/pnpm-workspaces-example)

dumi 中应用：✨ https://github.com/scfido/pnpm-monorepo

https://github.com/umijs/dumi-lerna-template
