import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, polygonFeatureCollection } from "../maps/basic-map.js"
import { treePreservationMap } from "../maps/tree-preservation-map.js"

const tpoWoodland = treePreservationMap.polygons.find((polygon) => polygon.id === "tpo-woodland")

const map = new InteractiveMap(treePreservationMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(treePreservationMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "tpo-woodland",
          label: "Woodland Tree Preservation Order",
          geojson: polygonFeatureCollection(treePreservationMap, ["tpo-woodland"]),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: tpoWoodland?.strokeColor ?? "#00703c",
            strokeWidth: tpoWoodland?.strokeWidth ?? 3,
            fill: "rgba(0, 112, 60, 0.2)",
            fillPattern: "diagonal-cross-hatch",
            fillPatternForegroundColor: "#00703c",
            fillPatternBackgroundColor: "rgba(0, 112, 60, 0.15)",
            keySymbolShape: "polygon",
            symbolDescription: "Green hatched area with a green outline"
          }
        }
      ]
    }),
    createMapKeyPlugin()
  ]
})

const bounds = treePreservationMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
