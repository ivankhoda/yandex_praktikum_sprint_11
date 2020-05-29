

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';



module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use:  [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|ico|svg)$/i,
                loader: 'file-loader?name=./images/[name].[ext]',
                options: {
                    esModule: false,
                },

            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            template: './src/index.html',
          minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
     },
        }
      ),
        new WebpackMd5Hash()
    ],

};
