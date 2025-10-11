const { default: autoprefixer } = require("autoprefixer");

module.exports = {
  plugins: {
    autoprefixer: {},
    'css-declaration-sorter': {order: 'smacss'},
    'postcss-import': {}

  }
}
