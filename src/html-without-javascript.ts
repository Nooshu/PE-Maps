export function htmlWithoutJavaScript(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<\/?noscript\b[^>]*>/gi, "")
}

export function isJavaScriptOffQuery(query: { js?: unknown }): boolean {
  return query.js === "off"
}

export function isJavaScriptOffSearchParams(searchParams: URLSearchParams): boolean {
  return searchParams.get("js") === "off"
}
