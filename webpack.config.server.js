const path = require('path')
const webpack = require('webpack')



module.exports = {
  target: "node",
  entry: './src/server.js',
  node: {
    __dirname: false 
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  }

}
