module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    // eslint-disable-next-line quote-props
    browser: true,
    // eslint-disable-next-line quote-props
    node: true,
    // eslint-disable-next-line quote-props
    es6: true,
    'jest/globals': true,
    // eslint-disable-next-line quote-props
    jest: true,
  },
  extends: ['google'],
  rules: {
    'comma-dangle': 'off',
    'linebreak-style': 0,
    'require-jsdoc': 0,
    'object-curly-spacing': 0,
    'max-len': 0,
    ['indent']: 0,
  },
  plugins: ['jest'],
};
