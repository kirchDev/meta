# Portrait recap video from GPX tracks

Turns the GPX files of a hiking holiday into a single portrait video in which every tour draws itself onto a map, one after another.

## why

Anyone summarising a week of hiking reaches for a map service soon enough. Their free tiers either put a logo in the frame or forbid use in video, and the terms of service are the least interesting thing about a hiking film.

So hike-recap uses no map tiles at all. Hillshade and contour lines are computed from public elevation data, land cover and labels come from an OpenStreetMap extract, and everything is drawn as SVG with one canvas layer on top. What remains is a short line naming the data sources, because their licences require it.

## quickstart

```bash
pnpm fetch:geodata && pnpm ingest && pnpm render
```

Three steps on a folder of GPX files: fetch the geodata, read the tours, render. What comes out is an MP4 at 1080 × 1920.

## features

- **A map without a map server** — no tiles, no key, no quota and no foreign logo in the frame.
- **A viewport that grows** — the view opens tight on the first tour and pulls back before each later one, just far enough that everything already drawn still fits.
- **Even pacing** — draw time follows the length of a tour, so the moving head keeps the same speed everywhere.
- **Only the summits you climbed** — a summit is labelled when a tour actually touches it, matched by coordinate, because summit names repeat within a region.
- **Any region, any language** — zoom level, elevation colours and route colours follow the data, and the wording comes from a locale file.

## scope

hike-recap is not a video editor and not a general map renderer. It produces exactly one shape: several tours drawing themselves onto one shared map, one after another. There is no cutting, no music, no transitions and no title cards.

The figures do not come from the tracks either. Distance, ascent, descent and duration live in a file beside the GPX files, because exports frequently carry no elevation at all and their distances drift.

## install

```bash
git clone https://github.com/TitusKirch/hike-recap.git
cd hike-recap
pnpm install
pnpm exec playwright install --with-deps chromium
```

Node 24 or newer, pnpm 11 and ffmpeg are required. Elevation data and the OpenStreetMap extract are not in the repository, because they only ever apply to one region; the first of the three steps above builds them from your own tracks.
