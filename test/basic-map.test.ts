import { describe, expect, it } from "vitest"

import {
  basicMap,
  countrysideAreaSummaryParams,
  countrysideKeyTableParams,
  countrysideParcelDetailsParams,
  countrysideParcelsTableParams,
  directionsTableParams,
  interactiveMapOptions,
  lineFeatureCollection,
  localAuthorityKeyTableParams,
  localAuthorityServicesSummaryParams,
  planningApplicationsDetailsSummaryParams,
  planningApplicationsKeyTableParams,
  planningApplicationsTableParams,
  planningFacilitiesSummaryParams,
  planningKeyTableParams,
  planningRoadsTableParams,
  planningTimetableTableParams,
  polygonFeatureCollection,
  rightsInterestDetailsSummaryParams,
  rightsInterestsTableParams,
  rightsKeyTableParams,
  roadKeyTableParams,
  roadSpeedTableParams,
  roadUnchangedTableParams,
  titleKeyTableParams,
  titleSurroundingSummaryParams,
  tpoKeyTableParams,
  tpoTreeDetailsSummaryParams,
  tpoTreesTableParams,
  transportStatisticsKeyTableParams,
  transportStatisticsTableParams,
  type MapDefinition
} from "../src/maps/basic-map.js"
import { countrysideSchemesMap } from "../src/maps/countryside-schemes-map.js"
import { localAuthorityMap } from "../src/maps/local-authority-map.js"
import { planningMap } from "../src/maps/planning-map.js"
import { planningApplicationsMap } from "../src/maps/planning-applications-map.js"
import { rightsAndInterestsMap } from "../src/maps/rights-and-interests-map.js"
import { roadNetworkMap } from "../src/maps/road-network-map.js"
import { routeMap } from "../src/maps/route-map.js"
import { titleExtentMap } from "../src/maps/title-extent-map.js"
import { transportStatisticsMap } from "../src/maps/transport-statistics-map.js"
import { treePreservationMap } from "../src/maps/tree-preservation-map.js"
import { openMapButtonMap } from "../src/maps/open-map-button.js"
import { mapFixture } from "./helpers/map-fixture.js"

const tableFns: Array<(map: MapDefinition) => unknown> = [
  planningKeyTableParams,
  planningTimetableTableParams,
  planningRoadsTableParams,
  planningFacilitiesSummaryParams,
  tpoKeyTableParams,
  tpoTreesTableParams,
  tpoTreeDetailsSummaryParams,
  titleKeyTableParams,
  titleSurroundingSummaryParams,
  roadKeyTableParams,
  roadSpeedTableParams,
  roadUnchangedTableParams,
  countrysideKeyTableParams,
  countrysideParcelsTableParams,
  countrysideAreaSummaryParams,
  countrysideParcelDetailsParams,
  directionsTableParams,
  localAuthorityKeyTableParams,
  localAuthorityServicesSummaryParams,
  rightsKeyTableParams,
  rightsInterestsTableParams,
  rightsInterestDetailsSummaryParams,
  planningApplicationsKeyTableParams,
  planningApplicationsTableParams,
  planningApplicationsDetailsSummaryParams,
  transportStatisticsKeyTableParams,
  transportStatisticsTableParams
]

describe("interactiveMapOptions", () => {
  it("omits optional marker fields when they are absent", () => {
    const options = interactiveMapOptions(
      mapFixture({
        markers: [{ id: "plain", coordinates: [0, 0] }]
      })
    )

    expect(options.markers[0]?.options).toEqual({})
  })

  it("includes colour, label and showLabel when provided", () => {
    const options = interactiveMapOptions(routeMap)
    const palace = options.markers.find((marker) => marker.id === "buckingham-palace")

    expect(palace?.options).toEqual({
      backgroundColor: "#1d70b8",
      label: "Buckingham Palace",
      showLabel: true
    })
  })

  it("includes colour, label and showLabel independently", () => {
    expect(
      interactiveMapOptions(mapFixture({ markers: [{ id: "c", coordinates: [0, 0], color: "#000" }] }))
        .markers[0]?.options
    ).toEqual({ backgroundColor: "#000" })
    expect(
      interactiveMapOptions(mapFixture({ markers: [{ id: "l", coordinates: [0, 0], label: "Here" }] }))
        .markers[0]?.options
    ).toEqual({ label: "Here" })
    expect(
      interactiveMapOptions(
        mapFixture({ markers: [{ id: "s", coordinates: [0, 0], showLabel: true }] })
      ).markers[0]?.options
    ).toEqual({ showLabel: true })
    expect(
      interactiveMapOptions(
        mapFixture({ markers: [{ id: "n", coordinates: [0, 0], showLabel: false }] })
      ).markers[0]?.options
    ).toEqual({})
  })

  it("passes a custom open-map label when the map starts as a button", () => {
    expect(interactiveMapOptions(openMapButtonMap)).toMatchObject({
      behaviour: "buttonFirst",
      buttonText: "Open map of London",
      hasExitButton: true,
      mapLabel: basicMap.mapLabel,
      center: basicMap.center,
      zoom: basicMap.zoom
    })
  })

  it("leaves button options off an inline map", () => {
    const options = interactiveMapOptions(basicMap)

    expect(options.behaviour).toBe("inline")
    expect(options).not.toHaveProperty("buttonText")
    expect(options).not.toHaveProperty("hasExitButton")
  })

  it("includes colour and label without showLabel", () => {
    const options = interactiveMapOptions(planningApplicationsMap)
    const marker = options.markers[0]

    expect(marker?.options).toMatchObject({
      backgroundColor: expect.any(String),
      label: expect.any(String)
    })
    expect(marker?.options).not.toHaveProperty("showLabel")
  })
})

