export type LonLat = [longitude: number, latitude: number]

export type MapMarker = {
  id: string
  coordinates: LonLat
  color?: string
  label?: string
  showLabel?: boolean
}

export type MapLine = {
  id: string
  coordinates: LonLat[]
  color?: string
  width?: number
}

export type MapPolygon = {
  id: string
  coordinates: LonLat[]
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
}

export type RouteStep = {
  number: number
  instruction: string
  distance: string
}

export type RouteDirections = {
  caption: string
  summary: string
  steps: RouteStep[]
}

export type FloodWarning = {
  bannerTitle: string
  headline: string
  summary: string
  severity: string
  riskToLife: string
  location: string
  roads: string[]
  warningStarted: string
  expectedUntil: string
  whatYouShouldDo: string[]
}

export type PlanningKeyItem = {
  label: string
  description: string
}

export type PlanningRoad = {
  name: string
  effect: string
}

export type PlanningFacility = {
  name: string
  details: string
}

export type PlanningTimetableEvent = {
  event: string
  date: string
}

export type PlanningContact = {
  name: string
  role: string
  organisation: string
  email: string
  phone: string
  hours: string
}

export type PlanningApplication = {
  bannerTitle: string
  headline: string
  summary: string
  status: string
  reference: string
  appellant: string
  localPlanningAuthority: string
  siteAddress: string
  proposal: string
  procedure: string
  inquiryOpens: string
  decisionExpected: string
  key: PlanningKeyItem[]
  locations: string[]
  roads: PlanningRoad[]
  facilities: PlanningFacility[]
  wildlife: string[]
  impacts: string[]
  timetable: PlanningTimetableEvent[]
  contacts: PlanningContact[]
}

export type TreePreservationTree = {
  reference: string
  species: string
  location: string
  details: string
}

export type TreePreservationOrder = {
  bannerTitle: string
  headline: string
  summary: string
  status: string
  reference: string
  title: string
  planningAuthority: string
  made: string
  confirmed: string
  lastVaried: string
  conservationArea: string
  siteAddress: string
  areaDescription: string
  key: PlanningKeyItem[]
  locations: string[]
  trees: TreePreservationTree[]
  cannotDo: string[]
  canDo: string[]
  howToApply: string[]
  howToReport: string[]
  contacts: PlanningContact[]
}

export type RegisteredTitle = {
  bannerTitle: string
  headline: string
  summary: string
  status: string
  titleNumber: string
  propertyAddress: string
  tenure: string
  classOfTitle: string
  proprietor: string
  firstRegistered: string
  lastUpdated: string
  administrativeArea: string
  area: string
  key: PlanningKeyItem[]
  extentDescription: string[]
  included: string[]
  excluded: string[]
  surrounding: Array<{ name: string; details: string }>
  contacts: PlanningContact[]
}

export type RoadSpeedChange = {
  name: string
  classification: string
  fromLimit: string
  toLimit: string
  starts: string
}

export type RoadUnchanged = {
  name: string
  classification: string
  limit: string
  note: string
}

export type RoadNetworkScheme = {
  bannerTitle: string
  headline: string
  summary: string
  status: string
  reference: string
  authority: string
  schemeName: string
  starts: string
  experimentalUntil: string
  decisionDate: string
  key: PlanningKeyItem[]
  locations: string[]
  speedChanges: RoadSpeedChange[]
  unchangedRoads: RoadUnchanged[]
  strategicRoutes: string[]
  contacts: PlanningContact[]
}

export type CountrysideParcel = {
  id: string
  reference: string
  name: string
  landCover: string
  location: string
  totalArea: string
  eligibleArea: string
  status: string
  notes: string
}

