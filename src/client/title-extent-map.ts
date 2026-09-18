import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, polygonFeatureCollection } from "../maps/basic-map.js"
import { titleExtentMap } from "../maps/title-extent-map.js"

const titleExtent = titleExtentMap.polygons.find((polygon) => polygon.id === "title-extent")

const map = new InteractiveMap(titleExtentMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(titleExtentMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "title-extent",
          label: "Registered title extent",
          geojson: polygonFeatureCollection(titleExtentMap, ["title-extent"]),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: titleExtent?.strokeColor ?? "#d4351c",
            strokeWidth: titleExtent?.strokeWidth ?? 3,
            fill: "rgba(212, 53, 28, 0.35)",
            keySymbolShape: "polygon",
            symbolDescription: "Red filled area with a red outline"
          }
        }
      ]
    }),
    createMapKeyPlugin()
  ]
})

const bounds = titleExtentMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
