import { access, readFile } from "node:fs/promises"
import path from "node:path"

import type { RequestHandler } from "express"

import { htmlWithoutJavaScript, isJavaScriptOffQuery } from "./html-without-javascript.js"

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/vnd.microsoft.icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

function isInsidePublicRoot(publicRoot: string, filePath: string): boolean {
  return filePath === publicRoot || filePath.startsWith(`${publicRoot}${path.sep}`)
}

function candidatePublicPaths(publicRoot: string, urlPath: string): string[] {
  const relativePath = decodeURIComponent(urlPath)
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
  const resolvedPath = path.resolve(publicRoot, relativePath || "index.html")

  if (!isInsidePublicRoot(publicRoot, resolvedPath)) {
    return []
  }

  if (!relativePath) {
    return [resolvedPath]
  }

  if (path.extname(resolvedPath)) {
    return [resolvedPath]
  }

  return [resolvedPath, `${resolvedPath}.html`, path.join(resolvedPath, "index.html")].filter(
    (filePath) => isInsidePublicRoot(publicRoot, filePath)
  )
}

function contentTypeFor(filePath: string): string {
  return contentTypes[path.extname(filePath)] ?? "application/octet-stream"
}

export function servePrecompressed(publicRoot: string): RequestHandler {
  const resolvedRoot = path.resolve(publicRoot)

  return async (request, response, next) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      next()
      return
    }

    if (request.path.endsWith(".br") || request.path.endsWith(".map")) {
      response.status(404).end()
      return
    }

    const filePath = (
      await Promise.all(
        candidatePublicPaths(resolvedRoot, request.path).map(async (candidate) =>
          (await fileExists(candidate)) ? candidate : undefined
        )
      )
    ).find((candidate) => candidate !== undefined)

    if (!filePath) {
      response.status(404).end()
      return
    }

    if (path.extname(filePath) === ".html" && isJavaScriptOffQuery(request.query)) {
      const html = htmlWithoutJavaScript(await readFile(filePath, "utf8"))

      response.setHeader("Content-Type", contentTypeFor(filePath))
      response.send(html)
      return
    }

    const acceptsBrotli = Boolean(request.acceptsEncodings("br"))
    const brotliPath = `${filePath}.br`
    const canServeBrotli = acceptsBrotli && (await fileExists(brotliPath))

    if (canServeBrotli) {
      response.setHeader("Content-Type", contentTypeFor(filePath))
      response.setHeader("Content-Encoding", "br")
      response.setHeader("Vary", "Accept-Encoding")
      response.sendFile(brotliPath)
      return
    }

    if (await fileExists(filePath)) {
      response.setHeader("Content-Type", contentTypeFor(filePath))
      response.setHeader("Vary", "Accept-Encoding")
      response.sendFile(filePath)
      return
    }

    next()
  }
}
