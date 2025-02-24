import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

console.log('Vitest configuration being loaded...');

export default defineConfig({
    plugins: [tsConfigPaths()],
    test: {
      workspace: [
        {
          test: {
            include: ["./src/controllers/**/*.spec.ts"],
            name: 'prisma',
            environment: "./prisma/vitest-environment-prisma/prisma-test-environments.ts",
          }
        }
      ],
      dir: 'src',
    }
})

/*
environmentMatchGlobs: [
  ["./prisma/vitest-environment-prisma", "./src/controllers/**"],
],
*/