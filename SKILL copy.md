---
name: list-page-generator
description: 从中文需求文档中提取列表页查询项、表格列、操作按钮和接口信息，生成符合 Schema 的 JSON，并通过 JavaScript 模板生成 React 或 Vue 列表页。当用户提到列表页生成、需求文档转 JSON、查询条件抽取、表格字段抽取或页面代码生成时使用。
---

# 列表页生成 Skill

## 任务目标

将中文列表页需求转换为结构化 JSON，再根据 JSON 生成页面组件。

## 执行流程

1. 读取用户指定的需求文档。
2. 提取列表页相关内容：
   - 页面名称
   - 查询条件
   - 列表字段
   - 行操作
   - 顶部操作
   - 接口和分页信息
3. 根据 `schemas/list-page.schema.json` 生成 JSON。
4. 不确定的信息使用空字符串、`null` 或空数组，不得编造接口地址和字段含义。
5. 使用 `scripts/validate.js` 校验 JSON。
6. 校验失败时修复 JSON，直到通过校验。
7. 使用 `scripts/generate.js` 生成页面组件。
8. 生成前检查目标文件是否存在，禁止未经确认覆盖已有业务代码。
9. 使用项目现有的框架、组件库、请求封装和目录规范。

## 字段类型规则

查询项：

- 名称、编号、手机号、邮箱、关键词：`Input`
- 状态、类型、来源、分类、等级：`Select`
- 多选条件：`multipleSelect`
- 时间范围、日期范围：`RangePicker`
- 其他：`Input`

列表列：

- 普通文本：`text`
- 金额、价格、余额：`money`
- 日期和时间：`datetime`
- 状态、标签：`tag`
- 图片、头像、封面：`image`
- 百分比：`percent`

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