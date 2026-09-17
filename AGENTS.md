# AGENTS.md

Spring physics helper that drives a CSS length on a DOM node. The working demo is the inline script in `index.html`. `src/main.ts` exports the same `animate` function.

## Layout

- `index.html` is the demo. Open it directly or through Vite.
- `src/main.ts` is the TypeScript source. `tsconfig.json` has `noEmit: true`.
- `package.json` scripts use Vite 4 (`dev`, `build`, `preview`). `bun.lockb` is the lockfile.
- There is no published `dist/` in this tree.

## Commands

Scripts are Vite 4. Run `bun install` then `bun run dev`.

```bash
bun install
bun run dev
```

## Invariants

The call shape is `animate({ target, propriety, from, to, params })`. `propriety` is the CSS property name. Values are written as `px`.
