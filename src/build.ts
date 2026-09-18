import { constants as zlibConstants, brotliCompress } from "node:zlib"
import { promisify } from "node:util"
import { mkdir, readFile, readdir, rm, writeFile, cp } from "node:fs/promises"
import path from "node:path"

import * as esbuild from "esbuild"
import nunjucks from "nunjucks"

import {
  basicMap,
  directionsTableParams,
  planningKeyTableParams,
  planningRoadsTableParams,
  planningFacilitiesSummaryParams,
  planningTimetableTableParams,
  tpoKeyTableParams,
  tpoTreeDetailsSummaryParams,
  tpoTreesTableParams,
  titleKeyTableParams,
  titleSurroundingSummaryParams,
  roadKeyTableParams,
  roadSpeedTableParams,
  roadUnchangedTableParams,
  countrysideKeyTableParams,
  countrysideParcelsTableParams,
  countrysideAreaSummaryParams,
  countrysideParcelDetailsParams
} from "./maps/basic-map.js"
import { countrysideSchemesMap } from "./maps/countryside-schemes-map.js"
import { floodRiskMap } from "./maps/flood-risk-map.js"
import { planningMap } from "./maps/planning-map.js"
import { roadNetworkMap } from "./maps/road-network-map.js"
import { titleExtentMap } from "./maps/title-extent-map.js"
import { treePreservationMap } from "./maps/tree-preservation-map.js"
import { renderStaticMap } from "./maps/render-static-map.js"
import { routeMap } from "./maps/route-map.js"
import {
  govukFrontendDir,
  govukFrontendRoot,
  govukOverrideCss,
  interactiveMapCss,
  interactiveMapDatasetsCss,
  interactiveMapKeyCss,
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
    entryPoints: [
      path.join(projectRoot, "src/client/map.ts"),
      path.join(projectRoot, "src/client/route-map.ts"),
      path.join(projectRoot, "src/client/flood-risk-map.ts"),
      path.join(projectRoot, "src/client/planning-map.ts"),
      path.join(projectRoot, "src/client/tree-preservation-map.ts"),
      path.join(projectRoot, "src/client/title-extent-map.ts"),
      path.join(projectRoot, "src/client/road-network-map.ts"),
      path.join(projectRoot, "src/client/countryside-schemes-map.ts")
    ],
    bundle: true,
    format: "esm",
    sourcemap: false,
    outdir: path.join(publicDir, "javascripts"),
    plugins: [
      {
        name: "skip-unused-arcgis",
        setup(build) {
          build.onResolve({ filter: /^@arcgis\/core/ }, () => ({
            path: "arcgis-stub",
            namespace: "empty-module"
          }))
          build.onLoad({ filter: /.*/, namespace: "empty-module" }, () => ({
            contents: "export default {}\n"
          }))
        }
      }
    ]
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
  await copyStylesheetOrScript(
    interactiveMapDatasetsCss,
    path.join(publicDir, "stylesheets/interactive-map-datasets.css")
  )
  await copyStylesheetOrScript(
    interactiveMapKeyCss,
    path.join(publicDir, "stylesheets/interactive-map-key.css")
  )
  await copyStylesheetOrScript(
    govukOverrideCss,
    path.join(publicDir, "stylesheets/govuk-override.css")
  )
  await cp(path.join(govukFrontendRoot, "assets"), path.join(publicDir, "assets"), {
    recursive: true
  })

  await renderStaticMap(basicMap, path.join(publicDir, "images/basic-map.png"))
  await renderStaticMap(routeMap, path.join(publicDir, "images/route-map.png"))
  await renderStaticMap(floodRiskMap, path.join(publicDir, "images/flood-risk-map.png"))
  await renderStaticMap(planningMap, path.join(publicDir, "images/planning-map.png"))
  await renderStaticMap(treePreservationMap, path.join(publicDir, "images/tree-preservation-map.png"))
  await renderStaticMap(titleExtentMap, path.join(publicDir, "images/title-extent-map.png"))
  await renderStaticMap(roadNetworkMap, path.join(publicDir, "images/road-network-map.png"))
  await renderStaticMap(countrysideSchemesMap, path.join(publicDir, "images/countryside-schemes-map.png"))

  const nunjucksEnv = nunjucks.configure([viewsDir, govukFrontendDir], {
    autoescape: true
  })

  const pages: Array<{ template: string; output: string; context?: Record<string, unknown> }> = [
    { template: "index.njk", output: "index.html" },
    { template: "basic-map.njk", output: "basic-map.html", context: { map: basicMap } },
    {
      template: "route-map.njk",
      output: "route-map.html",
      context: { map: routeMap, directionsTable: directionsTableParams(routeMap) }
    },
    {
      template: "flood-risk-map.njk",
      output: "flood-risk-map.html",
      context: { map: floodRiskMap }
    },
    {
      template: "planning-map.njk",
      output: "planning-map.html",
      context: {
        map: planningMap,
        keyTable: planningKeyTableParams(planningMap),
        roadsTable: planningRoadsTableParams(planningMap),
        timetableTable: planningTimetableTableParams(planningMap),
        facilitiesSummary: planningFacilitiesSummaryParams(planningMap)
      }
    },
    {
      template: "tree-preservation-map.njk",
      output: "tree-preservation-map.html",
      context: {
        map: treePreservationMap,
        keyTable: tpoKeyTableParams(treePreservationMap),
        treesTable: tpoTreesTableParams(treePreservationMap),
        treeDetails: tpoTreeDetailsSummaryParams(treePreservationMap)
      }
    },
    {
      template: "title-extent-map.njk",
      output: "title-extent-map.html",
      context: {
        map: titleExtentMap,
        keyTable: titleKeyTableParams(titleExtentMap),
        surroundingSummary: titleSurroundingSummaryParams(titleExtentMap)
      }
    },
    {
      template: "road-network-map.njk",
      output: "road-network-map.html",
      context: {
        map: roadNetworkMap,
        keyTable: roadKeyTableParams(roadNetworkMap),
        speedTable: roadSpeedTableParams(roadNetworkMap),
        unchangedTable: roadUnchangedTableParams(roadNetworkMap)
      }
    },
    {
      template: "countryside-schemes-map.njk",
      output: "countryside-schemes-map.html",
      context: {
        map: countrysideSchemesMap,
        keyTable: countrysideKeyTableParams(countrysideSchemesMap),
        parcelsTable: countrysideParcelsTableParams(countrysideSchemesMap),
        areaSummary: countrysideAreaSummaryParams(countrysideSchemesMap),
        parcelDetails: countrysideParcelDetailsParams(countrysideSchemesMap)
      }
    }
  ]

  await Promise.all(
    pages.map(async (page) => {
      const html = nunjucksEnv.render(page.template, page.context ?? {})
      await writeFile(path.join(publicDir, page.output), html)
    })
  )

  const files = await collectFiles(publicDir)
  await Promise.all(files.map((filePath) => compressFile(filePath)))
}

await build()
