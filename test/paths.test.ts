import { existsSync } from "node:fs"
import path from "node:path"

import { describe, expect, it } from "vitest"

import {
  govukFrontendDir,
  govukFrontendRoot,
  govukOverrideCss,
  interactiveMapCss,
  interactiveMapDatasetsCss,
  interactiveMapKeyCss,
  projectRoot,
  publicDir,
  staticMapsDir,
  viewsDir
} from "../src/paths.js"

describe("paths", () => {
  it("resolves project paths from the source directory", () => {
    expect(path.basename(projectRoot)).toBe("PE-Maps")
    expect(publicDir).toBe(path.join(projectRoot, "public"))
    expect(viewsDir).toBe(path.join(projectRoot, "views"))
    expect(govukOverrideCss).toBe(path.join(projectRoot, "assets/stylesheets/govuk-override.css"))
    expect(staticMapsDir).toBe(path.join(projectRoot, "assets/images/static-maps"))
    expect(govukFrontendRoot).toBe(path.join(govukFrontendDir, "govuk"))
    expect(interactiveMapCss).toContain(path.join("node_modules", "@defra", "interactive-map"))
    expect(interactiveMapDatasetsCss).toContain("plugins/datasets")
    expect(interactiveMapKeyCss).toContain("plugins/map-key")
    expect(existsSync(govukOverrideCss)).toBe(true)
    expect(existsSync(viewsDir)).toBe(true)
  })
})
