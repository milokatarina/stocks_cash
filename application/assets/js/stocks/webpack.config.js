const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const publicFolderRelativePath = '../../../../public/stocks';
const fileName = 'stocks';
module.exports = (env, argv) => {
  console.log(argv.mode === 'production');
  const isProduction = argv.mode === 'production';

  const config = {
    entry: { [fileName]: './src/index.js' },
    output: {
      path: path.resolve(__dirname, publicFolderRelativePath),
      filename: '[name]/index.js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'styled-components': path.resolve('.', 'node_modules', 'styled-components')
      }
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              envName: isProduction ? 'production' : 'development'
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            failOnWarning: isProduction,
            failOnError: isProduction
          }
        }
      ]
    },
    stats: {
      assets: true,
      colors: true,
      errors: true,
      errorDetails: true,
      hash: true
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    },
    performance: {
      hints: 'warning'
    },
    plugins: [
      // , new BundleAnalyzerPlugin()
    ]
  };
  if (!isProduction) {
    config.devtool = 'source-map';
  }
  return config;
};