export type CountrysideScheme = {
  bannerTitle: string
  headline: string
  summary: string
  status: string
  schemeName: string
  holdingName: string
  sbi: string
  cph: string
  location: string
  agreementYear: string
  totalRegistered: string
  totalAvailable: string
  totalRestricted: string
  totalNotAvailable: string
  designatedNearby: string
  key: PlanningKeyItem[]
  locations: string[]
  parcels: CountrysideParcel[]
  requirements: string[]
  howToSelect: string[]
  ineligibleNearby: string[]
  contacts: PlanningContact[]
}

export type MapDefinition = {
  containerId: string
  mapLabel: string
  behaviour: "inline"
  zoom: number
  center: LonLat
  bounds?: [west: number, south: number, east: number, north: number]
  width: number
  height: number
  mapStyle: {
    url: string
    attribution: string
    backgroundColor: string
  }
  markers: MapMarker[]
  lines: MapLine[]
  polygons: MapPolygon[]
  directions?: RouteDirections
  floodWarning?: FloodWarning
  planningApplication?: PlanningApplication
  treePreservationOrder?: TreePreservationOrder
  registeredTitle?: RegisteredTitle
  roadNetworkScheme?: RoadNetworkScheme
  countrysideScheme?: CountrysideScheme
  staticImageSrc: string
  staticImageAttribution: string
}

const openFreeMapStyle = {
  url: "https://tiles.openfreemap.org/styles/liberty",
  attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
  backgroundColor: "#f5f5f0"
} as const

export const basicMap: MapDefinition = {
  containerId: "map",
  mapLabel: "Map of London, United Kingdom",
  behaviour: "inline",
  zoom: 12,
  center: [-0.1276, 51.5074],
  width: 630,
  height: 600,
  mapStyle: openFreeMapStyle,
  markers: [],
  lines: [],
  polygons: [],
  staticImageSrc: "/images/basic-map.png",
  staticImageAttribution: "© OpenStreetMap contributors"
}

export function interactiveMapOptions(map: MapDefinition) {
  return {
    behaviour: map.behaviour,
    mapLabel: map.mapLabel,
    zoom: map.zoom,
    center: map.center,
    bounds: map.bounds,
    containerHeight: `${map.height}px`,
    mapStyle: map.mapStyle,
    markers: map.markers.map((marker) => ({
      id: marker.id,
      coords: marker.coordinates,
      options: {
        ...(marker.color ? { backgroundColor: marker.color } : {}),
        ...(marker.label ? { label: marker.label } : {}),
        ...(marker.showLabel ? { showLabel: true } : {})
      }
    }))
  }
}

export function lineFeatureCollection(map: MapDefinition, lineIds?: readonly string[]) {
  const lines = lineIds ? map.lines.filter((line) => lineIds.includes(line.id)) : map.lines

  return {
    type: "FeatureCollection" as const,
    features: lines.map((line) => ({
      type: "Feature" as const,
      properties: { id: line.id },
      geometry: {
        type: "LineString" as const,
        coordinates: line.coordinates
      }
    }))
  }
}

function closedRing(coordinates: LonLat[]): LonLat[] {
  const first = coordinates[0]
  const last = coordinates.at(-1)

  if (!first || !last) {
    return coordinates
  }

  if (first[0] === last[0] && first[1] === last[1]) {
    return coordinates
  }

  return [...coordinates, first]
}

export function polygonFeatureCollection(map: MapDefinition, polygonIds?: readonly string[]) {
  const polygons = polygonIds
    ? map.polygons.filter((polygon) => polygonIds.includes(polygon.id))
    : map.polygons

  return {
    type: "FeatureCollection" as const,
    features: polygons.map((polygon) => ({
      type: "Feature" as const,
      properties: { id: polygon.id },
      geometry: {
        type: "Polygon" as const,
        coordinates: [closedRing(polygon.coordinates)]
      }
    }))
  }
}

export function planningKeyTableParams(map: MapDefinition) {
  const planningApplication = map.planningApplication

  if (!planningApplication) {
    return undefined
  }

  return {
    caption: "Map key",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [{ text: "On the map" }, { text: "What it shows" }],
    rows: planningApplication.key.map((item) => [{ text: item.label }, { text: item.description }])
  }
}

