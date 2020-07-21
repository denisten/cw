const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');
const domain = 'dev.city.mts.ru';
const host = 'web.' + domain;
const backend = 'http://' + domain;
const wsConnectionProtocol = 'ws://' + domain;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  stats: {
    errors: true,
    warnings: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpeg|jpg|icon|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name]-[sha1:hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|otf|eot|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: 'localhost',
      openAnalyzer: true,
    }),
  ],

  devServer: {
    open: true,
    port: 5000,
    overlay: true,
    historyApiFallback: true,
    host: host,
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    proxy: {
      '/api': {
        target: backend,
        secure: false,
        changeOrigin: true,
      },
      '/ws': {
        target: wsConnectionProtocol,
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
