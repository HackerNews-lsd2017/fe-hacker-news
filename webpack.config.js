const path = require('path');
const webpack = require('webpack');

module.exports= {
  entry:'./public/index.jsx',
  output: {
    path: __dirname,
    filename:'./public/bundle.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*','.js','.jsx']
  },
  module :{
    rules:[{
      use : 'babel-loader',
      query :{
        presets:['react','es2015','es2017']
      },
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/
    }]
  }
};