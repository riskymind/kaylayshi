import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;

export default [
  // 1. Global ignore both the folder and all d.ts files within
  globalIgnores([
    "app/generated/",
    "**/*.d.ts"
  ]),

  // 2. Your existing Next.js and TypeScript config
  {
    ignores: [], // additional ignore patterns (if needed)
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript"
  ),
];