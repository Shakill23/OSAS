module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', // Disable multi-word component name requirement
    'no-unused-vars': 'warn', // Change unused variables from error to warning
    'no-undef': 'warn', // Change undefined variables from error to warning
    'vue/no-unused-components': 'warn', // Change unused component error to warning
    'no-cond-assign': ['error', 'always'], // Ensure conditional assignments are disallowed
    'no-constant-condition': 'error', // Disallow constant expressions in conditions
  },
}
