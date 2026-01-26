/**
 * Auto-generate localeKeys.js from translation files
 * Reads ar.json and generates a JavaScript object with autocomplete support
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateLocaleKeys() {
  const localesDir = path.join(__dirname, "..", "src", "locales");
  const arTranslationPath = path.join(localesDir, "ar.json");

  // Check if Arabic translation file exists
  if (!fs.existsSync(arTranslationPath)) {
    console.error("❌ Arabic translation file not found!");
    console.error(`Expected path: ${arTranslationPath}`);
    return;
  }

  const translations = JSON.parse(fs.readFileSync(arTranslationPath, "utf8"));

  // Generate objects for keys
  const flatKeys = {};
  const nestedKeys = {};

  function processKeys(obj, prefix = "") {
    Object.keys(obj).forEach((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Nested key (namespace)
        if (!nestedKeys[key]) {
          nestedKeys[key] = {};
        }
        processNestedKeys(obj[key], nestedKeys[key], fullKey);
      } else {
        // Flat key - convert snake_case to camelCase
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        flatKeys[camelCaseKey] = key;
      }
    });
  }

  function processNestedKeys(obj, target, prefix) {
    Object.keys(obj).forEach((key) => {
      const fullKey = `${prefix}.${key}`;
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      target[camelCaseKey] = fullKey;
    });
  }

  processKeys(translations);

  // Generate file content
  let content = `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated from translation files
// Run 'npm run generate-keys' to update

/**
 * Translation keys - Use this object instead of string literals
 * Provides autocomplete and prevents typos
 */
export const localeKeys = ${JSON.stringify(flatKeys, null, 2).replace(/"([^"]+)":/g, "$1:")};

`;

  // Add namespaces
  Object.keys(nestedKeys).forEach((namespace) => {
    content += `/**
 * ${namespace.charAt(0).toUpperCase() + namespace.slice(1)} namespace keys
 */
export const ${namespace}Keys = ${JSON.stringify(nestedKeys[namespace], null, 2).replace(/"([^"]+)":/g, "$1:")};

`;
  });

  content += `// Default export
export default localeKeys;
`;

  // Save file
  const outputPath = path.join(
    __dirname,
    "..",
    "src",
    "utils",
    "localeKeys.js",
  );
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);

  console.log("✅ Successfully generated localeKeys.js!");
  console.log(`📝 Number of flat keys: ${Object.keys(flatKeys).length}`);
  console.log(`📦 Number of namespaces: ${Object.keys(nestedKeys).length}`);
}

// Run the generator
generateLocaleKeys();
