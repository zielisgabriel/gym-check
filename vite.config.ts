import { defineConfig } from 'vitest/config'
import tsconfigPaths from "vite-tsconfig-paths";

console.log('Vitest configuration being loaded...');

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    workspace: [
      {
        test: {
          include: ["./src/controllers/**/*.spec.ts"],
          name: 'prisma',
          environment: "./prisma/vitest-environment-prisma/prisma-test-environments.mts",
        }
      }
    ],
    dir: 'src',
  }
})