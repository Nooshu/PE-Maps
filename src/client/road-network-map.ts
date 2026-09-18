import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import {
  interactiveMapOptions,
  lineFeatureCollection,
  polygonFeatureCollection
} from "../maps/basic-map.js"
import {
  roadNetworkMap,
  speedChangeRoadIds,
  strategicRoadIds
} from "../maps/road-network-map.js"

const changeArea = roadNetworkMap.polygons.find((polygon) => polygon.id === "change-area")

const map = new InteractiveMap(roadNetworkMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(roadNetworkMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "change-area",
          label: "Proposed 20mph zone",
          geojson: polygonFeatureCollection(roadNetworkMap, ["change-area"]),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: changeArea?.strokeColor ?? "#f47738",
            strokeWidth: changeArea?.strokeWidth ?? 2,
            fill: "rgba(244, 119, 56, 0.2)",
            keySymbolShape: "polygon",
            symbolDescription: "Orange shaded area with an orange outline"
          }
        },
        {
          id: "speed-change-roads",
          label: "Speed limit changing to 20mph",
          geojson: lineFeatureCollection(roadNetworkMap, speedChangeRoadIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: "#f47738",
            strokeWidth: 6,
            fill: "transparent",
            keySymbolShape: "line",
            symbolDescription: "Orange line"
          }
        },
        {
          id: "strategic-roads",
          label: "Strategic route, remains 30mph",
          geojson: lineFeatureCollection(roadNetworkMap, strategicRoadIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: "#1d70b8",
            strokeWidth: 5,
            fill: "transparent",
            keySymbolShape: "line",
            symbolDescription: "Blue line"
          }
        }
      ]
    }),
    createMapKeyPlugin()
  ]
})

const bounds = roadNetworkMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
