#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const [, , inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error(
    "Usage: node scripts/extract.js <requirement-file> <output-json-file>"
  );
  process.exit(1);
}

const documentText = fs.readFileSync(
  path.resolve(process.cwd(), inputFile),
  "utf8"
);

const prompt = `
你是一个前端需求结构化助手。

请从下面的中文需求文档中提取列表页配置，只返回合法 JSON，不要返回 Markdown 或解释。

要求：
1. 提取 searchFields、tableColumns、rowActions、toolbarActions。
2. 中文描述放入 label。
3. 根据语义生成 lowerCamelCase 的 name。
4. 不能确定的信息使用空字符串、null 或空数组。
5. 查询项和列表列必须严格区分。
6. 日期范围使用 daterange。
7. 状态、类型、来源等枚举字段提取 options 或 enumMap。

需求文档：

${documentText}
`;
async function main() {
  console.log("process.env.AI_API_URL", process.env.AI_API_URL);

  const response = await axios.post(
    process.env.AI_API_URL,
    {
      model: process.env.AI_MODEL,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: {
        type: "json_object"
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const content = response.data.choices[0].message.content;
  const result = JSON.parse(content);

  fs.mkdirSync(path.dirname(path.resolve(process.cwd(), outputFile)), {
    recursive: true
  });

  fs.writeFileSync(
    path.resolve(process.cwd(), outputFile),
    JSON.stringify(result, null, 2),
    "utf8"
  );

  console.log(`Generated: ${outputFile}`);
}

main().catch((error) => {
  console.error("Error during extraction:", error);
  console.error(error.response?.data || error.message);
  process.exit(1);
});