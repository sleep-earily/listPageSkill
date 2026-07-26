#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const [, , inputFile] = process.argv;
console.log("Validating list page JSON:", inputFile);
if (!inputFile) {
  console.error("Usage: node scripts/validate.js <json-file>");
  process.exit(1);
}

const schemaPath = path.resolve(__dirname, "../schemas/list-page.schema.json");
const dataPath = path.resolve(process.cwd(), inputFile);
console.log("Using schema:", schemaPath);
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const ajv = new Ajv({
  allErrors: true,
  strict: false
});

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error(JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}

console.log("List page JSON is valid.");
