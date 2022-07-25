module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
};
