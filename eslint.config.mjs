import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintRecommended from "eslint/conf/eslint-recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintRecommended
});

// Old Config
// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// New Config
const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "next", 'eslint:recommended'],
    plugins: ["@typescript-eslint"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"]
    }
  })
];
export default eslintConfig;
