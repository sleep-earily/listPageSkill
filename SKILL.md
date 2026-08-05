---
name: list-page-generator
description: 从中文需求文档中提取列表页查询项、表格列、操作按钮和接口信息，生成符合 Schema 的 JSON，并通过 JavaScript 模板生成 React 或 Vue 列表页。当用户提到列表页生成、需求文档转 JSON、查询条件抽取、表格字段抽取或页面代码生成时使用。
---

# 列表页生成 Skill

## 适用场景
用户根据需求文件新建列表页组件

## 任务目标

将中文列表页需求转换为结构化 JSON，再根据 JSON 生成页面组件。

## 执行流程

1. 读取用户指定的需求文档。
2. 提取列表页相关内容,转成JSON格式信息，：
   - 页面名称componentName
   - 查询条件formconfigs，格式为
     ```json
     [
       {
         "name": "xxx",
         "label": "xxx",
         "type": "Input|Select|RangePicker",
         "options": []
       }
     ]
     ```
   - 列表字段tableColumns,格式为
     ```json
     [
       {
         "name": "xxx",
         "label": "xxx",
         "options": []
       }
     ]
     ```
    > 模板映射关系：`label` → 列标题、`name` → dataIndex/key  
    > ❌ 禁止使用 `title`/`dataIndex`/`key` 格式，否则生成空列
   - 行操作rowActions
   - 批量操作名称batchButtons
   - 测试数据mockData
3. 将json信息写入文件：./skills/组件名.json
4. 不确定的信息使用空字符串、`null` 或空数组，不得编造接口地址和字段含义。
<!-- 5. 使用 `scripts/validate.js` 校验 JSON。 -->
<!-- 6. 校验失败时修复 JSON，直到通过校验。 -->
5. 使用 `scripts/generate.js` 生成页面组件,命令参数如下
```shell
node scripts/generate.js <json-file> <output-file> <output-dir> <template-dir>"
```
   - output-dir: 可选，指定输出目录，默认与 output-file 同级，可放入相关项目的src/pages目录下
   - template-dir: 可选，指定模板目录，默认使用内置模板claude/skills/list-page-generator/templates/react-antd-list2.hbs

6. 在".umirc.ts"的routes项和layouts/index.tsx的routeList方法中配置路由，访问生成的列表页组件。
## 字段类型规则

查询项：

- 名称、编号、手机号、邮箱、关键词：`Input`
- 状态、类型、来源、分类、等级：`Select`
- 时间范围、日期范围：`RangePicker`
- 其他：`Input`


## 输出要求

最终输出：

```text
生成文件：
- xxx.json
- xxx.jsx 或 xxx.tsx

校验结果：
- Schema 校验通过或失败原因

未确定信息：
- 列出所有无法从需求中确认的字段
```