export function planningTimetableTableParams(map: MapDefinition) {
  const planningApplication = map.planningApplication

  if (!planningApplication) {
    return undefined
  }

  return {
    caption: "Inquiry timetable",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [{ text: "Event" }, { text: "Date" }],
    rows: planningApplication.timetable.map((item) => [
      { text: item.event },
      { text: item.date }
    ])
  }
}

export function planningRoadsTableParams(map: MapDefinition) {
  const planningApplication = map.planningApplication

  if (!planningApplication) {
    return undefined
  }

  return {
    caption: "Roads around the appeal site",
    captionClasses: "govuk-visually-hidden",
    firstCellIsHeader: true,
    head: [{ text: "Road" }, { text: "What would change" }],
    rows: planningApplication.roads.map((road) => [{ text: road.name }, { text: road.effect }])
  }
}

export function tpoKeyTableParams(map: MapDefinition) {
  const treePreservationOrder = map.treePreservationOrder

  if (!treePreservationOrder) {
    return undefined
  }

  return {
    caption: "Map key",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [{ text: "On the map" }, { text: "What it shows" }],
    rows: treePreservationOrder.key.map((item) => [{ text: item.label }, { text: item.description }])
  }
}

export function tpoTreesTableParams(map: MapDefinition) {
  const treePreservationOrder = map.treePreservationOrder

  if (!treePreservationOrder) {
    return undefined
  }

  return {
    caption: "Protected trees on this order",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [
      { text: "Tree" },
      { text: "Species" },
      { text: "Where it stands" }
    ],
    rows: treePreservationOrder.trees.map((tree) => [
      { text: tree.reference },
      { text: tree.species },
      { text: tree.location }
    ])
  }
}

export function tpoTreeDetailsSummaryParams(map: MapDefinition) {
  const treePreservationOrder = map.treePreservationOrder

  if (!treePreservationOrder) {
    return undefined
  }

  return {
    rows: treePreservationOrder.trees.map((tree) => ({
      key: { text: tree.reference },
      value: { text: `${tree.species}. ${tree.location}. ${tree.details}` }
    }))
  }
}

export function titleKeyTableParams(map: MapDefinition) {
  const registeredTitle = map.registeredTitle

  if (!registeredTitle) {
    return undefined
  }

  return {
    caption: "Map key",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [{ text: "On the map" }, { text: "What it shows" }],
    rows: registeredTitle.key.map((item) => [{ text: item.label }, { text: item.description }])
  }
}

export function titleSurroundingSummaryParams(map: MapDefinition) {
  const registeredTitle = map.registeredTitle

  if (!registeredTitle) {
    return undefined
  }

  return {
    rows: registeredTitle.surrounding.map((place) => ({
      key: { text: place.name },
      value: { text: place.details }
    }))
  }
}

export function roadKeyTableParams(map: MapDefinition) {
  const roadNetworkScheme = map.roadNetworkScheme

  if (!roadNetworkScheme) {
    return undefined
  }

  return {
    caption: "Map key",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [{ text: "On the map" }, { text: "What it shows" }],
    rows: roadNetworkScheme.key.map((item) => [{ text: item.label }, { text: item.description }])
  }
}

export function roadSpeedTableParams(map: MapDefinition) {
  const roadNetworkScheme = map.roadNetworkScheme

  if (!roadNetworkScheme) {
    return undefined
  }

  return {
    caption: "Proposed speed limit changes",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [
      { text: "Road" },
      { text: "Classification" },
      { text: "Current limit" },
      { text: "Proposed limit" },
      { text: "When it changes" }
    ],
    rows: roadNetworkScheme.speedChanges.map((road) => [
      { text: road.name },
      { text: road.classification },
      { text: road.fromLimit },
      { text: road.toLimit },
      { text: road.starts }
    ])
  }
}

