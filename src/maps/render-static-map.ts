import { createHash } from "node:crypto"
import { access, cp, mkdir, readFile, rename, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"

import { projectRoot, staticMapsDir } from "../paths.js"
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
  addLine: (options: { coords: LonLat[]; color?: string; width?: number }) => void
  addPolygon: (options: {
    coords: LonLat[]
    color?: string
    width?: number
    fill?: string
  }) => void
  render: (center?: LonLat | number[], zoom?: number) => Promise<void>
  image: {
    save: (fileName: string) => Promise<void>
  }
}

type StaticMapsConstructor = new (options: {
  width: number
  height: number
  paddingX?: number
  paddingY?: number
  tileUrl: string
  tileSubdomains: string[]
  tileRequestHeader: Record<string, string>
  tileRequestLimit?: number
  zoomRange: { min: number; max: number }
}) => StaticMapsInstance

const StaticMapsModule = require("staticmaps") as { default?: StaticMapsConstructor }
const StaticMaps = StaticMapsModule.default ?? (StaticMapsModule as unknown as StaticMapsConstructor)

const markerImagePath = path.join(projectRoot, "assets/images/map-marker.png")
const defaultStrokeColor = "#1d70b8bb"
const defaultFillColor = "#1d70b833"
const defaultLineColor = "#1d70b8ee"
const markerWidth = 32
const markerHeight = 48
const boundsPadding = 48

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

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

function staticMapFileName(map: MapDefinition): string {
  return path.basename(map.staticImageSrc)
}

async function staticMapFingerprint(map: MapDefinition): Promise<string> {
  const markerImage = await readFile(markerImagePath)
  const payload = {
    width: map.width,
    height: map.height,
    zoom: map.zoom,
    center: map.center,
    bounds: map.bounds ?? null,
    padding: map.bounds ? boundsPadding : 0,
    markers: map.markers.map((marker) => ({
      id: marker.id,
      coordinates: marker.coordinates
    })),
    lines: map.lines.map((line) => ({
      id: line.id,
      coordinates: line.coordinates,
      color: line.color ?? null,
      width: line.width ?? null
    })),
    polygons: map.polygons.map((polygon) => ({
      id: polygon.id,
      coordinates: polygon.coordinates,
      fillColor: polygon.fillColor ?? null,
      strokeColor: polygon.strokeColor ?? null,
      strokeWidth: polygon.strokeWidth ?? null
    })),
    markerImage: createHash("sha256").update(markerImage).digest("hex"),
    markerWidth,
    markerHeight,
    defaultStrokeColor,
    defaultFillColor,
    defaultLineColor
  }

  return createHash("sha256").update(JSON.stringify(payload)).digest("hex")
}

async function readCachedHash(metaPath: string): Promise<string | undefined> {
  if (!(await fileExists(metaPath))) {
    return undefined
  }

  try {
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as { hash?: unknown }
    return typeof meta.hash === "string" ? meta.hash : undefined
  } catch {
    return undefined
  }
}

export async function renderStaticMap(map: MapDefinition, outputPath: string): Promise<void> {
  const staticMap = new StaticMaps({
    width: map.width,
    height: map.height,
    paddingX: map.bounds ? boundsPadding : 0,
    paddingY: map.bounds ? boundsPadding : 0,
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tileSubdomains: ["a", "b", "c"],
    tileRequestHeader: {
      "User-Agent": "PE-Maps/1.0 (progressive enhancement proof of concept)"
    },
    tileRequestLimit: 2,
    zoomRange: { min: 1, max: 19 }
  })

  for (const polygon of map.polygons) {
    staticMap.addPolygon({
      coords: closedRing(polygon.coordinates),
      color: polygon.strokeColor ?? defaultStrokeColor,
      width: polygon.strokeWidth ?? 3,
      fill: polygon.fillColor ?? defaultFillColor
    })
  }

  for (const line of map.lines) {
    staticMap.addLine({
      coords: line.coordinates,
      color: line.color ?? defaultLineColor,
      width: line.width ?? 6
    })
  }

  for (const marker of map.markers) {
    staticMap.addMarker({
      coord: marker.coordinates,
      img: markerImagePath,
      width: markerWidth,
      height: markerHeight,
      offsetX: 16,
      offsetY: 48
    })
  }

  if (map.bounds) {
    await staticMap.render(map.bounds)
  } else {
    await staticMap.render(map.center, map.zoom)
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await staticMap.image.save(outputPath)
}

export async function ensureStaticMap(
  map: MapDefinition,
  outputPath: string,
  options: { force?: boolean } = {}
): Promise<"cached" | "rendered"> {
  const fileName = staticMapFileName(map)
  const cachePath = path.join(staticMapsDir, fileName)
  const metaPath = `${cachePath}.json`
  const relativeOutput = path.relative(projectRoot, outputPath)
  const hash = await staticMapFingerprint(map)
  const cachedHash = await readCachedHash(metaPath)
  const hasCachedImage = await fileExists(cachePath)
  const cacheIsValid = hasCachedImage && cachedHash === hash

  if (!options.force && cacheIsValid) {
    await mkdir(path.dirname(outputPath), { recursive: true })
    await cp(cachePath, outputPath)
    return "cached"
  }

  if (!options.force && hasCachedImage && cachedHash === undefined) {
    await writeFile(metaPath, `${JSON.stringify({ hash }, null, 2)}\n`)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await cp(cachePath, outputPath)
    return "cached"
  }

  console.log(`Rendering ${relativeOutput} from OpenStreetMap tiles`)

  const tempPath = `${cachePath}.tmp.png`
  await mkdir(staticMapsDir, { recursive: true })
  await renderStaticMap(map, tempPath)
  await writeFile(metaPath, `${JSON.stringify({ hash }, null, 2)}\n`)
  await rename(tempPath, cachePath)
  await mkdir(path.dirname(outputPath), { recursive: true })
  await cp(cachePath, outputPath)
  return "rendered"
}

export async function ensureStaticMaps(
  maps: readonly MapDefinition[],
  outputDirectory: string,
  options: { force?: boolean } = {}
): Promise<void> {
  let cached = 0
  let rendered = 0

  for (const map of maps) {
    const outputPath = path.join(outputDirectory, staticMapFileName(map))
    const result = await ensureStaticMap(map, outputPath, options)

    if (result === "cached") {
      cached += 1
    } else {
      rendered += 1
    }
  }

  console.log(`Static maps: ${cached} cached, ${rendered} rendered`)
}
