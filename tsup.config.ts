import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  target: 'node20',
  format: ['cjs'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  shims: false,
  minify: true,
  tsconfig: './tsconfig.json',
})