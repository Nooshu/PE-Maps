import InteractiveMap from "@defra/interactive-map"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

import { interactiveMapOptions, type MapDefinition } from "../maps/basic-map.js"
import { openMapButtonMap } from "../maps/open-map-button.js"

export function createOpenMapButton(map: MapDefinition = openMapButtonMap) {
  globalThis.document?.querySelector(".app-open-map-warning")?.remove()

  return new InteractiveMap(map.containerId, {
    mapProvider: maplibreProvider(),
    ...interactiveMapOptions(map)
  })
}

createOpenMapButton()
