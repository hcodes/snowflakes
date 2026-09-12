import path from 'node:path';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssConfig from './postcss.config.mjs';

export default {
  input: './examples/constructor/src/main.ts',
  output: {
    format: 'iife',
    file: './examples/constructor/dist/index.js',
  },
  plugins: [
    typescript({ tsconfig: './examples/constructor/tsconfig.json', noEmitOnError: true }),
    postcss({
      config: false,
      plugins: postcssConfig.plugins,
      extract: path.resolve('./examples/constructor/dist/index.css'),
    }),
  ],
};
