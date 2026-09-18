import { htmlWithoutJavaScript, isJavaScriptOffSearchParams } from "./html-without-javascript.js"
import { robotsTagValue } from "./robots.js"

function withRobotsTag(response: Response): Response {
  const headers = new Headers(response.headers)
  headers.set("X-Robots-Tag", robotsTagValue)

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

interface PagesEnv {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>
  }
}

export default {
  async fetch(request: Request, env: PagesEnv): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === "/_headers" || url.pathname === "/_worker.js") {
      return withRobotsTag(new Response(null, { status: 404 }))
    }

    const response = await env.ASSETS.fetch(request)

    if (!isJavaScriptOffSearchParams(url.searchParams)) {
      return withRobotsTag(response)
    }

    const contentType = response.headers.get("content-type") ?? ""

    if (!contentType.includes("text/html") || request.method === "HEAD") {
      return withRobotsTag(response)
    }

    try {
      const html = htmlWithoutJavaScript(await response.clone().text())
      const headers = new Headers(response.headers)
      headers.delete("content-encoding")
      headers.delete("content-length")
      headers.set("content-type", "text/html; charset=utf-8")

      return withRobotsTag(
        new Response(html, {
          status: response.status,
          statusText: response.statusText,
          headers
        })
      )
    } catch {
      return withRobotsTag(response)
    }
  }
}
