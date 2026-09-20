import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import {
  interactiveMapOptions,
  polygonFeatureCollection,
  type MapDefinition
} from "../maps/basic-map.js"
import { floodRiskMap } from "../maps/flood-risk-map.js"

export function createFloodRiskMap(map: MapDefinition = floodRiskMap) {
  const floodPolygon = map.polygons[0]

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "flood-risk-area",
            label: "Flood risk area",
            geojson: polygonFeatureCollection(map),
            minZoom: 1,
            showInMenu: false,
            style: {
              stroke: floodPolygon?.strokeColor ?? "#d4351c",
              strokeWidth: floodPolygon?.strokeWidth ?? 2,
              fill: "rgba(212, 53, 28, 0.4)"
            }
          }
        ]
      })
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

createFloodRiskMap()