describe("feature collections", () => {
  it("returns every line when no ids are given and filters when they are", () => {
    const all = lineFeatureCollection(roadNetworkMap)
    const none = lineFeatureCollection(roadNetworkMap, [])
    const some = lineFeatureCollection(roadNetworkMap, ["new-street"])

    expect(all.features.length).toBe(roadNetworkMap.lines.length)
    expect(none.features).toEqual([])
    expect(some.features).toHaveLength(1)
    expect(some.features[0]?.properties.id).toBe("new-street")
  })

  it("closes polygons, keeps closed rings, and leaves empty rings alone", () => {
    const empty = polygonFeatureCollection(
      mapFixture({
        polygons: [{ id: "empty", coordinates: [] }]
      })
    )
    const closed = polygonFeatureCollection(
      mapFixture({
        polygons: [
          {
            id: "closed",
            coordinates: [
              [0, 0],
              [1, 0],
              [0, 0]
            ]
          }
        ]
      })
    )
    const open = polygonFeatureCollection(
      mapFixture({
        polygons: [
          {
            id: "open",
            coordinates: [
              [0, 0],
              [1, 0],
              [1, 1]
            ]
          }
        ]
      })
    )
    const sameLongitude = polygonFeatureCollection(
      mapFixture({
        polygons: [
          {
            id: "same-x",
            coordinates: [
              [0, 0],
              [0, 1]
            ]
          }
        ]
      })
    )
    const filtered = polygonFeatureCollection(planningMap, ["development-site"])
    const all = polygonFeatureCollection(planningMap)

    expect(empty.features[0]?.geometry.coordinates[0]).toEqual([])
    expect(closed.features[0]?.geometry.coordinates[0]).toHaveLength(3)
    expect(open.features[0]?.geometry.coordinates[0]?.at(-1)).toEqual([0, 0])
    expect(sameLongitude.features[0]?.geometry.coordinates[0]?.at(-1)).toEqual([0, 0])
    expect(filtered.features).toHaveLength(1)
    expect(all.features.length).toBe(planningMap.polygons.length)
  })
})

describe("table params", () => {
  it("returns undefined when the related map data is missing", () => {
    for (const tableFn of tableFns) {
      expect(tableFn(basicMap)).toBeUndefined()
      expect(tableFn(mapFixture())).toBeUndefined()
    }
  })

  it("builds GOV.UK table params from each map's data", () => {
    expect(directionsTableParams(routeMap)?.rows).toHaveLength(routeMap.directions?.steps.length ?? 0)
    expect(planningKeyTableParams(planningMap)?.caption).toBe("Map key")
    expect(planningTimetableTableParams(planningMap)?.rows.length).toBeGreaterThan(0)
    expect(planningRoadsTableParams(planningMap)?.rows.length).toBeGreaterThan(0)
    expect(planningFacilitiesSummaryParams(planningMap)?.rows.length).toBeGreaterThan(0)
    expect(tpoKeyTableParams(treePreservationMap)?.rows.length).toBeGreaterThan(0)
    expect(tpoTreesTableParams(treePreservationMap)?.rows.length).toBeGreaterThan(0)
    expect(tpoTreeDetailsSummaryParams(treePreservationMap)?.rows.length).toBeGreaterThan(0)
    expect(titleKeyTableParams(titleExtentMap)?.rows.length).toBeGreaterThan(0)
    expect(titleSurroundingSummaryParams(titleExtentMap)?.rows.length).toBeGreaterThan(0)
    expect(roadKeyTableParams(roadNetworkMap)?.rows.length).toBeGreaterThan(0)
    expect(roadSpeedTableParams(roadNetworkMap)?.rows.length).toBeGreaterThan(0)
    expect(roadUnchangedTableParams(roadNetworkMap)?.rows.length).toBeGreaterThan(0)
    expect(countrysideKeyTableParams(countrysideSchemesMap)?.rows.length).toBeGreaterThan(0)
    expect(countrysideParcelsTableParams(countrysideSchemesMap)?.rows.length).toBeGreaterThan(0)
    expect(countrysideAreaSummaryParams(countrysideSchemesMap)?.rows.length).toBeGreaterThan(0)
    expect(countrysideParcelDetailsParams(countrysideSchemesMap)?.rows.length).toBeGreaterThan(0)
    expect(localAuthorityKeyTableParams(localAuthorityMap)?.rows.length).toBeGreaterThan(0)
    expect(localAuthorityServicesSummaryParams(localAuthorityMap)?.rows.length).toBeGreaterThan(0)
    expect(rightsKeyTableParams(rightsAndInterestsMap)?.rows.length).toBeGreaterThan(0)
    expect(rightsInterestsTableParams(rightsAndInterestsMap)?.rows.length).toBeGreaterThan(0)
    expect(rightsInterestDetailsSummaryParams(rightsAndInterestsMap)?.rows.length).toBeGreaterThan(
      0
    )
    expect(planningApplicationsKeyTableParams(planningApplicationsMap)?.rows.length).toBeGreaterThan(
      0
    )
    expect(planningApplicationsTableParams(planningApplicationsMap)?.rows.length).toBeGreaterThan(0)
    expect(
      planningApplicationsDetailsSummaryParams(planningApplicationsMap)?.rows.length
    ).toBeGreaterThan(0)
    expect(transportStatisticsKeyTableParams(transportStatisticsMap)?.rows.length).toBeGreaterThan(0)
    expect(transportStatisticsTableParams(transportStatisticsMap)?.rows.length).toBeGreaterThan(0)
  })
})
