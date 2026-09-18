import path from "node:path"

import { ensureStaticMaps } from "./maps/render-static-map.js"
import { staticMapDefinitions } from "./maps/static-map-definitions.js"
import { publicDir } from "./paths.js"

await ensureStaticMaps(staticMapDefinitions, path.join(publicDir, "images"), { force: true })
