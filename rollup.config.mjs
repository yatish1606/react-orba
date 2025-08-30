import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false,
      plugins: [terser()],
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false,
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    typescript(),
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
  external: ['react', 'react-dom'],
};
