import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { describe, expect, it, vi } from "vitest"

import {
  collectDependencyErrors,
  directDependencies,
  isMainModule,
  lockfileEntry,
  publishedIntegrity,
  runCheck,
  start
} from "../scripts/check-dependencies.mjs"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

describe("check-dependencies helpers", () => {
  it("detects the CLI entry path", () => {
    expect(isMainModule(import.meta.url, "")).toBe(false)
    expect(isMainModule(import.meta.url, fileURLToPath(import.meta.url))).toBe(true)
    expect(isMainModule(import.meta.url, path.resolve("src/build.ts"))).toBe(false)
    expect(isMainModule(import.meta.url)).toBe(false)
  })

  it("merges direct dependencies and reads lockfile entries", () => {
    const packageJson = {
      dependencies: { express: "1.0.0" },
      devDependencies: { vitest: "1.0.0" }
    }
    const lockfile = {
      packages: {
        "node_modules/express": { version: "1.0.0", integrity: "sha512-abc" }
      }
    }

    expect(directDependencies(packageJson)).toEqual({ express: "1.0.0", vitest: "1.0.0" })
    expect(lockfileEntry(lockfile, "express")?.version).toBe("1.0.0")
    expect(lockfileEntry(lockfile, "missing")).toBeUndefined()
  })

  it("reads a published integrity hash with the default fetch implementation", async () => {
    const fetchImpl = vi.fn(async () => Response.json({ dist: { integrity: "sha512-default" } }))
    vi.stubGlobal("fetch", fetchImpl)

    await expect(publishedIntegrity("pe-maps", "1.0.0")).resolves.toBe("sha512-default")
    vi.unstubAllGlobals()
  })

  it("reads published integrity hashes and throws on HTTP errors", async () => {
    const ok = await publishedIntegrity("pe-maps", "1.0.0", async () =>
      Response.json({ dist: { integrity: "sha512-ok" } })
    )
    expect(ok).toBe("sha512-ok")

    await expect(
      publishedIntegrity("pe-maps", "1.0.0", async () => new Response("nope", { status: 500 }))
    ).rejects.toThrow(/responded 500/)
  })
})

describe("collectDependencyErrors", () => {
  it("reports pinning, lockfile and integrity problems", async () => {
    const packageJson = {
      dependencies: {
        ranged: "^1.0.0",
        missing: "1.0.0",
        mismatch: "1.0.0",
        "no-hash": "1.0.0",
        "bad-hash": "1.0.0",
        boom: "1.0.0",
        ok: "1.0.0"
      },
      devDependencies: {}
    }
    const lockfile = {
      packages: {
        "": { name: "pe-maps" },
        "node_modules/mismatch": {
          version: "9.9.9",
          integrity: "sha512-lock",
          resolved: "https://registry.npmjs.org/mismatch/-/mismatch-9.9.9.tgz"
        },
        "node_modules/no-hash": {
          version: "1.0.0",
          resolved: "https://registry.npmjs.org/no-hash/-/no-hash-1.0.0.tgz"
        },
        "node_modules/bad-hash": {
          version: "1.0.0",
          integrity: "md5-not-allowed",
          resolved: "https://registry.npmjs.org/bad-hash/-/bad-hash-1.0.0.tgz"
        },
        "node_modules/boom": {
          version: "1.0.0",
          integrity: "sha512-lock",
          resolved: "https://registry.npmjs.org/boom/-/boom-1.0.0.tgz"
        },
        "node_modules/ok": {
          version: "1.0.0",
          integrity: "sha512-lock",
          resolved: "https://registry.npmjs.org/ok/-/ok-1.0.0.tgz"
        },
        "node_modules/file-dep": {
          version: "1.0.0",
          resolved: "file:../file-dep"
        },
        "node_modules/http-dep": {
          version: "1.0.0",
          resolved: 123
        },
        "node_modules/unpublished-hash": {
          version: "1.0.0",
          resolved: "https://registry.npmjs.org/unpublished-hash/-/unpublished-hash-1.0.0.tgz"
        }
      }
    }

    const fetchImpl = vi.fn(async (url) => {
      if (String(url).includes("/ok/")) {
        return Response.json({ dist: { integrity: "sha512-published" } })
      }

      if (String(url).includes("/boom/")) {
        throw new Error("timeout")
      }

      throw "registry down"
    })

    const { errors, warnings } = await collectDependencyErrors(packageJson, lockfile, fetchImpl)

    expect(errors).toEqual(
      expect.arrayContaining([
        'ranged must be pinned to an exact version (found "^1.0.0")',
        "missing is missing from package-lock.json",
        "mismatch is 1.0.0 in package.json but 9.9.9 in the lockfile",
        "no-hash is missing a lockfile integrity hash",
        "bad-hash is missing a lockfile integrity hash",
        "node_modules/unpublished-hash is missing a lockfile integrity hash",
        "ok@1.0.0 lockfile integrity does not match the registry SHA (sha512-published)"
      ])
    )
    expect(warnings.some((warning) => warning.includes("mismatch@1.0.0"))).toBe(true)
    expect(warnings.some((warning) => warning.includes("boom@1.0.0: timeout"))).toBe(true)
  })

  it("uses the global fetch implementation by default", async () => {
    vi.stubGlobal("fetch", async () => {
      throw new Error("no network")
    })

    const { warnings } = await collectDependencyErrors(
      { dependencies: { express: "5.2.1" }, devDependencies: {} },
      {
        packages: {
          "node_modules/express": {
            version: "5.2.1",
            integrity: "sha512-lock",
            resolved: "https://registry.npmjs.org/express/-/express-5.2.1.tgz"
          }
        }
      }
    )

    expect(warnings[0]).toContain("express@5.2.1: no network")
    vi.unstubAllGlobals()
  })
})

