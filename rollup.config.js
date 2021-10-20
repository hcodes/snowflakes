import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/ts/index.ts',
    output: {
      format: 'umd',
      name: 'Snowflakes',
      file: './dist/snowflakes.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
  },
  {
    input: 'src/ts/index.ts',
    output: {
      format: 'es',
      file: './dist/snowflakes.esm.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.esm.json' })]
  }
];
