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
import { planningMap } from "../maps/planning-map.js"

export function createPlanningMap(map: MapDefinition = planningMap) {
  const developmentSite = map.polygons.find((polygon) => polygon.id === "development-site")
  const wildlifeAndTrees = map.polygons.find((polygon) => polygon.id === "wildlife-and-trees")
  const constructionAccess = map.lines.find((line) => line.id === "construction-access")

  const instance = new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map),
    plugins: [
      createDatasetsPlugin({
        hasMenu: false,
        datasets: [
          {
            id: "development-site",
            label: "Appeal site (red line boundary)",
            geojson: polygonFeatureCollection(map, ["development-site"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: developmentSite?.strokeColor ?? "#d4351c",
              strokeWidth: developmentSite?.strokeWidth ?? 3,
              fill: "rgba(212, 53, 28, 0.35)",
              keySymbolShape: "polygon",
              symbolDescription: "Red filled area with a red outline"
            }
          },
          {
            id: "wildlife-and-trees",
            label: "Wildlife and trees",
            geojson: polygonFeatureCollection(map, ["wildlife-and-trees"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: wildlifeAndTrees?.strokeColor ?? "#00703c",
              strokeWidth: wildlifeAndTrees?.strokeWidth ?? 3,
              fill: "rgba(0, 112, 60, 0.2)",
              fillPattern: "diagonal-cross-hatch",
              fillPatternForegroundColor: "#00703c",
              fillPatternBackgroundColor: "rgba(0, 112, 60, 0.15)",
              keySymbolShape: "polygon",
              symbolDescription: "Green hatched area with a green outline"
            }
          },
          {
            id: "construction-access",
            label: "Construction access",
            geojson: lineFeatureCollection(map, ["construction-access"]),
            minZoom: 1,
            showInMenu: false,
            showInKey: true,
            style: {
              stroke: constructionAccess?.color ?? "#1d70b8",
              strokeWidth: constructionAccess?.width ?? 6,
              fill: "transparent",
              keySymbolShape: "line",
              symbolDescription: "Blue line along Phoenix Causeway"
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

createPlanningMap()
