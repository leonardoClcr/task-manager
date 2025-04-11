module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react-hooks/recommended", "prettier"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["react-hooks", "react-refresh"],
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  };
  