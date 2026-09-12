module.exports = (ctx) => ({
    map: ctx.options.map,
    parser: ctx.options.parser,
    plugins: [
        require('autoprefixer')(),
        require('postcss-nested').default(),
        require('cssnano')(),
        require('postcss-inline-svg')(),
    ],
  })
