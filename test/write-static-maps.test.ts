import { describe, expect, it, vi } from "vitest"

import { writeStaticMaps } from "../src/write-static-maps.js"
import { ensureStaticMaps } from "../src/maps/render-static-map.js"
import { staticMapDefinitions } from "../src/maps/static-map-definitions.js"
import { publicDir } from "../src/paths.js"
import path from "node:path"

vi.mock("../src/maps/render-static-map.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/maps/render-static-map.js")>()

  return {
    ...actual,
    ensureStaticMaps: vi.fn()
  }
})

describe("writeStaticMaps", () => {
  it("renders every static map into public/images with force enabled", async () => {
    await writeStaticMaps()

    expect(ensureStaticMaps).toHaveBeenCalledWith(
      staticMapDefinitions,
      path.join(publicDir, "images"),
      { force: true }
    )
  })
})
