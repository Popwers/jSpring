# jSpring

Spring physics helper for a CSS length on a DOM node. Drag the sliders in the demo to see stiffness, damping, and mass.

## Run the demo

Open `index.html` in a browser. The demo script lives in that file.

To use the Vite 4 setup that is already in `package.json`:

```bash
bun install
bun run dev
```

`bun.lockb` is the lockfile.

## API

`src/main.ts` exports `animate`:

```ts
animate({
	target: element,
	propriety: 'left',
	from: 0,
	to: 300,
	params: { stiffness: 0.5, damping: 1, mass: 10, velocity: 0 },
});
```

`propriety` is the CSS property to set. The helper writes `position + 'px'` on each frame.

## License

MIT. See `LICENSE`.
