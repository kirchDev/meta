# A Vite plugin that bundles only the Iconify icons you use

Scans your source for icon names, resolves each one against the installed collections at build time, and puts exactly those icons in the bundle. The Iconify API is never asked at runtime.

## why

The usual integration fetches icon data from the Iconify API at runtime. That fails offline, renders nothing under server-side rendering, and makes the build unpredictable. Shipping whole collections instead trades that for megabytes of icons nobody uses.

This plugin takes the third route. It searches the source for strings of the form prefix and name, resolves each against the installed collections, and emits a virtual module registering exactly those icons. What ends up in the bundle is what is actually written in the code.

## quickstart

```ts
import 'virtual:iconify-bundle';
```

A single side-effect import registers every icon the scan found. From then on they work offline, render on the server, and cost no request.

## features

- **Only the icons in use** — the bundle carries what the scan found, not the complete collection.
- **A scan, not an analysis** — the search covers all three string delimiters, so a name in a comment counts too. That is deliberate: a wrong name then fails loudly instead of quietly rendering nothing.
- **Unknown names stop the build** — an icon the installed collection does not know fails the build rather than shipping a gap.
- **Five options** — everything else is convention.
- **Survives hot module replacement** — editing a source file invalidates the virtual module, so a newly written icon name shows up without a restart.

## scope

The scan is also the boundary. Names assembled at runtime are invisible to it, the plugin takes no custom SVG, it does not transform the icon data, and it serves no bundler other than Vite.

On Nuxt the icon integration there is the better fit: it already carries the same scan and falls back to the API for a collection you have not installed, where this plugin fails the build.

## install

```pnpm
pnpm add -D @kirchdev/vite-plugin-iconify-bundle @iconify-json/lucide
```

```npm
npm install -D @kirchdev/vite-plugin-iconify-bundle @iconify-json/lucide
```

One data package per collection you want scanned; the plugin reads their data off disk at build time. The default lists two collections and is almost certainly not yours, which is why a prefix with no entry never reaches the scan at all.
