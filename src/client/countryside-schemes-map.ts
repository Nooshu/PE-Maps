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
  countrysideSchemesMap,
  designatedSiteIds,
  eligibleParcelIds,
  notAvailableParcelIds,
  watercourseBufferIds
} from "../maps/countryside-schemes-map.js"

export function createCountrysideSchemesMap(map: MapDefinition = countrysideSchemesMap) {
  const eligibleParcel = map.polygons.find((polygon) => polygon.id === "fosse-field")
  const notAvailableParcel = map.polygons.find((polygon) => polygon.id === "lansdowne-ground")
  const watercourseBuffer = map.polygons.find((polygon) => polygon.id === "windrush-buffer")
  const designatedSite = map.polygons.find((polygon) => polygon.id === "salmonsbury-sssi")
  const riverWindrush = map.lines.find((line) => line.id === "river-windrush")

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "salmonsbury-sssi",
            label: "Salmonsbury Meadows SSSI, not on this holding",
            geojson: polygonFeatureCollection(map, designatedSiteIds),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: designatedSite?.strokeColor ?? "#d4351c",
              strokeWidth: designatedSite?.strokeWidth ?? 3,
              fill: "rgba(212, 53, 28, 0.2)",
              fillPattern: "diagonal-cross-hatch",
              fillPatternForegroundColor: "#d4351c",
              fillPatternBackgroundColor: "rgba(212, 53, 28, 0.15)",
              keySymbolShape: "polygon",
              symbolDescription: "Red hatched area with a red outline"
            }
          },
          {
            id: "eligible-parcels",
            label: "Available to select",
            geojson: polygonFeatureCollection(map, eligibleParcelIds),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: eligibleParcel?.strokeColor ?? "#00703c",
              strokeWidth: eligibleParcel?.strokeWidth ?? 3,
              fill: "rgba(0, 112, 60, 0.35)",
              keySymbolShape: "polygon",
              symbolDescription: "Green filled area with a green outline"
            }
          },
          {
            id: "not-available-parcels",
            label: "Already in an agreement",
            geojson: polygonFeatureCollection(map, notAvailableParcelIds),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: notAvailableParcel?.strokeColor ?? "#f47738",
              strokeWidth: notAvailableParcel?.strokeWidth ?? 3,
              fill: "rgba(244, 119, 56, 0.35)",
              keySymbolShape: "polygon",
              symbolDescription: "Orange filled area with an orange outline"
            }
          },
          {
            id: "windrush-buffer",
            label: "6 metre watercourse buffer",
            geojson: polygonFeatureCollection(map, watercourseBufferIds),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: watercourseBuffer?.strokeColor ?? "#1d70b8",
              strokeWidth: watercourseBuffer?.strokeWidth ?? 2,
              fill: "rgba(29, 112, 184, 0.4)",
              keySymbolShape: "polygon",
              symbolDescription: "Blue strip"
            }
          },
          {
            id: "river-windrush",
            label: "River Windrush",
            geojson: lineFeatureCollection(map, ["river-windrush"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: riverWindrush?.color ?? "#1d70b8",
              strokeWidth: riverWindrush?.width ?? 4,
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

createCountrysideSchemesMap()
