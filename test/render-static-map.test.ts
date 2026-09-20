import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { afterEach, describe, expect, it, vi } from "vitest"

import { basicMap } from "../src/maps/basic-map.js"
import { mapFixture } from "./helpers/map-fixture.js"
import {
  closedRing,
  ensureStaticMap,
  ensureStaticMaps,
  getStaticMaps,
  renderStaticMap,
  resolveStaticMapsConstructor,
  setStaticMapsConstructor
} from "../src/maps/render-static-map.js"

class MockStaticMaps {
  options: Record<string, unknown>
  polygons: unknown[] = []
  lines: unknown[] = []
  markers: unknown[] = []
  renderCalls: unknown[] = []
  image = {
    save: async (fileName: string) => {
      await mkdir(path.dirname(fileName), { recursive: true })
      await writeFile(fileName, "png")
    }
  }

  constructor(options: Record<string, unknown>) {
    this.options = options
  }

  addPolygon(options: unknown) {
    this.polygons.push(options)
  }

  addLine(options: unknown) {
    this.lines.push(options)
  }

  addMarker(options: unknown) {
    this.markers.push(options)
  }

  async render(...args: unknown[]) {
    this.renderCalls.push(args)
  }
}

afterEach(() => {
  setStaticMapsConstructor()
})

describe("resolveStaticMapsConstructor", () => {
  it("uses a default export when present", () => {
    expect(resolveStaticMapsConstructor({ default: MockStaticMaps })).toBe(MockStaticMaps)
  })

  it("falls back to the module itself", () => {
    expect(resolveStaticMapsConstructor(MockStaticMaps as never)).toBe(MockStaticMaps)
  })
})

describe("getStaticMaps", () => {
  it("returns the override, a test constructor, or the loaded constructor", () => {
    expect(getStaticMaps(MockStaticMaps)).toBe(MockStaticMaps)
    setStaticMapsConstructor(MockStaticMaps)
    expect(getStaticMaps()).toBe(MockStaticMaps)
    setStaticMapsConstructor()
    expect(typeof getStaticMaps()).toBe("function")
  })
})

describe("closedRing", () => {
  it("returns empty, already closed and newly closed rings", () => {
    expect(closedRing([])).toEqual([])
    expect(
      closedRing([
        [0, 0],
        [1, 0],
        [0, 0]
      ])
    ).toEqual([
      [0, 0],
      [1, 0],
      [0, 0]
    ])
    expect(
      closedRing([
        [0, 0],
        [1, 0]
      ])
    ).toEqual([
      [0, 0],
      [1, 0],
      [0, 0]
    ])
  })
})

describe("renderStaticMap", () => {
  it("renders overlays, default colours, bounds and a centred zoom", async () => {
    const outputDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-render-"))
    const withBounds = mapFixture({
      bounds: [0, 0, 1, 1],
      polygons: [
        { id: "styled", coordinates: [[0, 0], [1, 0], [1, 1]], fillColor: "#abc", strokeColor: "#def", strokeWidth: 4 },
        { id: "plain", coordinates: [[0, 0], [1, 1]] }
      ],
      lines: [
        { id: "styled", coordinates: [[0, 0], [1, 1]], color: "#111", width: 8 },
        { id: "plain", coordinates: [[0, 1], [1, 0]] }
      ],
      markers: [{ id: "pin", coordinates: [0.5, 0.5] }]
    })
    const centred = mapFixture({ zoom: 8, center: [-0.1, 51.5] })

    const boundsMap = new MockStaticMaps({})
    const centreMap = new MockStaticMaps({})
    let constructed = 0

    const Maps = class {
      constructor(options: Record<string, unknown>) {
        constructed += 1
        return constructed === 1 ? boundsMap : centreMap
      }
    } as unknown as new (options: Record<string, unknown>) => MockStaticMaps

    await renderStaticMap(withBounds, path.join(outputDirectory, "bounds.png"), { Maps })
    await renderStaticMap(centred, path.join(outputDirectory, "centre.png"), { Maps })

    expect(boundsMap.polygons).toHaveLength(2)
    expect(boundsMap.polygons[1]).toMatchObject({ color: "#1d70b8bb", fill: "#1d70b833", width: 3 })
    expect(boundsMap.lines[1]).toMatchObject({ color: "#1d70b8ee", width: 6 })
    expect(boundsMap.markers).toHaveLength(1)
    expect(boundsMap.renderCalls[0]).toEqual([[0, 0, 1, 1]])
    expect(centreMap.renderCalls[0]).toEqual([[-0.1, 51.5], 8])
    expect(await readFile(path.join(outputDirectory, "bounds.png"), "utf8")).toBe("png")
  })

  it("renders with the default options object when none is passed", async () => {
    const outputDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-default-render-"))
    setStaticMapsConstructor(MockStaticMaps)

    await renderStaticMap(mapFixture(), path.join(outputDirectory, "default.png"))

    setStaticMapsConstructor()
    expect(await readFile(path.join(outputDirectory, "default.png"), "utf8")).toBe("png")
  })
})

