import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { randomBytes } from "node:crypto"

import { afterEach, describe, expect, it, vi } from "vitest"

import {
  collectFiles,
  compressFile,
  copyStylesheetOrScript,
  createArcgisStubPlugin,
  formatBytes,
  shouldForceStaticMaps,
  stripSourceMappingUrl
} from "../src/build.js"

describe("build helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("formats byte sizes", () => {
    expect(formatBytes(512)).toBe("512 B")
    expect(formatBytes(2048)).toBe("2.0 KB")
    expect(formatBytes(1024 ** 2)).toBe("1.0 MB")
  })

  it("forces static maps only when the environment flag is 1", () => {
    expect(shouldForceStaticMaps({})).toBe(false)
    expect(shouldForceStaticMaps({ FORCE_STATIC_MAPS: "0" })).toBe(false)
    expect(shouldForceStaticMaps({ FORCE_STATIC_MAPS: "1" })).toBe(true)
  })

  it("strips sourceMappingURL comments", () => {
    expect(
      stripSourceMappingUrl("body{}\n/*# sourceMappingURL=app.css.map */\n")
    ).toBe("body{}\n")
    expect(stripSourceMappingUrl("console.log(1)\n//# sourceMappingURL=app.js.map\n")).toBe(
      "console.log(1)\n"
    )
    expect(stripSourceMappingUrl("console.log(1)\n//@ sourceMappingURL=app.js.map\n")).toBe(
      "console.log(1)\n"
    )
  })

  it("collects nested files", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "pe-maps-collect-"))
    await mkdir(path.join(root, "nested"), { recursive: true })
    await writeFile(path.join(root, "a.txt"), "a")
    await writeFile(path.join(root, "nested/b.txt"), "b")

    const files = await collectFiles(root)

    expect(files.sort()).toEqual([path.join(root, "a.txt"), path.join(root, "nested/b.txt")].sort())
  })

  it("copies stylesheets and scripts without source maps", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "pe-maps-copy-"))
    const from = path.join(root, "from.css")
    const to = path.join(root, "out/to.css")
    await writeFile(from, "body{}\n/*# sourceMappingURL=to.css.map */\n")

    await copyStylesheetOrScript(from, to)

    expect(await readFile(to, "utf8")).toBe("body{}\n")
  })

  it("skips files that should not be Brotli-compressed", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "pe-maps-skip-"))
    const png = path.join(root, "map.png")
    const map = path.join(root, "app.js.map")
    const br = path.join(root, "app.js.br")
    const worker = path.join(root, "_worker.js")
    await writeFile(png, "png")
    await writeFile(map, "map")
    await writeFile(br, "br")
    await writeFile(worker, "worker")

    await compressFile(png)
    await compressFile(map)
    await compressFile(br)
    await compressFile(worker)

    await expect(readFile(`${png}.br`)).rejects.toThrow()
    await expect(readFile(`${map}.br`)).rejects.toThrow()
    await expect(readFile(`${worker}.br`)).rejects.toThrow()
  })

  it("writes a .br file only when it is smaller than the source", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "pe-maps-br-"))
    const compressible = path.join(root, "page.html")
    const incompressible = path.join(root, "random.txt")
    await writeFile(compressible, "<html>".repeat(4000))
    await writeFile(incompressible, randomBytes(64))
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)

    await compressFile(compressible)
    await compressFile(incompressible)

    expect(await readFile(`${compressible}.br`)).toBeInstanceOf(Buffer)
    await expect(readFile(`${incompressible}.br`)).rejects.toThrow()
    expect(log).toHaveBeenCalled()
    log.mockRestore()
  })

  it("registers the ArcGIS stub plugin callbacks", () => {
    const plugin = createArcgisStubPlugin()
    let resolveCb: (() => unknown) | undefined
    let loadCb: (() => unknown) | undefined

    plugin.setup({
      onResolve: (_options: unknown, callback: () => unknown) => {
        resolveCb = callback
      },
      onLoad: (_options: unknown, callback: () => unknown) => {
        loadCb = callback
      }
    } as never)

    expect(plugin.name).toBe("skip-unused-arcgis")
    expect(resolveCb?.()).toEqual({ path: "arcgis-stub", namespace: "empty-module" })
    expect(loadCb?.()).toEqual({ contents: "export default {}\n" })
  })
})
