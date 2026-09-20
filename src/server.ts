import type { Server } from "node:http"

import express from "express"

import { runIfMain } from "./cli.js"
import { publicDir } from "./paths.js"
import { robotsTagValue } from "./robots.js"
import { servePrecompressed } from "./serve-precompressed.js"

export function portFromEnv(env: NodeJS.ProcessEnv = process.env): number {
  return Number(env.PORT) || 3000
}

export function createApp(staticRoot = publicDir) {
  const app = express()

  app.use((_request, response, next) => {
    response.setHeader("X-Robots-Tag", robotsTagValue)
    next()
  })

  app.use(servePrecompressed(staticRoot))

  return app
}

export function startServer(options: { port?: number; staticRoot?: string } = {}): Server {
  const listenPort = options.port ?? portFromEnv()
  const app = createApp(options.staticRoot)

  return app.listen(listenPort, () => {
    console.log(`PE Maps listening on http://localhost:${listenPort}`)
  })
}

export function startFromCli(): Server {
  return startServer()
}

await runIfMain(import.meta.url, startFromCli)
