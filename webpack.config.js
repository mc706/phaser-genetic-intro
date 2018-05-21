const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: "pre",
                loader: 'tslint-loader',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {test: /pixi\.js$/, loader: 'expose-loader?PIXI'},
            {test: /phaser-split\.js$/, loader: 'expose-loader?Phaser'},
            {test: /p2\.js$/, loader: 'expose-loader?p2'},
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js')
        }
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Genetic Algorithm'
        }),

    ]
};