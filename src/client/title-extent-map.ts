import InteractiveMap from "@defra/interactive-map"
import createDatasetsPlugin from "@defra/interactive-map/plugins/datasets"
import createMapKeyPlugin from "@defra/interactive-map/plugins/map-key"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import {
  interactiveMapOptions,
  polygonFeatureCollection,
  type MapDefinition
} from "../maps/basic-map.js"
import { titleExtentMap } from "../maps/title-extent-map.js"

export function createTitleExtentMap(map: MapDefinition = titleExtentMap) {
  const titleExtent = map.polygons.find((polygon) => polygon.id === "title-extent")

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "title-extent",
            label: "Registered title extent",
            geojson: polygonFeatureCollection(map, ["title-extent"]),
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

createTitleExtentMap()
