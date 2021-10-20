import typescript from '@rollup/plugin-typescript';

const plugins = [typescript({ tsconfig: './tsconfig.json' })];

export default [
  {
    input: 'src/ts/index.ts',
    output: {
      format: 'umd',
      name: 'Snowflakes',
      file: './dist/snowflakes.js'
    },
    plugins,
  },
  {
    input: 'src/ts/index.ts',
    output: {
      format: 'es',
      file: './dist/snowflakes.esm.js'
    },
    plugins,
  }
];
