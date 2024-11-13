import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import TurboConsole from 'unplugin-turbo-console/vite'
import packageJson from './package.json'

export default defineConfig({
  main: {
    plugins: [tsconfigPaths(),externalizeDepsPlugin()],
    build: {
				commonjsOptions: {
					ignoreDynamicRequires: true
				},
				outDir: 'dist/main',
			},
    resolve: {
				alias: {
					'~/*': resolve('./src/*'),
					'~src/*': resolve('./src/main/*'),
					'~utils/*': resolve('./src/main/utils/*'),
					'@/*': resolve('./*'),
					'@src/*': resolve('./src/main/*'),
					'@utils/*': resolve('./src/main/utils/*'),
					'~window/*': resolve('./src/main/window/*'),
					'~feature/*': resolve('./src/main/feature/*'),
					'~modules/*': resolve('./src/main/modules/*'),
					'@modules/*': resolve('./src/main/modules/*')
				}
			}
  },
  preload: {
    plugins: [tsconfigPaths(), externalizeDepsPlugin()],
			build: {
				outDir: 'dist/preload',
			}
  },
  renderer: {
    plugins: [react(), tsconfigPaths(), TurboConsole({})],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    build: {
				target: ['chrome126'],
				outDir: 'dist/renderer'
			},
			define: {
				'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJson.version)
			}
  }
})
