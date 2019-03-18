const webpack = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

const output = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: 'dist/'
}

/*
 
                  888                   
                  888                   
                  888                   
 888d888 888  888 888  .d88b.  .d8888b  
 888P"   888  888 888 d8P  Y8b 88K      
 888     888  888 888 88888888 "Y8888b. 
 888     Y88b 888 888 Y8b.          X88 
 888      "Y88888 888  "Y8888   88888P' 
                                        
                                        
                                        
 
*/

const style_loader = {
  test: /\.scss$/,
  use: [
      "style-loader", // creates style nodes from JS strings
      "css-loader", // translates CSS into CommonJS
      "sass-loader" // compiles Sass to CSS, using Node Sass by default
  ]
}

const file_loader = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    "file-loader",
    {
      loader: "image-webpack-loader",
      options: {
        disable: true
      }
    }
  ]
}

const glsl_loader = {
  test: /\.(frag|vert|glsl)$/,
  use: [
    { 
      loader: 'glsl-shader-loader'
    }
  ]
}

const rules = [
  style_loader,
  file_loader,
  glsl_loader
]

/*
 
          888                   d8b                   
          888                   Y8P                   
          888                                         
 88888b.  888 888  888  .d88b.  888 88888b.  .d8888b  
 888 "88b 888 888  888 d88P"88b 888 888 "88b 88K      
 888  888 888 888  888 888  888 888 888  888 "Y8888b. 
 888 d88P 888 Y88b 888 Y88b 888 888 888  888      X88 
 88888P"  888  "Y88888  "Y88888 888 888  888  88888P' 
 888                        888                       
 888                   Y8b d88P                       
 888                    "Y88P"                        
 
*/

const plugins = [
]

module.exports = {
  entry: { build: './src/js/main.js' },
  output,
  module: { rules },
  performance: {hints: false},
  plugins,  
  devServer: { overlay: true }
}

/*
 
      888                   
      888                   
      888                   
  .d88888  .d88b.  888  888 
 d88" 888 d8P  Y8b 888  888 
 888  888 88888888 Y88  88P 
 Y88b 888 Y8b.      Y8bd8P  
  "Y88888  "Y8888    Y88P   
                            
                            
                            
 
*/

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // module.exports.plugins = (module.exports.plugins || []).concat([
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"production"'
  //     }
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //   }),
  //   new webpack.LoaderOptionsPlugin({
  //     minimize: true
  //   })
  // ])
}