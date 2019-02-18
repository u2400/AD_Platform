const path = require('path');

module.exports = {
  configureWebpack: {
    output: {
      path: path.resolve(__dirname,"../server/", 'assert'),
      filename: 'index.js'
    }
  }
}