const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESlintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const filename = (ext) => (isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`);

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: path.resolve(__dirname, 'public', 'favicon.ico'), to: path.resolve(__dirname, 'dist') }],
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
    ];

    if (isDev) {
      base.push(new ESlintWebpackPlugin());
    }

    return base;
  };

  return {
    target: 'web',
    // context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
      clean: true,
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      watchFiles: './',
    },
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
