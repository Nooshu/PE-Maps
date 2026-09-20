import { mkdtemp, writeFile } from "node:fs/promises"
import type { Server } from "node:http"
import { tmpdir } from "node:os"
import path from "node:path"

import { afterEach, describe, expect, it, vi } from "vitest"

import { createApp, portFromEnv, startFromCli, startServer } from "../src/server.js"
import { robotsTagValue } from "../src/robots.js"

describe("portFromEnv", () => {
  it("uses PORT when it is a positive number and 3000 otherwise", () => {
    expect(portFromEnv({ PORT: "4173" })).toBe(4173)
    expect(portFromEnv({})).toBe(3000)
    expect(portFromEnv({ PORT: "nope" })).toBe(3000)
    expect(portFromEnv({ PORT: "0" })).toBe(3000)
  })
})

describe("createApp and startServer", () => {
  const servers: Server[] = []

  afterEach(async () => {
    await Promise.all(
      servers.splice(0).map(
        (server) =>
          new Promise<void>((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()))
          })
      )
    )
    vi.restoreAllMocks()
  })

  it("sets the robots tag and serves files from the public root", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "pe-maps-server-"))
    await writeFile(path.join(root, "index.html"), "<p>Hello</p>")
    const app = createApp(root)
    const server = await new Promise<Server>((resolve) => {
      const started = app.listen(0, "127.0.0.1", () => resolve(started))
    })
    servers.push(server)
    const address = server.address()

    if (!address || typeof address === "string") {
      throw new Error("Expected a TCP address")
    }

    const response = await fetch(`http://127.0.0.1:${address.port}/`)

    expect(response.headers.get("x-robots-tag")).toBe(robotsTagValue)
    expect(await response.text()).toBe("<p>Hello</p>")
  })

  it("listens on an explicit port and logs the URL", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "pe-maps-listen-"))
    await writeFile(path.join(root, "index.html"), "<p>Hi</p>")
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)
    const server = startServer({ port: 0, staticRoot: root })
    servers.push(server)
    await new Promise((resolve) => server.once("listening", resolve))
    const address = server.address()

    if (!address || typeof address === "string") {
      throw new Error("Expected a TCP address")
    }

    expect(log).toHaveBeenCalledWith("PE Maps listening on http://localhost:0")
  })

  it("listens on PORT when no explicit port is given", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "pe-maps-env-port-"))
    await writeFile(path.join(root, "index.html"), "<p>Hi</p>")
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)
    const port = 20000 + Math.floor(Math.random() * 10000)
    vi.stubEnv("PORT", String(port))
    const server = startServer({ staticRoot: root })
    servers.push(server)
    await new Promise((resolve) => server.once("listening", resolve))

    expect(log).toHaveBeenCalledWith(`PE Maps listening on http://localhost:${port}`)
    vi.unstubAllEnvs()
  })

  it("starts from the CLI using PORT and the default public directory", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)
    const port = 21000 + Math.floor(Math.random() * 10000)
    vi.stubEnv("PORT", String(port))
    const server = startFromCli()
    servers.push(server)
    await new Promise((resolve) => server.once("listening", resolve))

    expect(log).toHaveBeenCalledWith(`PE Maps listening on http://localhost:${port}`)
    vi.unstubAllEnvs()
  })
})
