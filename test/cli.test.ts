import path from "node:path"
import { fileURLToPath } from "node:url"

import { describe, expect, it, vi } from "vitest"

import { isMainModule, runIfMain } from "../src/cli.js"

describe("isMainModule", () => {
  it("returns false when there is no entry path", () => {
    expect(isMainModule(import.meta.url, "")).toBe(false)
    expect(isMainModule(import.meta.url, undefined)).toBe(false)
  })

  it("returns true when the entry path matches the module URL", () => {
    expect(isMainModule(import.meta.url, fileURLToPath(import.meta.url))).toBe(true)
  })

  it("returns false when the entry path is a different file", () => {
    expect(isMainModule(import.meta.url, path.resolve("src/build.ts"))).toBe(false)
  })
})

describe("runIfMain", () => {
  it("does not run the callback when the module is imported", async () => {
    const run = vi.fn()

    await expect(runIfMain(import.meta.url, run, path.resolve("src/build.ts"))).resolves.toBe(
      false
    )
    expect(run).not.toHaveBeenCalled()
  })

  it("runs the callback when the module is the entry point", async () => {
    const run = vi.fn()

    await expect(
      runIfMain(import.meta.url, run, fileURLToPath(import.meta.url))
    ).resolves.toBe(true)
    expect(run).toHaveBeenCalledOnce()
  })
})
