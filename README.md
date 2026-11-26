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

`animate` returns a function that cancels the animation and leaves the property where it is. Call it before starting another animation on the same node.

```ts
const cancel = animate({ target: element, propriety: 'left', from: 0, to: 300 });
cancel();
```

`animate` throws a `RangeError` when `from`, `to` or `velocity` is not finite, when `stiffness` or `mass` is not above 0, or when `damping` is below 0. If the simulation diverges, it writes `to` and stops.

## License

MIT. See `LICENSE`.
