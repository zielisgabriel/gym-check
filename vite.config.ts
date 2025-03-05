import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import swc from "unplugin-swc";

console.log('Vitest configuration being loaded...');

export default defineConfig({
  plugins: [tsconfigPaths(), swc.vite({
    module: { type: 'es6' },
  })],
  test: {
    globals: true,
    root: "./",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  }
})