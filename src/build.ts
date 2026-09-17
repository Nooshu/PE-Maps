import { constants as zlibConstants, brotliCompress } from "node:zlib"
import { promisify } from "node:util"
import { mkdir, readFile, readdir, rm, writeFile, cp } from "node:fs/promises"
import path from "node:path"

import * as esbuild from "esbuild"
import nunjucks from "nunjucks"

import {
  govukFrontendDir,
  govukFrontendRoot,
  interactiveMapCss,
  projectRoot,
  publicDir,
  viewsDir
} from "./paths.js"

const brotliCompressAsync = promisify(brotliCompress)

const compressibleExtensions = new Set([
  ".css",
  ".html",
  ".ico",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".txt",
  ".xml"
])

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / 1024 ** 2).toFixed(1)} MB`
}

async function collectFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)))
      continue
    }

    files.push(fullPath)
  }

  return files
}

function stripSourceMappingUrl(contents: string): string {
  return `${contents
    .replace(/\/\*# sourceMappingURL=[\s\S]*?\*\//g, "")
    .replace(/\/\/[#@] sourceMappingURL=.*$/gm, "")
    .trimEnd()}\n`
}

async function copyStylesheetOrScript(from: string, to: string): Promise<void> {
  await mkdir(path.dirname(to), { recursive: true })
  const contents = await readFile(from, "utf8")
  await writeFile(to, stripSourceMappingUrl(contents))
}

async function compressFile(filePath: string): Promise<void> {
  const extension = path.extname(filePath)

  if (extension === ".br" || extension === ".map" || !compressibleExtensions.has(extension)) {
    return
  }

  const source = await readFile(filePath)
  const compressed = await brotliCompressAsync(source, {
    params: {
      [zlibConstants.BROTLI_PARAM_QUALITY]: zlibConstants.BROTLI_MAX_QUALITY,
      [zlibConstants.BROTLI_PARAM_SIZE_HINT]: source.length
    }
  })

  if (compressed.length >= source.length) {
    return
  }

  await writeFile(`${filePath}.br`, compressed)
  console.log(
    `brotli ${path.relative(publicDir, filePath)}: ${formatBytes(source.length)} → ${formatBytes(compressed.length)}`
  )
}

export async function build(): Promise<void> {
  await rm(publicDir, { recursive: true, force: true })
  await mkdir(publicDir, { recursive: true })

  await esbuild.build({
    entryPoints: [path.join(projectRoot, "src/client/map.ts")],
    bundle: true,
    format: "esm",
    sourcemap: false,
    outfile: path.join(publicDir, "javascripts/map.js")
  })

  await copyStylesheetOrScript(
    path.join(govukFrontendRoot, "govuk-frontend.min.js"),
    path.join(publicDir, "javascripts/govuk-frontend.min.js")
  )
  await copyStylesheetOrScript(
    path.join(govukFrontendRoot, "govuk-frontend.min.css"),
    path.join(publicDir, "stylesheets/govuk-frontend.min.css")
  )
  await copyStylesheetOrScript(
    interactiveMapCss,
    path.join(publicDir, "stylesheets/interactive-map.css")
  )
  await cp(path.join(govukFrontendRoot, "assets"), path.join(publicDir, "assets"), {
    recursive: true
  })

  const nunjucksEnv = nunjucks.configure([viewsDir, govukFrontendDir], {
    autoescape: true
  })

  const pages = [
    { template: "index.njk", output: "index.html" },
    { template: "basic-map.njk", output: "basic-map.html" }
  ]

  await Promise.all(
    pages.map(async (page) => {
      const html = nunjucksEnv.render(page.template)
      await writeFile(path.join(publicDir, page.output), html)
    })
  )

  const files = await collectFiles(publicDir)
  await Promise.all(files.map((filePath) => compressFile(filePath)))
}

await build()
