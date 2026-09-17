import express from "express"

import { publicDir } from "./paths.js"
import { servePrecompressed } from "./serve-precompressed.js"

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(servePrecompressed(publicDir))

app.listen(port, () => {
  console.log(`PE Maps listening on http://localhost:${port}`)
})
