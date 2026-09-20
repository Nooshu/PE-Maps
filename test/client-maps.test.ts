import { describe, expect, it } from "vitest"

import { createBasicMap } from "../src/client/map.js"
import { createCountrysideSchemesMap } from "../src/client/countryside-schemes-map.js"
import { createFloodRiskMap } from "../src/client/flood-risk-map.js"
import { createLocalAuthorityMap } from "../src/client/local-authority-map.js"
import { createPlanningApplicationsMap } from "../src/client/planning-applications-map.js"
import { createPlanningMap } from "../src/client/planning-map.js"
import { createRightsAndInterestsMap } from "../src/client/rights-and-interests-map.js"
import { createRoadNetworkMap } from "../src/client/road-network-map.js"
import { createRouteMap } from "../src/client/route-map.js"
import { createTitleExtentMap } from "../src/client/title-extent-map.js"
import { createTransportStatisticsMap } from "../src/client/transport-statistics-map.js"
import { createTreePreservationMap } from "../src/client/tree-preservation-map.js"
import { countrysideSchemesMap } from "../src/maps/countryside-schemes-map.js"
import { floodRiskMap } from "../src/maps/flood-risk-map.js"
import { localAuthorityMap } from "../src/maps/local-authority-map.js"
import { planningApplicationsMap } from "../src/maps/planning-applications-map.js"
import { planningMap } from "../src/maps/planning-map.js"
import { rightsAndInterestsMap } from "../src/maps/rights-and-interests-map.js"
import { roadNetworkMap } from "../src/maps/road-network-map.js"
import { routeMap } from "../src/maps/route-map.js"
import { titleExtentMap } from "../src/maps/title-extent-map.js"
import { transportStatisticsMap } from "../src/maps/transport-statistics-map.js"
import { treePreservationMap } from "../src/maps/tree-preservation-map.js"
import { MockInteractiveMap } from "./mocks/interactive-map.js"
import { mapFixture } from "./helpers/map-fixture.js"

describe("client maps", () => {
  it("initialises every example with the real map data and fits bounds when ready", () => {
    const created = MockInteractiveMap.instances.filter((instance) =>
      [
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
      ].some((map) => instance.containerId === map.containerId)
    )

    expect(created.length).toBeGreaterThan(0)

    for (const instance of MockInteractiveMap.instances) {
      instance.emitReady()
    }

    const fitted = MockInteractiveMap.instances.filter(
      (instance) => instance.fitToBoundsCalls.length > 0
    )
    expect(fitted.length).toBeGreaterThan(0)
  })

  it("uses style fallbacks when overlays and bounds are missing", () => {
    const empty = mapFixture({ bounds: undefined, polygons: [], lines: [], markers: [] })

    createBasicMap(empty)
    createRouteMap(empty)
    createFloodRiskMap(empty)
    createPlanningMap(empty)
    createTreePreservationMap(empty)
    createTitleExtentMap(empty)
    createRoadNetworkMap(empty)
    createCountrysideSchemesMap(empty)
    createLocalAuthorityMap(empty)
    createRightsAndInterestsMap(empty)
    createPlanningApplicationsMap(empty)
    createTransportStatisticsMap(empty)

    const withoutBounds = MockInteractiveMap.instances.at(-1)
    withoutBounds?.emitReady()
    expect(withoutBounds?.fitToBoundsCalls).toEqual([])
  })
})
