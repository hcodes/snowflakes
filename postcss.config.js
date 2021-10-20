module.exports = (ctx) => ({
    map: ctx.options.map,
    parser: ctx.options.parser,
    plugins: {
        autoprefixer: {},
        'postcss-nested': {},
        cssnano: {},
        'postcss-inline-svg': {},
    },
  })
