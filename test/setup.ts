import { vi } from "vitest"

import { MockInteractiveMap } from "./mocks/interactive-map.js"

vi.mock("@defra/interactive-map", () => ({
  default: MockInteractiveMap
}))

vi.mock("@defra/interactive-map/providers/maplibre", () => ({
  default: () => ({ name: "maplibre" })
}))

vi.mock("@defra/interactive-map/plugins/datasets", () => ({
  default: (options: unknown) => ({ name: "datasets", options })
}))

vi.mock("@defra/interactive-map/plugins/map-key", () => ({
  default: (options?: unknown) => ({ name: "map-key", options })
}))
