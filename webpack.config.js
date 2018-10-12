const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/addImage.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
        // publicPath: 'build/' // 知道如何寻找资源
        // chunkFilename: "[name].chunk.js"
    },
    resolve: {
        // 文件扩展名，写明后就不需要每个文件写后缀
        extensions: ['.js', '.css', '.json'],
        // 路径别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'css': path.resolve(__dirname, 'src/css')
        }
    },
    // 生成 source-map，用于打断点
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 限制图片大小为10000B，小于限制会将图片转换为base64格式
                        limit: 10000,
                        name: './images/[name].[hash].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                // use: ['style-loader', {
                //     loader: 'css-loader',
                //     options: {
                //         modules: true
                //     }
                // }]
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(), //用于生成html，并将最新打包后的js文件在html中引入
        new CleanWebpackPlugin( //用于对打包后的旧文件进行清除
            ['build/main.*.js', 'build/manifest.*.js', 'build/css/main.*.css'], //匹配要删除的文件
            {
                root: __dirname, // 根目录
                verbose: true, // 开启在控制台输出信息
                dry: false // 启用删除文件
            }
        ),
        new ExtractTextPlugin("./css/[name].[chunkhash].css"),
    ],
    optimization: {
        //     splitChunks: { //抽取共同代码
        //         chunks: 'initial', //显示块范围，initial(初始块)、async(按需加载块)、all(全部块)，默认为all
        //         minSize: 30000, //在压缩前的最小模块大小，默认为0
        //         maxSize: 0,
        //         minChunks: 1, // 被引用次数，默认为1
        //         maxAsyncRequests: 5, //最大的按需加载次数，默认为1
        //         maxInitialRequests: 3, //最大的初始化加载次数
        //         automaticNameDelimiter: '~',
        //         name: true, // 拆分出来块的名字，true表示根据模块和缓存组秘钥自动生成
        //         cacheGroups: { // 缓存组
        //             // 默认配置，可通过default: false禁用
        //             // default: false,
        //             // vendors: {
        //             //     test: /[\\/]node_modules[\\/]/, // 缓存组规则
        //             //     priority: -10
        //             // },
        //             // default: {
        //             //     minChunks: 2,
        //             //     priority: -20, // 表示缓存的优先级
        //             //     reuseExistingChunk: true // 表示可以使用已经存在的块
        //             // }
        //             // 默认配置
        //             commons: {
        //                 name: "commons",
        //                 chunks: "all",
        //                 minChunks: 2,
        //                 priority: 0
        //             },
        //             vendor: {
        //                 name: 'vendor',
        //                 test: /[\\/]node_modules[\\/]/,
        //                 chunks: 'all',
        //                 priority: 10
        //             }
        //         }
        //     }

        // 压缩 JS 代码
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    }
}