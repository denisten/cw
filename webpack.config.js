const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.tsx',
    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            tsConfigFile: 'tsconfig.json',
                            configFile: 'tslint.json',
                            failOnHint: true,
                            typeCheck: true,
                        }},
                    {loader: 'ts-loader', options: {
                        configFile: 'tsconfig.json'
                        }}
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpeg|jpg|icon|gif)$/,
                use: [
                    {
                    loader: "file-loader",
                    options: {
                        outputPath: 'images',
                        name: '[name]-[sha1:hash:7].[ext]',
                    }
                }]
            },
            {
                test: /\.(ttf|woff|otf|eot|woff2)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: 'fonts',
                        name: '[name].[ext]'
                    }
                }]
            }
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html"
        }),
        new TSLintPlugin({
            files: ['./src/**/*.tsx','./src/**/*.ts'],
            config: './tslint.json',
            project: './tsconfig.json'
        })
    ],

    devServer: {
        open: true,
        port: 5000,
        overlay: true,
    }
};