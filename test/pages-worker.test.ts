import { describe, expect, it, vi } from "vitest"

import worker from "../src/pages-worker.js"
import { robotsTagValue } from "../src/robots.js"

function htmlResponse(body: string, init?: ResponseInit) {
  return new Response(body, {
    status: 200,
    statusText: init?.statusText ?? "OK",
    headers: { "content-type": "text/html; charset=utf-8", ...init?.headers }
  })
}

describe("pages worker", () => {
  it("hides Cloudflare internals", async () => {
    const env = { ASSETS: { fetch: vi.fn() } }

    for (const pathname of ["/_headers", "/_worker.js"]) {
      const response = await worker.fetch(new Request(`https://example.test${pathname}`), env)

      expect(response.status).toBe(404)
      expect(response.headers.get("X-Robots-Tag")).toBe(robotsTagValue)
      expect(env.ASSETS.fetch).not.toHaveBeenCalled()
    }
  })

  it("adds the robots tag to ordinary responses", async () => {
    const env = {
      ASSETS: {
        fetch: vi.fn(async () => new Response("ok", { headers: { "content-type": "text/plain" } }))
      }
    }

    const response = await worker.fetch(new Request("https://example.test/robots.txt"), env)

    expect(await response.text()).toBe("ok")
    expect(response.headers.get("X-Robots-Tag")).toBe(robotsTagValue)
  })

  it("leaves non-HTML requests unchanged when JavaScript is off", async () => {
    const env = {
      ASSETS: {
        fetch: async () => new Response("image", { headers: { "content-type": "image/png" } })
      }
    }

    const response = await worker.fetch(
      new Request("https://example.test/images/basic-map.png?js=off"),
      env
    )

    expect(await response.text()).toBe("image")
    expect(response.headers.get("X-Robots-Tag")).toBe(robotsTagValue)
  })

  it("leaves HEAD HTML requests unchanged when JavaScript is off", async () => {
    const env = {
      ASSETS: {
        fetch: async () => htmlResponse("<script>1</script><p>Hi</p>")
      }
    }

    const response = await worker.fetch(
      new Request("https://example.test/?js=off", { method: "HEAD" }),
      env
    )

    expect(response.headers.get("content-type")).toContain("text/html")
    expect(response.headers.get("X-Robots-Tag")).toBe(robotsTagValue)
  })

  it("leaves responses without a content type unchanged when JavaScript is off", async () => {
    const env = {
      ASSETS: {
        fetch: async () => new Response("raw")
      }
    }

    const response = await worker.fetch(new Request("https://example.test/?js=off"), env)

    expect(await response.text()).toBe("raw")
  })

  it("treats a missing content type as non-HTML when JavaScript is off", async () => {
    const env = {
      ASSETS: {
        fetch: async () => new Response(null)
      }
    }

    const response = await worker.fetch(new Request("https://example.test/?js=off"), env)

    expect(response.headers.get("X-Robots-Tag")).toBe(robotsTagValue)
  })

  it("strips scripts from HTML when JavaScript is off", async () => {
    const env = {
      ASSETS: {
        fetch: async () =>
          htmlResponse(
            '<script src="/javascripts/map.js"></script><noscript><p>Fallback</p></noscript>',
            { headers: { "content-encoding": "br", "content-length": "12" } }
          )
      }
    }

    const response = await worker.fetch(new Request("https://example.test/basic-map?js=off"), env)

    expect(await response.text()).toBe("<p>Fallback</p>")
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8")
    expect(response.headers.get("content-encoding")).toBeNull()
    expect(response.headers.get("content-length")).toBeNull()
    expect(response.headers.get("X-Robots-Tag")).toBe(robotsTagValue)
  })

  it("falls back to the original response when HTML cannot be read", async () => {
    const failing = new Response("broken", {
      headers: { "content-type": "text/html" }
    })
    failing.clone = () => {
      throw new Error("clone failed")
    }

    const env = { ASSETS: { fetch: async () => failing } }
    const response = await worker.fetch(new Request("https://example.test/?js=off"), env)

    expect(await response.text()).toBe("broken")
    expect(response.headers.get("X-Robots-Tag")).toBe(robotsTagValue)
  })
})
