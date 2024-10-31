import path from 'path';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: './src/ts/index.ts',
    output: {
      format: 'umd',
      name: 'Snowflakes',
      file: './dist/snowflakes.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.lib.umd.json' })]
  },
  {
    input: './src/ts/index.auto.ts',
    output: {
      format: 'iife',
      file: './dist/snowflakes.auto.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.auto.json' })]
  },
  {
    input: './src/ts/index.ts',
    output: {
      format: 'es',
      file: './dist/snowflakes.esm.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.lib.esm.json' })]
  },
  {
    input: './examples/constructor/src/index.ts',
    output: {
      format: 'iife',
      file: './examples/constructor/dist/index.js'
    },
    plugins: [
        typescript({ tsconfig: './tsconfig.constructor.json' }),
        postcss({
            config: true,
            extract: path.resolve('./examples/constructor/dist/index.css')
        }),
    ]
  }
];
