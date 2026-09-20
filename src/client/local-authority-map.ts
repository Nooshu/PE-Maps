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
import { localAuthorityMap } from "../maps/local-authority-map.js"

export function createLocalAuthorityMap(map: MapDefinition = localAuthorityMap) {
  const southGloucestershire = map.polygons.find(
    (polygon) => polygon.id === "south-gloucestershire"
  )
  const bristol = map.polygons.find((polygon) => polygon.id === "bristol")
  const authorityBoundary = map.lines.find((line) => line.id === "authority-boundary")

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "south-gloucestershire",
            label: "South Gloucestershire",
            geojson: polygonFeatureCollection(map, ["south-gloucestershire"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: southGloucestershire?.strokeColor ?? "#1d70b8",
              strokeWidth: southGloucestershire?.strokeWidth ?? 2,
              fill: "rgba(29, 112, 184, 0.35)",
              keySymbolShape: "polygon",
              symbolDescription: "Blue filled area with a blue outline"
            }
          },
          {
            id: "bristol",
            label: "Bristol City Council",
            geojson: polygonFeatureCollection(map, ["bristol"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: bristol?.strokeColor ?? "#f47738",
              strokeWidth: bristol?.strokeWidth ?? 2,
              fill: "rgba(244, 119, 56, 0.35)",
              keySymbolShape: "polygon",
              symbolDescription: "Orange filled area with an orange outline"
            }
          },
          {
            id: "authority-boundary",
            label: "Local authority boundary",
            geojson: lineFeatureCollection(map, ["authority-boundary"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: authorityBoundary?.color ?? "#0b0c0c",
              strokeWidth: authorityBoundary?.width ?? 4,
              fill: "transparent",
              keySymbolShape: "line",
              symbolDescription: "Black line"
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

createLocalAuthorityMap()
