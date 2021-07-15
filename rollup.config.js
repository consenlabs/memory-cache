import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export const plugins = [
  localResolve(),
  nodeResolve({
    browser: true,
    extensions,
  }),
  typescript({
    typescript: require('typescript'),
    clean: true,
  }),
  json(),
  commonjs(),
]

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
    },
  ],
  plugins,
}
