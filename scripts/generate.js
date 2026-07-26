#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const [, , inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error(
    "Usage: node scripts/generate.js <json-file> <output-file>"
  );
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), inputFile);
const templatePath = path.resolve(
  __dirname,
  "../templates/react-antd-list.hbs"
);
const outputPath = path.resolve(process.cwd(), outputFile);

Handlebars.registerHelper("json", (value) =>
  JSON.stringify(value || {}).replace(/<\/script/gi, "<\\/script")
);

Handlebars.registerHelper("ifEquals", function (left, right, options) {
  return left === right ? options.fn(this) : options.inverse(this);
});

function toComponentName(pageName) {
  const value = String(pageName || "Generated")
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "")
    .replace(/列表页|列表|管理/g, "");

  return `${value || "Generated"}ListPage`;
}

const config = JSON.parse(fs.readFileSync(inputPath, "utf8"));

if (fs.existsSync(outputPath)) {
  console.error(`Refusing to overwrite existing file: ${outputPath}`);
  process.exit(1);
}

const template = Handlebars.compile(
  fs.readFileSync(templatePath, "utf8")
);

const code = template({
  ...config,
  componentName: toComponentName(config.pageName)
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, code, "utf8");

console.log(`Generated: ${outputPath}`);