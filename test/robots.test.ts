import { describe, expect, it } from "vitest"

import { cloudflareHeaders, robotsTagValue, robotsTxt } from "../src/robots.js"

describe("robots", () => {
  it("blocks indexing in the robots tag, robots.txt and Cloudflare headers", () => {
    expect(robotsTagValue).toContain("noindex")
    expect(robotsTxt).toContain("Disallow: /")
    expect(cloudflareHeaders).toContain(robotsTagValue)
  })
})
