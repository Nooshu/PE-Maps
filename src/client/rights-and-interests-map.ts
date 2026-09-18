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
  drainageEasementIds,
  privateRightOfWayIds,
  publicFootpathIds,
  rightsAndInterestsMap
} from "../maps/rights-and-interests-map.js"

const titleExtent = rightsAndInterestsMap.polygons.find((polygon) => polygon.id === "title-extent")
const publicFootpath = rightsAndInterestsMap.lines.find((line) => line.id === "public-footpath")
const privateRightOfWay = rightsAndInterestsMap.lines.find(
  (line) => line.id === "private-right-of-way"
)
const drainageEasement = rightsAndInterestsMap.lines.find((line) => line.id === "drainage-easement")

const map = new InteractiveMap(rightsAndInterestsMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(rightsAndInterestsMap),
  plugins: [
    createDatasetsPlugin({
      hasMenu: false,
      datasets: [
        {
          id: "title-extent",
          label: "Registered title extent",
          geojson: polygonFeatureCollection(rightsAndInterestsMap, ["title-extent"]),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: titleExtent?.strokeColor ?? "#d4351c",
            strokeWidth: titleExtent?.strokeWidth ?? 3,
            fill: "rgba(212, 53, 28, 0.35)",
            keySymbolShape: "polygon",
            symbolDescription: "Red filled area with a red outline"
          }
        },
        {
          id: "private-right-of-way",
          label: "Private right of way",
          geojson: lineFeatureCollection(rightsAndInterestsMap, privateRightOfWayIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: privateRightOfWay?.color ?? "#f47738",
            strokeWidth: privateRightOfWay?.width ?? 5,
            fill: "transparent",
            keySymbolShape: "line",
            symbolDescription: "Orange line"
          }
        },
        {
          id: "drainage-easement",
          label: "Drainage easement",
          geojson: lineFeatureCollection(rightsAndInterestsMap, drainageEasementIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: drainageEasement?.color ?? "#1d70b8",
            strokeWidth: drainageEasement?.width ?? 4,
            fill: "transparent",
            keySymbolShape: "line",
            symbolDescription: "Blue line"
          }
        },
        {
          id: "public-footpath",
          label: "Public footpath",
          geojson: lineFeatureCollection(rightsAndInterestsMap, publicFootpathIds),
          minZoom: 1,
          showInMenu: false,
          showInKey: true,
          style: {
            stroke: publicFootpath?.color ?? "#00703c",
            strokeWidth: publicFootpath?.width ?? 4,
            fill: "transparent",
            keySymbolShape: "line",
            symbolDescription: "Green line"
          }
        }
      ]
    }),
    createMapKeyPlugin()
  ]
})

const bounds = rightsAndInterestsMap.bounds

if (bounds) {
  map.on("map:ready", () => {
    map.fitToBounds(bounds)
  })
}
