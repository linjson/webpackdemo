var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//[chunkhash].
module.exports = {
    entry: {
        main:'./app/index.js',
        // main: ['webpack-hot-middleware/client','./app/index.js'],
        // vendor: ['lodash', 'jquery','react','react-dom']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
        // }),
        // 开启全局的模块热替换（HMR）
        // new webpack.HotModuleReplacementPlugin(),
        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
        // new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('[name].css'),
        //js压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     },
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendor-manifest.json'),
            extensions: [".js", ".jsx"]
        }),
        //当全局变量,但window.jQuery编译后,是__webpack_provided_window_dot_jQuery
        // new webpack.ProvidePlugin({
        //     "window.jQuery": "jquery",
        // })
        // //css压缩
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        // })
        //css压缩
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: { discardComments: {removeAll: true } },
        //     canPrint: true
        // }),
    ],
    watch: false,

    devtool: 'source-map',
    devServer: {
        port: 7777,
        host: 'localhost',
        historyApiFallback: true,
    },

    module: {

        loaders: [
            //需要在js上加上require("expose-loader?!jquery");才是真正的全局变量window.jQuery
            {test: require.resolve('jquery'), loader: 'expose-loader?jQuery'},
            // {test: require.resolve('react'), loader: 'expose-loader?React'},
            // {test: require.resolve('react-dom'), loader: 'expose-loader?ReactDOM'},
            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff2|woff)$/i,
                exclude: /^node_modules$/,
                loader: ['url-loader?limit=5000&name=img/[hash:8].[name].[ext]']
            },
        ],

    },
};