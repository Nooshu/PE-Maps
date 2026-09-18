import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, polygonFeatureCollection } from "../maps/basic-map.js"
import { floodRiskMap } from "../maps/flood-risk-map.js"

const floodPolygon = floodRiskMap.polygons[0]

const map = new InteractiveMap(floodRiskMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(floodRiskMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "flood-risk-area",
          label: "Flood risk area",
          geojson: polygonFeatureCollection(floodRiskMap),
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

const bounds = floodRiskMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
