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

## ts 引用

## 参考文献

讲 changeset 发布 npm 包：[https://github.com/DavidWells/pnpm-workspaces-example](https://github.com/DavidWells/pnpm-workspaces-example)

dumi 中应用：✨ https://github.com/scfido/pnpm-monorepo

https://github.com/umijs/dumi-lerna-template
