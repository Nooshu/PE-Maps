import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, lineFeatureCollection } from "../maps/basic-map.js"
import { routeMap } from "../maps/route-map.js"

const map = new InteractiveMap(routeMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(routeMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "walking-route",
          label: "Walking route",
          geojson: lineFeatureCollection(routeMap),
          minZoom: 1,
          showInMenu: false,
          style: {
            stroke: "#1d70b8",
            strokeWidth: 5,
            fill: "transparent"
          }
        }
      ]
    })
  ]
})

const bounds = routeMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
