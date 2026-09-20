import { describe, expect, it } from "vitest"

import { routeCoordinates } from "../src/maps/buckingham-westminster-coordinates.js"
import { countrysideSchemesMap } from "../src/maps/countryside-schemes-map.js"
import { floodRiskMap } from "../src/maps/flood-risk-map.js"
import { localAuthorityMap } from "../src/maps/local-authority-map.js"
import { planningMap } from "../src/maps/planning-map.js"
import { planningApplicationsMap } from "../src/maps/planning-applications-map.js"
import { rightsAndInterestsMap } from "../src/maps/rights-and-interests-map.js"
import { roadNetworkMap } from "../src/maps/road-network-map.js"
import { routeMap } from "../src/maps/route-map.js"
import { staticMapDefinitions } from "../src/maps/static-map-definitions.js"
import { titleExtentMap } from "../src/maps/title-extent-map.js"
import { transportStatisticsMap } from "../src/maps/transport-statistics-map.js"
import { treePreservationMap } from "../src/maps/tree-preservation-map.js"
import { basicMap } from "../src/maps/basic-map.js"

const maps = [
  basicMap,
  routeMap,
  floodRiskMap,
  planningMap,
  treePreservationMap,
  titleExtentMap,
  roadNetworkMap,
  countrysideSchemesMap,
  localAuthorityMap,
  rightsAndInterestsMap,
  planningApplicationsMap,
  transportStatisticsMap
]

describe("map definitions", () => {
  it("exports a walking route with many coordinates", () => {
    expect(routeCoordinates.length).toBeGreaterThan(50)
    expect(routeMap.lines[0]?.coordinates).toBe(routeCoordinates)
  })

  it("registers every example map for static rendering", () => {
    expect(staticMapDefinitions).toEqual(maps)
  })

  it("gives every map a static image, centre and overlays array", () => {
    for (const map of maps) {
      expect(map.containerId).toBe("map")
      expect(map.staticImageSrc.endsWith(".png")).toBe(true)
      expect(map.center).toHaveLength(2)
      expect(Array.isArray(map.markers)).toBe(true)
      expect(Array.isArray(map.lines)).toBe(true)
      expect(Array.isArray(map.polygons)).toBe(true)
    }
  })
})
