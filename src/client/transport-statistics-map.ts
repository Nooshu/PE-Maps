import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, polygonFeatureCollection } from "../maps/basic-map.js"
import {
  highBusUseIds,
  lowBusUseIds,
  mediumBusUseIds,
  transportStatisticsMap,
  veryHighBusUseIds
} from "../maps/transport-statistics-map.js"

const veryHigh = transportStatisticsMap.polygons.find((polygon) => polygon.id === "birmingham")
const high = transportStatisticsMap.polygons.find((polygon) => polygon.id === "sandwell")
const medium = transportStatisticsMap.polygons.find((polygon) => polygon.id === "walsall")
const low = transportStatisticsMap.polygons.find((polygon) => polygon.id === "solihull")

const map = new InteractiveMap(transportStatisticsMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(transportStatisticsMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "very-high-bus-use",
          label: "60 or more journeys per person",
          geojson: polygonFeatureCollection(transportStatisticsMap, veryHighBusUseIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: veryHigh?.strokeColor ?? "#003078",
            strokeWidth: veryHigh?.strokeWidth ?? 2,
            fill: "rgba(0, 48, 120, 0.75)",
            keySymbolShape: "polygon",
            symbolDescription: "Darkest blue area"
          }
        },
        {
          id: "high-bus-use",
          label: "45 to 59 journeys per person",
          geojson: polygonFeatureCollection(transportStatisticsMap, highBusUseIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: high?.strokeColor ?? "#003078",
            strokeWidth: high?.strokeWidth ?? 2,
            fill: "rgba(29, 112, 184, 0.7)",
            keySymbolShape: "polygon",
            symbolDescription: "Dark blue area"
          }
        },
        {
          id: "medium-bus-use",
          label: "30 to 44 journeys per person",
          geojson: polygonFeatureCollection(transportStatisticsMap, mediumBusUseIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: medium?.strokeColor ?? "#003078",
            strokeWidth: medium?.strokeWidth ?? 2,
            fill: "rgba(86, 148, 202, 0.7)",
            keySymbolShape: "polygon",
            symbolDescription: "Mid blue area"
          }
        },
        {
          id: "low-bus-use",
          label: "Fewer than 30 journeys per person",
          geojson: polygonFeatureCollection(transportStatisticsMap, lowBusUseIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: low?.strokeColor ?? "#003078",
            strokeWidth: low?.strokeWidth ?? 2,
            fill: "rgba(179, 215, 246, 0.8)",
            keySymbolShape: "polygon",
            symbolDescription: "Light blue area"
          }
        }
      ]
    }),
    createMapKeyPlugin()
  ]
})

const bounds = transportStatisticsMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
