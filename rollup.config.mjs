import typescript from '@rollup/plugin-typescript';

// Keep declaration imports from previously published packages working after source moves.
const legacyDeclarations = {
  'flake.d.ts': "export { Flake } from './core/flake';\nexport type { FlakeParams } from './core/flake';\n",
  'types.d.ts': "export type { SnowflakesParams, NormalizedSnowflakesOptions as SnowflakesInnerParams } from './core/options';\nexport type { ContainerSize } from './core/snowflakes';\n",
  'getDefaultParams.d.ts': "export { getDefaultOptions as getDefaultParams } from './core/options';\n",
  'normalizeParams.d.ts': "export { normalizeOptions as normalizeParams } from './core/options';\n",
  'calculations.d.ts': "export { SIZE_STEPS as maxInnerSize, calcSize, calcOpacity, calcDuration, calcDelay, calcTrajectory } from './animation/calculations';\nexport { getAnimationStyle } from './animation/keyframes';\n",
  'styles.d.ts': "export { SnowflakesStyles } from './styles/stylesheet-manager';\n",
  'helpers/dom.d.ts': "export * from '../utils/dom';\n",
  'helpers/number.d.ts': "export { randomInt as getRandom, interpolate as interpolation } from '../utils/math';\n",
};

export default [
  {
    input: './src/index.ts',
    output: {
      format: 'umd',
      name: 'Snowflakes',
      file: './dist/snowflakes.js'
    },
    plugins: [typescript({
      tsconfig: './tsconfig.json',
      noEmitOnError: true,
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }), {
      name: 'legacy-declaration-paths',
      generateBundle() {
        for (const [fileName, source] of Object.entries(legacyDeclarations)) {
          this.emitFile({ type: 'asset', fileName, source });
        }
      },
    }]
  },
  {
    input: './src/index.auto.ts',
    output: {
      format: 'iife',
      file: './dist/snowflakes.auto.js'
    },
    plugins: [typescript({ tsconfig: './tsconfig.json', noEmitOnError: true })]
  },
  {
    input: './src/index.ts',
    output: {
      format: 'es',
      file: './dist/snowflakes.esm.js'
    },
    plugins: [typescript({
      tsconfig: './tsconfig.json',
      noEmitOnError: true,
      target: 'ES2015',
    })]
  }
];
