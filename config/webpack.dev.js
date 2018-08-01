const path = require('path');
//js压缩
const uglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var website = {
    publicPath: "http://localhost:9090/"
}
module.exports = {
    mode: 'development',
    //多入口
    entry: {
        main: './src/main.js',
        main2: './src/main2.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        // publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "sass-loader",
                        },
                        {
                            loader: "postcss-loader",

                        },
                    ],
                    //内部资源引用相对路径
                    publicPath:'../',
                }),

            },
            {
                test: /\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use: [{
                    loader: 'url-loader', //是指定使用的loader和loader的配置参数
                    options: {
                        limit: 500,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath: 'images/'//打包路径
                    }
                }]
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        // new uglify(),
        new HtmlWebpackPlugin({
            minify: { //是对html文件进行压缩
                removeAttributeQuotes: true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template: './src/index.html' //是要打包的html模版路径和文件名称。

        }),
        new ExtractTextPlugin('css/[name].css'),
        new PurifyCSSPlugin({
            //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。注意文件路径
            paths: glob.sync(path.join(__dirname, '../src/*.html')),
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname,'../dist/vendor-manifest.json'),
        }),
//css压缩
//         new OptimizeCssAssetsPlugin({
//             assetNameRegExp: /\.css$/g,
//             cssProcessor: require('cssnano'),
//             cssProcessorOptions: { discardComments: {removeAll: true } },
//             canPrint: true
//         }),

    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        compress: true,
        port: 9090,
    }
}
