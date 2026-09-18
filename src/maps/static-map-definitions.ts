import { basicMap, type MapDefinition } from "./basic-map.js"
import { countrysideSchemesMap } from "./countryside-schemes-map.js"
import { floodRiskMap } from "./flood-risk-map.js"
import { localAuthorityMap } from "./local-authority-map.js"
import { planningMap } from "./planning-map.js"
import { planningApplicationsMap } from "./planning-applications-map.js"
import { rightsAndInterestsMap } from "./rights-and-interests-map.js"
import { roadNetworkMap } from "./road-network-map.js"
import { routeMap } from "./route-map.js"
import { titleExtentMap } from "./title-extent-map.js"
import { transportStatisticsMap } from "./transport-statistics-map.js"
import { treePreservationMap } from "./tree-preservation-map.js"

export const staticMapDefinitions: readonly MapDefinition[] = [
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
