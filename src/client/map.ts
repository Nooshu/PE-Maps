import InteractiveMap from "@defra/interactive-map"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { basicMap, interactiveMapOptions, type MapDefinition } from "../maps/basic-map.js"

export function createBasicMap(map: MapDefinition = basicMap) {
  return new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map)
  })
}

createBasicMap()
