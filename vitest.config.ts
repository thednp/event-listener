import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
// import playwright  from "playwright";

export default defineConfig({
  optimizeDeps: {
    include: ["@vitest/coverage-istanbul"],
  },
  test: {
    globals: true,
    browser: {
      enabled: true,
      provider: playwright({}),
      instances: [{ browser: "chromium" }],
      ui: false,
      headless: true,
    },
    coverage: {
      provider: "istanbul",
      reporter: ["html", "text", "lcov"],
      enabled: true,
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
