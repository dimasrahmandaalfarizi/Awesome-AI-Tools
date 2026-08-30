import { defineConfig } from 'tsup'

export default defineConfig([
  // CLI binary — minimal, no sourcemaps for npm publish
  {
    entry: { 'cli/index': 'src/cli/index.ts' },
    format: ['cjs'],
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: false,
    minify: true,
    treeshake: true,
    tsconfig: 'tsconfig.lib.json',
    outDir: 'dist',
  },
  // Library — ESM + CJS + types
  {
    entry: { 'lib/index': 'src/lib/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: false,
    minify: true,
    treeshake: true,
    tsconfig: 'tsconfig.lib.json',
    outDir: 'dist',
  },
])
