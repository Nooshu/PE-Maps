import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import {
  interactiveMapOptions,
  polygonFeatureCollection,
  type MapDefinition
} from "../maps/basic-map.js"
import { treePreservationMap } from "../maps/tree-preservation-map.js"

export function createTreePreservationMap(map: MapDefinition = treePreservationMap) {
  const tpoWoodland = map.polygons.find((polygon) => polygon.id === "tpo-woodland")

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "tpo-woodland",
            label: "Woodland Tree Preservation Order",
            geojson: polygonFeatureCollection(map, ["tpo-woodland"]),
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

  const bounds = map.bounds

  if (bounds) {
    instance.on("map:ready", () => {
      instance.fitToBounds(bounds)
    })
  }

  return instance
}

createTreePreservationMap()
