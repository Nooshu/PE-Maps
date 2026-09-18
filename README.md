# PE-Maps

Proof of concept for a progressively enhanced maps blog post.

This app serves GOV.UK Frontend example map pages, including a basic map of London at `/basic-map` using the [Defra Interactive Map](https://github.com/DEFRA/interactive-map).

## Run locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

`npm start` copies cached static map images, builds the page and static assets, pre-compresses them with Brotli, then serves the `.br` files with `Content-Encoding: br` when the browser supports it.

No-JS fallback maps are generated from OpenStreetMap’s public raster tiles. Those servers are run on donations and cannot take heavy load, so the PNGs are committed under `assets/images/static-maps/`. Normal builds copy the cached images. Only run this when a map’s centre, zoom, size, or overlays change:

```bash
npm run maps:static
```

Then commit the updated files in `assets/images/static-maps/`.

For local development with live reload of the server and client bundle:

```bash
npm run dev
```
