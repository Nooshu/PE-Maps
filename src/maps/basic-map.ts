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

export function lineFeatureCollection(map: MapDefinition) {
  return {
    type: "FeatureCollection" as const,
    features: map.lines.map((line) => ({
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

export function polygonFeatureCollection(map: MapDefinition) {
  return {
    type: "FeatureCollection" as const,
    features: map.polygons.map((polygon) => ({
      type: "Feature" as const,
      properties: { id: polygon.id },
      geometry: {
        type: "Polygon" as const,
        coordinates: [closedRing(polygon.coordinates)]
      }
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
