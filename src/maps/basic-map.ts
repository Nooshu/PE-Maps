export type LonLat = [longitude: number, latitude: number]

export type MapMarker = {
  id: string
  coordinates: LonLat
  color?: string
}

export type MapPolygon = {
  id: string
  coordinates: LonLat[]
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
}

export type MapDefinition = {
  containerId: string
  mapLabel: string
  behaviour: "inline"
  zoom: number
  center: LonLat
  width: number
  height: number
  mapStyle: {
    url: string
    attribution: string
    backgroundColor: string
  }
  markers: MapMarker[]
  polygons: MapPolygon[]
  staticImageSrc: string
  staticImageAttribution: string
}

export const basicMap: MapDefinition = {
  containerId: "map",
  mapLabel: "Map of London, United Kingdom",
  behaviour: "inline",
  zoom: 12,
  center: [-0.1276, 51.5074],
  width: 630,
  height: 600,
  mapStyle: {
    url: "https://tiles.openfreemap.org/styles/liberty",
    attribution: "OpenFreeMap © OpenMapTiles Data from OpenStreetMap",
    backgroundColor: "#f5f5f0"
  },
  markers: [],
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
    containerHeight: `${map.height}px`,
    mapStyle: map.mapStyle,
    markers: map.markers.map((marker) => ({
      id: marker.id,
      coords: marker.coordinates,
      options: marker.color ? { backgroundColor: marker.color } : undefined
    }))
  }
}
