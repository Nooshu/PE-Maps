import path from "node:path"

import { runIfMain } from "./cli.js"
import { ensureStaticMaps } from "./maps/render-static-map.js"
import { staticMapDefinitions } from "./maps/static-map-definitions.js"
import { publicDir } from "./paths.js"

export async function writeStaticMaps(): Promise<void> {
  await ensureStaticMaps(staticMapDefinitions, path.join(publicDir, "images"), { force: true })
}

await runIfMain(import.meta.url, writeStaticMaps)
