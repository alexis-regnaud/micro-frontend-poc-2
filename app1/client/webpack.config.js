const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;
const dotenv = require('dotenv').config({ path: '../.env' }).parsed;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3002,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
    proxy: {
      '/api': `http://localhost:${dotenv.PORT}`,
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: `${dotenv.APP1_URL}/`,
    chunkFilename: '[id].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        shell: `shell@${dotenv.SHELL_URL}/remoteEntry.js`,
      },
      exposes: {
        './routes': './src/routes',
        './Navigation': './src/Navigation',
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv),
    }),
  ],
};
