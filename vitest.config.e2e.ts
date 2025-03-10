import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [tsconfigPaths(), swc.vite({
    module: { type: "es6" },
  })],
  test: {
    globals: true,
    dir: "src",
    workspace: [
      {
        plugins: [swc.vite({
          module: { type: "es6" }
        })],
        extends: true,
        test: {
          include: ["**/*.e2e-spec.ts"],
          name: "prisma",
          environment: "./prisma/vitest-environment-prisma/prisma-test-environments.ts",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})