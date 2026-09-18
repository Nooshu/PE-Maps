import { htmlWithoutJavaScript, isJavaScriptOffSearchParams } from "./html-without-javascript.js"

interface PagesEnv {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>
  }
}

export default {
  async fetch(request: Request, env: PagesEnv): Promise<Response> {
    const url = new URL(request.url)
    const response = await env.ASSETS.fetch(request)

    if (!isJavaScriptOffSearchParams(url.searchParams)) {
      return response
    }

    const contentType = response.headers.get("content-type") ?? ""

    if (!contentType.includes("text/html") || request.method === "HEAD") {
      return response
    }

    try {
      const html = htmlWithoutJavaScript(await response.clone().text())
      const headers = new Headers(response.headers)
      headers.delete("content-encoding")
      headers.delete("content-length")
      headers.set("content-type", "text/html; charset=utf-8")

      return new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers
      })
    } catch {
      return response
    }
  }
}
