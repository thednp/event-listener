import { defineConfig } from "vitest/config";

export default defineConfig({
  optimizeDeps: {
    include: [
      "@vitest/coverage-istanbul"
    ]
  },
  test: {
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["html", "text", "lcov"],
      enabled: true,
      include: ["src/**/*.{ts,tsx}"],
    },
    browser: {
      instances: [
        {
          browser: "chromium",
        }
      ],
      provider: 'playwright', // or 'webdriverio'
      enabled: true,
      headless: true,
    },
  },
});
