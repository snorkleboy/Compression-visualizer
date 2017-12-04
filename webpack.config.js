// webpack.config.js
var path = require("path");
module.exports = {
  context: __dirname,
  entry: './imageReading.js',
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  }
}