export function roadUnchangedTableParams(map: MapDefinition) {
  const roadNetworkScheme = map.roadNetworkScheme

  if (!roadNetworkScheme) {
    return undefined
  }

  return {
    caption: "Strategic routes that would not change",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [{ text: "Road" }, { text: "Classification" }, { text: "Speed limit" }, { text: "What happens" }],
    rows: roadNetworkScheme.unchangedRoads.map((road) => [
      { text: road.name },
      { text: road.classification },
      { text: road.limit },
      { text: road.note }
    ])
  }
}

export function countrysideKeyTableParams(map: MapDefinition) {
  const countrysideScheme = map.countrysideScheme

  if (!countrysideScheme) {
    return undefined
  }

  return {
    caption: "Map key",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [{ text: "On the map" }, { text: "What it shows" }],
    rows: countrysideScheme.key.map((item) => [{ text: item.label }, { text: item.description }])
  }
}

export function countrysideParcelsTableParams(map: MapDefinition) {
  const countrysideScheme = map.countrysideScheme

  if (!countrysideScheme) {
    return undefined
  }

  return {
    caption: "Land parcels on this holding",
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [
      { text: "Parcel" },
      { text: "Name" },
      { text: "Land cover" },
      { text: "Total area", format: "numeric" },
      { text: "Eligible area", format: "numeric" },
      { text: "Available to select" }
    ],
    rows: countrysideScheme.parcels.map((parcel) => [
      { text: parcel.reference },
      { text: parcel.name },
      { text: parcel.landCover },
      { text: parcel.totalArea, format: "numeric" },
      { text: parcel.eligibleArea, format: "numeric" },
      { text: parcel.status }
    ])
  }
}

export function countrysideAreaSummaryParams(map: MapDefinition) {
  const countrysideScheme = map.countrysideScheme

  if (!countrysideScheme) {
    return undefined
  }

  return {
    rows: [
      {
        key: { text: "Registered on this holding" },
        value: { text: countrysideScheme.totalRegistered }
      },
      {
        key: { text: "Available to select for this application" },
        value: { text: countrysideScheme.totalAvailable }
      },
      {
        key: { text: "In a 6 metre watercourse buffer" },
        value: { text: countrysideScheme.totalRestricted }
      },
      {
        key: { text: "Already in an agreement" },
        value: { text: countrysideScheme.totalNotAvailable }
      },
      {
        key: { text: "Designated land nearby, not on this holding" },
        value: { text: countrysideScheme.designatedNearby }
      }
    ]
  }
}

export function countrysideParcelDetailsParams(map: MapDefinition) {
  const countrysideScheme = map.countrysideScheme

  if (!countrysideScheme) {
    return undefined
  }

  return {
    rows: countrysideScheme.parcels.map((parcel) => ({
      key: { text: `${parcel.reference} ${parcel.name}` },
      value: {
        text: `${parcel.landCover}, ${parcel.location}. Total ${parcel.totalArea}, eligible ${parcel.eligibleArea}. ${parcel.status}. ${parcel.notes}`
      }
    }))
  }
}

export function planningFacilitiesSummaryParams(map: MapDefinition) {
  const planningApplication = map.planningApplication

  if (!planningApplication) {
    return undefined
  }

  return {
    rows: planningApplication.facilities.map((facility) => ({
      key: { text: facility.name },
      value: { text: facility.details }
    }))
  }
}

export function directionsTableParams(map: MapDefinition) {
  const directions = map.directions

  if (!directions) {
    return undefined
  }

  return {
    caption: directions.caption,
    captionClasses: "govuk-table__caption--m",
    firstCellIsHeader: true,
    head: [
      { text: "Step" },
      { text: "Direction" },
      { text: "Distance", format: "numeric" }
    ],
    rows: directions.steps.map((step) => [
      { text: String(step.number) },
      { text: step.instruction },
      { text: step.distance, format: "numeric" }
    ])
  }
}
