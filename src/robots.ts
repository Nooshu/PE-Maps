export const robotsTagValue =
  "noindex, nofollow, noarchive, nosnippet, noimageindex"

export const robotsTxt = `# Prototype only. These pages must not appear in search results.
User-agent: *
Disallow: /
`

export const cloudflareHeaders = `/*
  X-Robots-Tag: ${robotsTagValue}
`
