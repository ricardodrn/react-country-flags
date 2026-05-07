import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform, type Config } from '@svgr/core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SVG_DIR = resolve(ROOT, 'node_modules/flag-icons/flags/4x3');
const OUT_DIR = resolve(ROOT, 'src/flags');

const svgrOptions: Config = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default' as const,
        params: {
          overrides: { removeViewBox: false },
        },
      },
      { name: 'removeXMLNS' },
      { name: 'removeXlink' },
    ],
  },
  typescript: true,
  exportType: 'default',
  jsxRuntime: 'automatic',
};

function stripVendorStyles(svg: string): string {
  // Remove -inkscape-* vendor-prefixed CSS properties from inline style attributes
  return svg.replace(/-inkscape-[^;}"'\s]+[^;}"']*;?\s*/g, '');
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = await readdir(SVG_DIR);
  const svgFiles = files.filter(f => /^[a-z]{2}\.svg$/.test(f));

  const codes: string[] = [];
  const errors: string[] = [];

  await Promise.all(
    svgFiles.map(async file => {
      const code = file.slice(0, -4).toUpperCase();
      const svgContent = await readFile(join(SVG_DIR, file), 'utf-8');

      try {
        const tsx = await transform(stripVendorStyles(svgContent), svgrOptions, { componentName: code });
        await writeFile(join(OUT_DIR, `${code}.tsx`), tsx);
        codes.push(code);
        process.stdout.write(`✓ ${code}\n`);
      } catch (err) {
        errors.push(code);
        process.stderr.write(`✗ ${code}: ${err}\n`);
      }
    }),
  );

  codes.sort();

  const typesContent =
    `export type CountryCode =\n  | ` +
    codes.map(c => `'${c}'`).join('\n  | ') +
    `;\n`;
  await writeFile(resolve(ROOT, 'src/types.ts'), typesContent);

  const indexLines = [
    ...codes.map(c => `export { default as ${c} } from './flags/${c}';`),
    `export type { CountryCode } from './types';`,
  ];
  await writeFile(resolve(ROOT, 'src/index.ts'), indexLines.join('\n') + '\n');

  console.log(`\nGenerated ${codes.length} flags${errors.length ? `, ${errors.length} failed` : ''}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
