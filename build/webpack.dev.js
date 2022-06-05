const webpackConfig = require('./webpack.config.js')
const {merge} = require('webpack-merge')
module.exports = merge(webpackConfig,{
  mode:'development',
  devtool: 'hidden-source-map',
  devServer:{
    port:3000,
    hot:true,
    static:'../dist'
  },
  plugins:[
  ]
})
