# 名称
根据需求文件生成前端代码skill

## 介绍

Skill 本身不是一个单独的 JavaScript 插件，而是“Markdown 指令 + 可执行脚本 + 参考资料”的能力目录。标准 Skill 至少包含 SKILL.md，其中 name 和 description 用于识别和触发 Skill。

## 命令

```shell

# 打包工具
npm run build

# 测试代码生成
node ./dist/list-page-generator/scripts/generate.js output/user-list2.json 4.tsx app ../templates/react-antd-list2.hbs
```
D:\code\listPageSkill\dist\list-page-generator\scripts\dist\templates\react-antd-list2.hbs
D:\code\listPageSkill\dist\list-page-generator\templates\react-antd-list2.hbs