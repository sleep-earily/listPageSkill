---
name: list-page-generator
description: 从中文需求中提取列表页配置，校验 JSON Schema，并生成 React Ant Design 列表页代码。适用于列表页生成、需求文档转 JSON、查询条件提取和表格字段提取。
---
# List Page Generator
## 工作流程
1. 读取用户需求文档。
2. 调用 `scripts/extract.js` 生成页面配置。
3. 调用 `scripts/validate.js` 校验配置。
4. 校验失败时修复配置。
5. 校验通过后调用 `scripts/generate.js` 生成代码。
6. 不覆盖已有文件。