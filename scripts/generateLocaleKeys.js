/**
 * Auto-generate localeKeys.js from translation files
 * Reads ar.json and generates a JavaScript object with autocomplete support
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to convert snake_case to camelCase
const toCamelCase = (str) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

function generateLocaleKeys() {
  const localesDir = path.join(__dirname, "..", "src", "locales");
  const arTranslationPath = path.join(localesDir, "ar.json");

  if (!fs.existsSync(arTranslationPath)) {
    console.error("❌ Arabic translation file not found!");
    return;
  }

  const translations = JSON.parse(fs.readFileSync(arTranslationPath, "utf8"));

  const flatKeys = {};
  const nestedKeys = {};

  function processKeys(obj, prefix = "") {
    Object.keys(obj).forEach((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Convert the namespace name itself to camelCase for the variable name
        const camelNamespace = toCamelCase(key);

        if (!nestedKeys[camelNamespace]) {
          nestedKeys[camelNamespace] = {};
        }
        processNestedKeys(obj[key], nestedKeys[camelNamespace], fullKey);
      } else {
        flatKeys[toCamelCase(key)] = key;
      }
    });
  }

  function processNestedKeys(obj, target, prefix) {
    Object.keys(obj).forEach((key) => {
      const fullKey = `${prefix}.${key}`;
      target[toCamelCase(key)] = fullKey;
    });
  }

  processKeys(translations);

  let content = `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated from translation files
// Run 'npm run generate-keys' to update

/**
 * Translation keys - Use this object instead of string literals
 */
export const localeKeys = ${JSON.stringify(flatKeys, null, 2).replace(/"([^"]+)":/g, "$1:")};

`;

  // Add namespaces with camelCase variable names
  Object.keys(nestedKeys).forEach((namespace) => {
    // This will now generate "export const resetPasswordKeys" instead of "reset_passwordKeys"
    content += `/**
 * ${namespace.charAt(0).toUpperCase() + namespace.slice(1)} namespace keys
 */
export const ${namespace}Keys = ${JSON.stringify(nestedKeys[namespace], null, 2).replace(/"([^"]+)":/g, "$1:")};

`;
  });

  content += `// Default export\nexport default localeKeys;\n`;

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
}

generateLocaleKeys();
