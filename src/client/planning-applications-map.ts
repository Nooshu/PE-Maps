import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, polygonFeatureCollection } from "../maps/basic-map.js"
import { planningApplicationsMap } from "../maps/planning-applications-map.js"

const searchArea = planningApplicationsMap.polygons.find((polygon) => polygon.id === "search-area")

const map = new InteractiveMap(planningApplicationsMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(planningApplicationsMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "search-area",
          label: "Area searched",
          geojson: polygonFeatureCollection(planningApplicationsMap, ["search-area"]),
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

const bounds = planningApplicationsMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
