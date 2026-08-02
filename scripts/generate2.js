// 运行命令 node ./scripts/generate2.js output/user-list2.json 2.tsx
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const { createCompFile } = require("./createCompFile");


const [, , inputFile, outputFile, outputDir, templateDir] = process.argv;

if (!inputFile || !outputFile) {
  console.error(
    "Usage: node scripts/generate.js <json-file> <output-file> [output-dir] [template-dir]"
  );
  process.exit(1);
}
// 临时输出目录
let tempOutputDir = outputDir || path.dirname(outputFile);
// 模板目录
let templateDir2 =  path.resolve(__dirname, templateDir) || path.resolve(__dirname, ".claude/skills/list-page-generator/templates/react-antd-list2.hbs");


const inputPath = path.resolve(process.cwd(), inputFile);
const templatePath = path.resolve(
  __dirname,
  templateDir2
);
const outputPath = path.resolve(process.cwd(), outputFile);

Handlebars.registerHelper("formatJson", (value) =>
  JSON.stringify(value || {}, 2).replace(/<\/script/gi, "<\\/script")
);

Handlebars.registerHelper("ifEquals", function (left, right, options) {
  return left === right ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("formatAlign", function (name) {
  console.log("name", name);
  return name === "序号" ? true : false;
});

function toComponentName(pageName) {
  const value = String(pageName || "Generated")
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "")
    .replace(/列表页|列表|管理/g, "");

  return `${value || "Generated"}ListPage`;
}

// 读取json文件
const config = JSON.parse(fs.readFileSync(inputPath, "utf8"));
// console.log("config", config);
// 获取组件名称
const componentName = config.componentName || '';
// 读取模板文件
const template = Handlebars.compile(
  fs.readFileSync(templatePath, "utf8")
);
// 生成模板
const code = template({
  ...config,
  // componentName: toComponentName(config.pageName)
});
console.log("模板生成成功", );

// 写入文件
createCompFile(`${tempOutputDir}/${componentName}.tsx`, code);

// // 检测是否存在文件，若存在则不生成,测试中注释 TEST
// // if (fs.existsSync(outputPath)) {
// //   console.error(`Refusing to overwrite existing file: ${outputPath}`);
// //   process.exit(1);
// // }
// console.log("templatePath", templatePath);
// const template = Handlebars.compile(
//   fs.readFileSync(templatePath, "utf8")
// );


// // fs.mkdirSync(path.dirname(outputPath), { recursive: true });
// fs.writeFileSync(outputPath, code, "utf8");

// console.log(`Generated: ${outputPath}`);