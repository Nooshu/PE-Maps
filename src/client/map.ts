import InteractiveMap from "@defra/interactive-map"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { basicMap, interactiveMapOptions } from "../maps/basic-map.js"

new InteractiveMap(basicMap.containerId, {
  mapProvider: maplibreProvider(),
  ...interactiveMapOptions(basicMap)
})
