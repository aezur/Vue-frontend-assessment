import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      silent: true, // Suppress console output during tests
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      // Vitest 4 syntax (no poolOptions)
      pool: "forks",
      isolate: false,
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        exclude: [
          "node_modules/",
          "src/main.js",
          "**/*.config.js",
          "**/dist/**",
        ],
      },
    },
  }),
);
