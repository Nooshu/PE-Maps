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
  }
}

declare module "@defra/interactive-map/providers/maplibre" {
  export default function maplibreProvider(): unknown
}
