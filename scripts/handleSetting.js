const fs = require('fs');
const path = require('path');

const skillSetDir = path.resolve(__dirname, '../skillSet');

// 读取skill配置文件，并返回一个包含所有配置的数组
function readSkillSetConfigs() {
  const configs = [];

  if (!fs.existsSync(skillSetDir)) {
    throw new Error(`Skill set directory not found: ${skillSetDir}`);
  }

  const files = fs.readdirSync(skillSetDir);

  for (const fileName of files) {
    if (path.extname(fileName).toLowerCase() !== '.json') {
      continue;
    }

    const filePath = path.join(skillSetDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    try {
      const config = JSON.parse(fileContent);
      configs.push({ fileName, config });
    } catch (error) {
      throw new Error(`Failed to parse JSON file ${filePath}: ${error.message}`);
    }
  }

  return configs;
}

module.exports = {
  readSkillSetConfigs,
};
