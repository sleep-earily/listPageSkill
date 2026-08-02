// 运行命令 node ./scripts/createFile.js output/user-list.json ./pages
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const createCompFile = (inputFilePath, inputText) => {
  if (!inputFilePath || !inputText) {
    console.error(
      "Usage: node scripts/createFile.js <json-file> <output-dir>"
    );
    return null;
  }

  if (fs.existsSync(inputFilePath)) {
    console.log(`File exists, overwriting: ${inputFilePath}`);
  }
  // 确保输出目录存在
  fs.mkdirSync(path.dirname(inputFilePath), { recursive: true });
  fs.writeFileSync(inputFilePath, inputText, "utf8");
  console.log(`Generated: ${inputFilePath}`);

}

module.exports = {
  createCompFile,
};

