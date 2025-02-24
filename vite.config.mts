import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsConfigPaths()],
    test: {
        environmentMatchGlobs: [
          ['src/controllers/**', './prisma/vitest-environment-prisma/prisma-test-environments.ts']
        ],
        dir: 'src',
    }
})