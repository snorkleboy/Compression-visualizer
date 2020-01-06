// webpack.config.js
var path = require("path");
module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname),
    filename: "./public/js/bundle.js"
  }
};
