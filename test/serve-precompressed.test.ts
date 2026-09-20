import { mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { constants as zlibConstants, brotliCompressSync } from "node:zlib"

import express from "express"
import { afterEach, describe, expect, it, vi } from "vitest"

import {
  candidatePublicPaths,
  contentTypeFor,
  fileExists,
  isInsidePublicRoot,
  servePrecompressed
} from "../src/serve-precompressed.js"

async function makePublicRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "pe-maps-public-"))
  await writeFile(path.join(root, "index.html"), "<script>1</script><p>Home</p>")
  await writeFile(path.join(root, "basic-map.html"), "<noscript>Map</noscript>")
  await writeFile(path.join(root, "robots.txt"), "User-agent: *\n")
  await writeFile(path.join(root, "data.bin"), "binary")
  const compressed = brotliCompressSync(Buffer.from("body { color: red }"), {
    params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 11 }
  })
  await writeFile(path.join(root, "app.css"), "body { color: red }")
  await writeFile(path.join(root, "app.css.br"), compressed)
  return root
}

async function listen(app: express.Express) {
  const server = await new Promise<import("node:http").Server>((resolve) => {
    const started = app.listen(0, "127.0.0.1", () => resolve(started))
  })
  const address = server.address()

  if (!address || typeof address === "string") {
    throw new Error("Expected a TCP address")
  }

  return { server, url: `http://127.0.0.1:${address.port}` }
}

describe("serve-precompressed helpers", () => {
  it("reports whether a file exists", async () => {
    const root = await makePublicRoot()

    expect(await fileExists(path.join(root, "robots.txt"))).toBe(true)
    expect(await fileExists(path.join(root, "missing.txt"))).toBe(false)
  })

  it("rejects paths outside the public root", () => {
    const root = "/var/www/public"

    expect(isInsidePublicRoot(root, root)).toBe(true)
    expect(isInsidePublicRoot(root, path.join(root, "index.html"))).toBe(true)
    expect(isInsidePublicRoot(root, "/var/www/secret")).toBe(false)
  })

  it("resolves index, extension, clean URL and escaped paths", () => {
    const root = path.resolve("/var/www/public")

    expect(candidatePublicPaths(root, "/")).toEqual([path.join(root, "index.html")])
    expect(candidatePublicPaths(root, "/robots.txt")).toEqual([path.join(root, "robots.txt")])
    expect(candidatePublicPaths(root, "/basic-map")).toEqual([
      path.join(root, "basic-map"),
      path.join(root, "basic-map.html"),
      path.join(root, "basic-map/index.html")
    ])
    expect(candidatePublicPaths(root, "/../../etc/passwd")).toEqual([])
  })

  it("uses a default content type for unknown extensions", () => {
    expect(contentTypeFor("page.html")).toContain("text/html")
    expect(contentTypeFor("blob.bin")).toBe("application/octet-stream")
  })
})

describe("servePrecompressed", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("serves HTML, clean URLs, directory indexes, Brotli and unknown types", async () => {
    const root = await makePublicRoot()
    const app = express()
    app.use(servePrecompressed(root))
    const { server, url } = await listen(app)

    try {
      const home = await fetch(url)
      const clean = await fetch(`${url}/basic-map`)
      const jsOff = await fetch(`${url}/?js=off`)
      const css = await fetch(`${url}/app.css`, { headers: { "Accept-Encoding": "br" } })
      const cssPlain = await fetch(`${url}/app.css`, { headers: { "Accept-Encoding": "identity" } })
      const bin = await fetch(`${url}/data.bin`)
      const missing = await fetch(`${url}/nope`)
      const hiddenWorker = await fetch(`${url}/_worker.js`)
      const hiddenHeaders = await fetch(`${url}/_headers`)
      const hiddenMap = await fetch(`${url}/app.css.map`)
      const hiddenBr = await fetch(`${url}/app.css.br`)
      const head = await fetch(url, { method: "HEAD" })

      expect(await home.text()).toContain("<script>")
      expect(clean.status).toBe(200)
      expect(await jsOff.text()).toBe("<p>Home</p>")
      expect(css.headers.get("content-encoding")).toBe("br")
      expect(cssPlain.headers.get("content-encoding")).not.toBe("br")
      expect(bin.headers.get("content-type")).toBe("application/octet-stream")
      expect(missing.status).toBe(404)
      expect(hiddenWorker.status).toBe(404)
      expect(hiddenHeaders.status).toBe(404)
      expect(hiddenMap.status).toBe(404)
      expect(hiddenBr.status).toBe(404)
      expect(head.status).toBe(200)
    } finally {
      server.close()
    }
  })

  it("passes non-GET requests to the next handler", async () => {
    const root = await makePublicRoot()
    const next = vi.fn()
    const handler = servePrecompressed(root)

    await handler(
      { method: "POST", path: "/", query: {}, acceptsEncodings: () => false } as never,
      {} as never,
      next
    )

    expect(next).toHaveBeenCalledOnce()
  })

  it("calls next when a matched file disappears before it is sent", async () => {
    const root = await makePublicRoot()
    const { promises: fs } = await import("node:fs")
    let accessCalls = 0
    vi.spyOn(fs, "access").mockImplementation(async () => {
      accessCalls += 1

      if (accessCalls === 1) {
        return
      }

      throw new Error("gone")
    })

    const next = vi.fn()
    const handler = servePrecompressed(root)

    await handler(
      {
        method: "GET",
        path: "/robots.txt",
        query: {},
        acceptsEncodings: () => false
      } as never,
      {
        setHeader: vi.fn(),
        sendFile: vi.fn(),
        status: vi.fn().mockReturnThis(),
        end: vi.fn()
      } as never,
      next
    )

    expect(next).toHaveBeenCalledOnce()
  })
})
