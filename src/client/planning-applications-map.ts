import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import {
  interactiveMapOptions,
  polygonFeatureCollection,
  type MapDefinition
} from "../maps/basic-map.js"
import { planningApplicationsMap } from "../maps/planning-applications-map.js"

export function createPlanningApplicationsMap(map: MapDefinition = planningApplicationsMap) {
  const searchArea = map.polygons.find((polygon) => polygon.id === "search-area")

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "search-area",
            label: "Area searched",
            geojson: polygonFeatureCollection(map, ["search-area"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: searchArea?.strokeColor ?? "#1d70b8",
              strokeWidth: searchArea?.strokeWidth ?? 2,
              fill: "rgba(29, 112, 184, 0.12)",
              keySymbolShape: "polygon",
              symbolDescription: "Blue shaded area with a blue outline"
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

createPlanningApplicationsMap()
