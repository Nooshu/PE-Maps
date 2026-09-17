import path from "node:path"
import { fileURLToPath } from "node:url"

export const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
export const publicDir = path.join(projectRoot, "public")
export const viewsDir = path.join(projectRoot, "views")
export const govukFrontendDir = path.join(projectRoot, "node_modules/govuk-frontend/dist")
export const govukFrontendRoot = path.join(govukFrontendDir, "govuk")
export const interactiveMapCss = path.join(
  projectRoot,
  "node_modules/@defra/interactive-map/dist/css/index.css"
)
