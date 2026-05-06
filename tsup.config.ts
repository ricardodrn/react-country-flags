import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/Flag.tsx', 'src/flags/*.tsx'],
  format: ['esm', 'cjs'],
  splitting: true,
  treeshake: true,
  dts: true,
  clean: true,
  external: ['react'],
  outDir: 'dist',
  sourcemap: false,
});
