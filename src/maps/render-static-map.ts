import { mkdir } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

import { projectRoot } from "../paths.js"
import type { MapDefinition } from "./basic-map.js"

const require = createRequire(import.meta.url)

type LonLat = [number, number]

type StaticMapsInstance = {
  addMarker: (options: {
    coord: LonLat
    img: string
    width: number
    height: number
    offsetX: number
    offsetY: number
  }) => void
  addPolygon: (options: {
    coords: LonLat[]
    color?: string
    width?: number
    fill?: string
  }) => void
  render: (center: LonLat, zoom: number) => Promise<void>
  image: {
    save: (fileName: string) => Promise<void>
  }
}

type StaticMapsConstructor = new (options: {
  width: number
  height: number
  tileUrl: string
  tileSubdomains: string[]
  tileRequestHeader: Record<string, string>
  zoomRange: { min: number; max: number }
}) => StaticMapsInstance

const StaticMapsModule = require("staticmaps") as { default?: StaticMapsConstructor }
const StaticMaps = StaticMapsModule.default ?? (StaticMapsModule as unknown as StaticMapsConstructor)

const markerImagePath = path.join(projectRoot, "assets/images/map-marker.png")
const defaultStrokeColor = "#1d70b8bb"
const defaultFillColor = "#1d70b833"

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

export async function renderStaticMap(map: MapDefinition, outputPath: string): Promise<void> {
  const staticMap = new StaticMaps({
    width: map.width,
    height: map.height,
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tileSubdomains: ["a", "b", "c"],
    tileRequestHeader: {
      "User-Agent": "PE-Maps/1.0 (progressive enhancement proof of concept)"
    },
    zoomRange: { min: 1, max: 19 }
  })

  for (const marker of map.markers) {
    staticMap.addMarker({
      coord: marker.coordinates,
      img: markerImagePath,
      width: 32,
      height: 48,
      offsetX: 16,
      offsetY: 48
    })
  }

  for (const polygon of map.polygons) {
    staticMap.addPolygon({
      coords: closedRing(polygon.coordinates),
      color: polygon.strokeColor ?? defaultStrokeColor,
      width: polygon.strokeWidth ?? 3,
      fill: polygon.fillColor ?? defaultFillColor
    })
  }

  await staticMap.render(map.center, map.zoom)
  await mkdir(path.dirname(outputPath), { recursive: true })
  await staticMap.image.save(outputPath)
}
