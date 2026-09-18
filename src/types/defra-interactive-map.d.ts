declare module "@defra/interactive-map" {
  export default class InteractiveMap {
    constructor(
      container: string,
      options: {
        mapProvider: unknown
        mapLabel: string
        behaviour?: "buttonFirst" | "inline" | "hybrid" | "mapOnly"
        center?: [number, number]
        zoom?: number
        containerHeight?: string
        mapStyle?: {
          url: string
          attribution?: string
          backgroundColor?: string
        }
        [key: string]: unknown
      }
    )
    on(event: string, handler: (...args: unknown[]) => void): this
    fitToBounds(bounds: [number, number, number, number] | object): void
  }
}

declare module "@defra/interactive-map/providers/maplibre" {
  export default function maplibreProvider(): unknown
}

declare module "@defra/interactive-map/plugins/datasets" {
  export default function createDatasetsPlugin(options: {
    hasMenu?: boolean
    datasets: Array<{
      id: string
      label?: string
      geojson?: unknown
      minZoom?: number
      maxZoom?: number
      showInMenu?: boolean
      showInKey?: boolean
      style?: {
        stroke?: string
        strokeWidth?: number
        fill?: string
      }
    }>
  }): unknown
}
