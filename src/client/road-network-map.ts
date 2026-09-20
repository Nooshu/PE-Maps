import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import {
  interactiveMapOptions,
  lineFeatureCollection,
  polygonFeatureCollection,
  type MapDefinition
} from "../maps/basic-map.js"
import {
  roadNetworkMap,
  speedChangeRoadIds,
  strategicRoadIds
} from "../maps/road-network-map.js"

export function createRoadNetworkMap(map: MapDefinition = roadNetworkMap) {
  const changeArea = map.polygons.find((polygon) => polygon.id === "change-area")

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "change-area",
            label: "Proposed 20mph zone",
            geojson: polygonFeatureCollection(map, ["change-area"]),
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
            geojson: lineFeatureCollection(map, speedChangeRoadIds),
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
            geojson: lineFeatureCollection(map, strategicRoadIds),
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

  const bounds = map.bounds

  if (bounds) {
    instance.on("map:ready", () => {
      instance.fitToBounds(bounds)
    })
  }

  return instance
}

createRoadNetworkMap()
