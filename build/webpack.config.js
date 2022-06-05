// webpack.config.js

const path = require('path');
// 自动插入生成文件到html中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清空上次打包文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 拆分css 将css从html中拆分
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 复制静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Webpack = require('webpack')

module.exports = {
    mode:'development', // 开发模式
    entry: ["@babel/polyfill",path.resolve(__dirname,'../src/index.js')],    // 入口文件 polyfill用来转化es8以上的es语法
    output: {
        filename: 'output.js',      // 打包后的文件名称
        path: path.resolve(__dirname,'../dist')  // 打包后的目录
    },
    devServer:{
        port:3000,
        hot:true, // 开启热更新
        static:'../dist' // 新版的webpack-dev-server中，contentBase已经被移除了，用static替代。
    },
    module:{
        rules:[
          {
            test:/\.css$/,
            use:['style-loader','css-loader'] // 从右向左解析原则
          },
          {
            test:/\.less$/,
            use:[MiniCssExtractPlugin.loader,'css-loader','less-loader',{
                loader: 'postcss-loader', // 为css添加浏览器前缀
                options: {
                    postcssOptions: {
                        plugins: [
                          ["autoprefixer"],
                        ],
                      }
                }
            }] // 从右向左解析原则
          },
          {
            test:/\.js$/,
            use:{
              loader:'babel-loader', // 转化es678的语法
              options:{
                presets:['@babel/preset-env']
              }
            },
            exclude:/node_modules/
          }
        ]
      },
    plugins:[
        new HtmlWebpackPlugin({
          template:path.resolve(__dirname,'../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CopyWebpackPlugin({ // 复制静态资源
            patterns: [
              {
                from: '*.js',
                context: path.resolve(__dirname, "../public/js"),
                to: path.resolve(__dirname, '../dist/js'),
              },
            ],
          })
      ]
}
