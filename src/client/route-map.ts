import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, lineFeatureCollection, type MapDefinition } from "../maps/basic-map.js"
import { routeMap } from "../maps/route-map.js"

export function createRouteMap(map: MapDefinition = routeMap) {
  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "walking-route",
            label: "Walking route",
            geojson: lineFeatureCollection(map),
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

  const bounds = map.bounds

  if (bounds) {
    instance.on("map:ready", () => {
      instance.fitToBounds(bounds)
    })
  }

  return instance
}

createRouteMap()
