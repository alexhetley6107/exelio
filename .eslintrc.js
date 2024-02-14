module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['google'],
  rules: {
    'comma-dangle': 'off',
    'linebreak-style': 0,
    'require-jsdoc': 0,
    'object-curly-spacing': 0,
  },
};
