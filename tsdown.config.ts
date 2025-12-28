import { defineConfig } from "tsdown";
import stripComments from "vite-plugin-strip-comments";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  target: "esnext",
  exports: true,
  format: ["iife", "esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  globalName: "EventListener",
  plugins: [stripComments()],
});
