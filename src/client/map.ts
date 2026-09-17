import InteractiveMap from "@defra/interactive-map"
import maplibreProvider from "@defra/interactive-map/providers/maplibre"

new InteractiveMap("map", {
  mapProvider: maplibreProvider(),
  behaviour: "inline",
  mapLabel: "Map of London, United Kingdom",
  zoom: 12,
  center: [-0.1276, 51.5074],
  containerHeight: "600px",
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  }
})
