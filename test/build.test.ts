import { access } from "node:fs/promises"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { build } from "../src/build.js"
import { publicDir } from "../src/paths.js"

describe("build", () => {
  it("renders pages, copies assets and writes Brotli files", { timeout: 120000 }, async () => {
    await build()

    await access(path.join(publicDir, "index.html"))
    await access(path.join(publicDir, "basic-map.html"))
    await access(path.join(publicDir, "robots.txt"))
    await access(path.join(publicDir, "_headers"))
    await access(path.join(publicDir, "_worker.js"))
    await access(path.join(publicDir, "javascripts/map.js"))
    await access(path.join(publicDir, "stylesheets/govuk-frontend.min.css"))
    await access(path.join(publicDir, "images/basic-map.png"))
  })
})
