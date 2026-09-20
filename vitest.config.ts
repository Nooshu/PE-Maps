import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./test/setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
      include: ["src/**/*.ts", "scripts/**/*.mjs"],
      exclude: ["src/types/**", "**/*.d.ts"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100
      }
    }
  }
})
