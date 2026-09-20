import type { MapDefinition } from "../../src/maps/basic-map.js"

export function mapFixture(overrides: Partial<MapDefinition> = {}): MapDefinition {
  return {
    containerId: "map",
    mapLabel: "Test map",
    behaviour: "inline",
    zoom: 10,
    center: [0, 51],
    width: 100,
    height: 100,
    mapStyle: {
      url: "https://example.test/style",
      attribution: "Test",
      backgroundColor: "#ffffff"
    },
    markers: [],
    lines: [],
    polygons: [],
    staticImageSrc: "/images/test.png",
    staticImageAttribution: "Test",
    ...overrides
  }
}
