export class MockInteractiveMap {
  static instances: MockInteractiveMap[] = []

  containerId: string
  options: Record<string, unknown>
  readyHandler: ((...args: unknown[]) => void) | undefined
  fitToBoundsCalls: unknown[] = []

  constructor(containerId: string, options: Record<string, unknown>) {
    this.containerId = containerId
    this.options = options
    MockInteractiveMap.instances.push(this)
  }

  on(event: string, handler: (...args: unknown[]) => void) {
    if (event === "map:ready") {
      this.readyHandler = handler
    }

    return this
  }

  fitToBounds(bounds: unknown) {
    this.fitToBoundsCalls.push(bounds)
  }

  emitReady() {
    this.readyHandler?.()
  }
}

export function resetMockInteractiveMap() {
  MockInteractiveMap.instances = []
}

export default MockInteractiveMap
