# react-country-flags
[![npm](https://img.shields.io/npm/v/@rdnr/react-country-flags)](https://www.npmjs.com/package/@rdnr/react-country-flags)
[![Socket Badge](https://badge.socket.dev/npm/package/@rdnr/react-country-flags/0.1.5)](https://badge.socket.dev/npm/package/@rdnr/react-country-flags/0.1.5)

A lightweight, performant React library for displaying country flags. Built with TypeScript, optimized for bundle size, and designed to scale from simple projects to complex applications.

- **257 flags** sourced from [flag-icons](https://github.com/lipis/flag-icons) — comprehensive global coverage
- **Zero runtime overhead** — each flag is a plain SVG React component, nothing more
- **True code splitting** — import only what you use, leave the rest out of your bundles
- **Two flexible APIs** — direct named import for known flags, lazy component for dynamic ones
- **Universal support** — ESM + CJS formats work with every modern bundler and Node.js environment

---

## Installation

Pick your favorite package manager:

```bash
npm i @rdnr/react-country-flags
# or
pnpm add @rdnr/react-country-flags
# or
yarn add @rdnr/react-country-flags
```

**Peer dependency:** React 17 or later. Make sure you have React already installed in your project.

---

## Usage

### Direct import — for known flags

When you know which flags you need ahead of time, import them directly. Your bundler will automatically tree-shake everything else, so you only pay for what you use.

```tsx
import { CL, US, DE } from '@rdnr/react-country-flags';

export default function App() {
  return (
    <div>
      <CL width={32} />
      <US width={32} />
      <DE width={32} />
    </div>
  );
}
```

Each flag component accepts all standard SVG attributes (`width`, `height`, `className`, `style`, etc.) via `SVGProps<SVGSVGElement>`, so styling and customization work exactly as you'd expect.

If you prefer being explicit about the import path:

```tsx
import CL from '@rdnr/react-country-flags/flags/CL';
```

### Lazy component — for dynamic flags

When the flag to display is decided at runtime (e.g., user selection, API response), use the `<Flag>` component. It loads each flag on demand with `React.lazy`, so nothing is fetched until the component actually renders.

```tsx
import { Suspense } from 'react';
import Flag from '@rdnr/react-country-flags/Flag';

export default function CountryBadge({ code }: { code: string }) {
  return (
    <Suspense fallback={<span>…</span>}>
      <Flag country={code} width={32} />
    </Suspense>
  );
}
```

`<Flag>` has built-in `<Suspense>` support, so you can pass a fallback directly if you prefer:

```tsx
<Flag country="BR" width={32} fallback={<span>…</span>} />
```

Invalid country codes are handled gracefully — the component renders nothing without errors or console output, keeping your app stable.

---

## API

### Named flag components

```ts
import { CL } from '@rdnr/react-country-flags';
// or
import CL from '@rdnr/react-country-flags/flags/CL';
```

| Prop | Type | Description |
|---|---|---|
| `width` | `number \| string` | SVG width |
| `height` | `number \| string` | SVG height |
| `className` | `string` | CSS class |
| `style` | `CSSProperties` | Inline styles |
| `...rest` | `SVGProps<SVGSVGElement>` | Any standard SVG attribute |

All flags render with a `viewBox` so they scale correctly from any `width`/`height`.

### `<Flag>` lazy component

```ts
import Flag from '@rdnr/react-country-flags/Flag';
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `country` | `CountryCode` | — | ISO 3166-1 alpha-2 code (uppercase) |
| `fallback` | `ReactNode` | `null` | Shown while the flag module loads |
| `...rest` | `SVGProps<SVGSVGElement>` | — | Forwarded to the underlying SVG |

### `CountryCode` type

The union of all 257 supported codes, generated automatically from the flag set.

```ts
import type { CountryCode } from '@rdnr/react-country-flags';

const code: CountryCode = 'CL'; // fully autocompleted
```

---

## Supported flags

All ISO 3166-1 alpha-2 codes from the `flag-icons` v7 collection, plus special regions like `EU`, `UN`, `XK` (Kosovo), `XX` (unknown), and several dependent territories.

For the complete list, check [src/types.ts](./src/types.ts).

---

## Bundle size

Each flag exists as an independent ESM module. When you import `CL`, only the Chile flag is added to your bundle — no central registry, no side effects, no bloat.

| Import | Size (gzipped) | Notes |
|---|---|---|
| Single simple flag (e.g. `FR`) | ~300 B | Minimal SVG content |
| Single complex flag (e.g. `GB`) | ~1–4 KB | Detailed SVG geometry |
| `<Flag>` component | ~1 KB | Flag data loaded only when needed |

The `package.json` includes `"sideEffects": false`, which tells webpack, Rollup, and esbuild that they can safely tree-shake unused flags.

---

## Development

### Requirements

- Node.js 18+
- npm 9+

### Getting started

```bash
git clone <repo>
cd @rdnr/react-country-flags
pnpm install
```

### Regenerate flags from source

Want to pick up the latest version of `flag-icons`? Just run:

```bash
pnpm run generate
```

This script (`scripts/generate-flags.ts`) handles the entire pipeline:

1. Reads SVG files from `node_modules/flag-icons/flags/4x3/` (only 2-letter country codes)
2. Strips vendor-prefixed CSS that would cause TypeScript issues
3. Converts each SVG into a TypeScript React component using SVGR + svgo
4. Writes the result to `src/flags/XX.tsx`
5. Regenerates `src/types.ts` with the updated `CountryCode` union and updates `src/index.ts` with fresh named exports

### Build for production

```bash
pnpm run build
```

This outputs to `dist/` using [tsup](https://tsup.egoist.dev/):

- `dist/index.{js,cjs}` — all named exports
- `dist/Flag.{js,cjs}` — the lazy Flag component
- `dist/flags/XX.{js,cjs}` — individual flag modules
- `*.d.ts` / `*.d.cts` — complete TypeScript declarations for all exports

### Type-check without building

If you just want to verify types without running a full build:

```bash
pnpm run typecheck
```

---

## Package configuration

### `package.json` exports

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./Flag": {
      "import": "./dist/Flag.js",
      "require": "./dist/Flag.cjs"
    },
    "./flags/*": {
      "import": "./dist/flags/*.js",
      "require": "./dist/flags/*.cjs"
    }
  },
  "sideEffects": false
}
```

### `tsup.config.ts`

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/Flag.tsx', 'src/flags/*.tsx'],
  format: ['esm', 'cjs'],
  splitting: true,
  treeshake: true,
  dts: true,
  clean: true,
  external: ['react'],
});
```

`splitting: true` ensures each flag is emitted as a standalone chunk — no flag data leaks into another flag's output.

---

## How code splitting works

### Direct imports

```ts
import { CL } from '@rdnr/react-country-flags';
// → dist/index.js re-exports from dist/flags/CL.js
// → only dist/flags/CL.js (+ its SVG chunk) makes it into your bundle
```

### Lazy component

```ts
// dist/Flag.js uses:
lazy(() => import('./flags/CL.js'))
// → dist/flags/CL.js is fetched only when the Flag component renders
```

Each `dist/flags/XX.js` is roughly 160 bytes — it re-exports from a content-hashed SVG chunk. The chunking is managed automatically by esbuild's code splitter, ensuring minimal overhead and maximum cache efficiency.

---

## License

MIT