describe("runCheck", () => {
  it("prints errors and exits when the lockfile is invalid", async () => {
    const exit = vi.fn()
    const error = vi.fn()
    const warn = vi.fn()
    const log = vi.fn()

    const code = await runCheck({
      packageJson: { dependencies: { express: "^1.0.0" }, devDependencies: {} },
      lockfile: { packages: {} },
      fetchImpl: async () => Response.json({ dist: { integrity: "sha512-x" } }),
      exit,
      error,
      warn,
      log
    })

    expect(code).toBe(1)
    expect(exit).toHaveBeenCalledWith(1)
    expect(error).toHaveBeenCalled()
    expect(log).not.toHaveBeenCalled()
  })

  it("prints registry warnings before succeeding", async () => {
    const exit = vi.fn()
    const error = vi.fn()
    const warn = vi.fn()
    const log = vi.fn()

    const code = await runCheck({
      packageJson: { dependencies: { express: "5.2.1" }, devDependencies: {} },
      lockfile: {
        packages: {
          "node_modules/express": {
            version: "5.2.1",
            integrity: "sha512-lock",
            resolved: "https://registry.npmjs.org/express/-/express-5.2.1.tgz"
          }
        }
      },
      fetchImpl: async () => {
        throw new Error("offline")
      },
      exit,
      error,
      warn,
      log
    })

    expect(code).toBe(0)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("express@5.2.1: offline"))
    expect(log).toHaveBeenCalledWith("Checked pinned versions and lockfile integrity hashes.")
  })

  it("logs success when pinned versions match mocked registry hashes", async () => {
    const packageJson = JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"))
    const lockfile = JSON.parse(await readFile(path.join(projectRoot, "package-lock.json"), "utf8"))
    const exit = vi.fn()
    const error = vi.fn()
    const warn = vi.fn()
    const log = vi.fn()
    const fetchImpl = async (input: string | URL) => {
      const url = new URL(String(input), "https://registry.npmjs.org")
      const parts = url.pathname.split("/").filter(Boolean)
      const name = decodeURIComponent(parts.slice(0, -1).join("/") || parts[0] || "")
      const locked = lockfile.packages[`node_modules/${name}`]
      return Response.json({ dist: { integrity: locked.integrity } })
    }

    const code = await runCheck({
      packageJson,
      lockfile,
      fetchImpl,
      exit,
      error,
      warn,
      log
    })

    expect(code).toBe(0)
    expect(exit).not.toHaveBeenCalled()
    expect(log).toHaveBeenCalledWith("Checked pinned versions and lockfile integrity hashes.")
  })

  it("reads package.json and the lockfile from disk by default", async () => {
    const lockfile = JSON.parse(await readFile(path.join(projectRoot, "package-lock.json"), "utf8"))
    const log = vi.fn()
    const fetchImpl = async (input: string | URL) => {
      const url = new URL(String(input), "https://registry.npmjs.org")
      const parts = url.pathname.split("/").filter(Boolean)
      const name = decodeURIComponent(parts.slice(0, -1).join("/") || parts[0] || "")
      const locked = lockfile.packages[`node_modules/${name}`]
      return Response.json({ dist: { integrity: locked?.integrity } })
    }

    const code = await runCheck({
      fetchImpl,
      log,
      warn: vi.fn(),
      error: vi.fn(),
      exit: vi.fn()
    })

    expect(code).toBe(0)
  })
})

describe("start", () => {
  it("no-ops when imported and runs when it is the CLI entry", async () => {
    const run = vi.fn()

    await expect(start({ argv1: path.resolve("src/build.ts"), run })).resolves.toBe(false)
    await expect(start({ argv1: fileURLToPath(import.meta.url), run })).resolves.toBe(false)

    await expect(
      start({
        metaUrl: import.meta.url,
        argv1: fileURLToPath(import.meta.url),
        run
      })
    ).resolves.toBe(true)
    expect(run).toHaveBeenCalledOnce()
  })

  it("runs the checker when this file is the CLI entry", async () => {
    const lockfile = JSON.parse(await readFile(path.join(projectRoot, "package-lock.json"), "utf8"))
    vi.stubGlobal("fetch", async (input: string | URL) => {
      const url = new URL(String(input), "https://registry.npmjs.org")
      const parts = url.pathname.split("/").filter(Boolean)
      const name = decodeURIComponent(parts.slice(0, -1).join("/") || parts[0] || "")
      const locked = lockfile.packages[`node_modules/${name}`]
      return Response.json({ dist: { integrity: locked?.integrity } })
    })
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined)
    const script = path.join(projectRoot, "scripts/check-dependencies.mjs")

    await expect(start({ argv1: script })).resolves.toBe(true)
    expect(log).toHaveBeenCalledWith("Checked pinned versions and lockfile integrity hashes.")
    log.mockRestore()
    vi.unstubAllGlobals()
  })
})