describe("ensureStaticMap", () => {
  it("renders, caches, rebuilds an image with a stale hash, and copies a valid cache", async () => {
    const cacheDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-cache-"))
    const outputDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-out-"))
    const map = mapFixture({
      staticImageSrc: "/images/cache-test.png",
      bounds: [0, 0, 1, 1],
      lines: [
        { id: "plain", coordinates: [[0, 0], [1, 1]] },
        { id: "styled", coordinates: [[0, 1], [1, 0]], color: "#111", width: 2 }
      ],
      polygons: [
        { id: "plain", coordinates: [[0, 0], [1, 0], [1, 1]] },
        {
          id: "styled",
          coordinates: [[0, 0], [1, 1], [0, 1]],
          fillColor: "#abc",
          strokeColor: "#def",
          strokeWidth: 4
        }
      ]
    })
    const outputPath = path.join(outputDirectory, "cache-test.png")
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)

    const first = await ensureStaticMap(map, outputPath, {
      cacheDirectory,
      Maps: MockStaticMaps
    })
    const cached = await ensureStaticMap(map, outputPath, {
      cacheDirectory,
      Maps: MockStaticMaps
    })

    const metaPath = path.join(cacheDirectory, "cache-test.png.json")
    await writeFile(metaPath, "{not json")
    const recovered = await ensureStaticMap(map, outputPath, {
      cacheDirectory,
      Maps: MockStaticMaps
    })

    await writeFile(metaPath, `${JSON.stringify({ hash: 1 }, null, 2)}\n`)
    const recoveredFromBadHash = await ensureStaticMap(map, outputPath, {
      cacheDirectory,
      Maps: MockStaticMaps
    })

    await writeFile(metaPath, `${JSON.stringify({ hash: "stale" }, null, 2)}\n`)
    const rerendered = await ensureStaticMap(map, outputPath, {
      cacheDirectory,
      Maps: MockStaticMaps
    })

    const forced = await ensureStaticMap(map, outputPath, {
      force: true,
      cacheDirectory,
      Maps: MockStaticMaps
    })

    expect(first).toBe("rendered")
    expect(cached).toBe("cached")
    expect(recovered).toBe("cached")
    expect(recoveredFromBadHash).toBe("cached")
    expect(rerendered).toBe("rendered")
    expect(forced).toBe("rendered")
    expect(log).toHaveBeenCalled()
    log.mockRestore()
  })

  it("copies a committed cached map when no cache directory override is given", async () => {
    const outputDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-real-cache-"))
    const outputPath = path.join(outputDirectory, "basic-map.png")

    const result = await ensureStaticMap(basicMap, outputPath)

    expect(result).toBe("cached")
    expect(await readFile(outputPath)).toBeInstanceOf(Buffer)
  })
})

describe("ensureStaticMaps", () => {
  it("counts cached and rendered maps", async () => {
    const cacheDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-maps-"))
    const outputDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-maps-out-"))
    const first = mapFixture({ staticImageSrc: "/images/one.png" })
    const second = mapFixture({ staticImageSrc: "/images/two.png" })
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)

    await ensureStaticMap(first, path.join(outputDirectory, "one.png"), {
      cacheDirectory,
      Maps: MockStaticMaps
    })
    await ensureStaticMaps([first, second], outputDirectory, {
      cacheDirectory,
      Maps: MockStaticMaps
    })

    expect(log).toHaveBeenCalledWith("Static maps: 1 cached, 1 rendered")
    log.mockRestore()
  })

  it("copies committed cached maps when called without options", async () => {
    const outputDirectory = await mkdtemp(path.join(tmpdir(), "pe-maps-default-maps-"))
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)

    await ensureStaticMaps([basicMap], outputDirectory)

    expect(log).toHaveBeenCalledWith("Static maps: 1 cached, 0 rendered")
    expect(await readFile(path.join(outputDirectory, "basic-map.png"))).toBeInstanceOf(Buffer)
    log.mockRestore()
  })
})
