const autoprefixer = require('autoprefixer')


module.exports = {
  plugins: [
    autoprefixer({
      browsers:['ie >= 10', 'last 4 version']
    })
  ]
}