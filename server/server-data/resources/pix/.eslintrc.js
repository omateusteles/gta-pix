const { off } = require("process");

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-import-module-exports': 'off',
    'import/prefer-default-export': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'object-curly-spacing': 'off',
    'padded-blocks': 'off',
    'object-curly-newline': 'off',
    "import/extensions": 'off',
    "import/no-extraneous-dependencies": ["error", {devDependencies: true}],
    "no-param-reassign": 0,
    "no-restricted-syntax": 'off'
    quotes: 'off',
    indent: 'off',
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
