import {fileURLToPath, URL} from 'node:url';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import {defineConfig} from 'vite';
import {patchCssModules} from 'vite-css-modules';
import {ViteMinifyPlugin as viteMinifyHTML} from 'vite-plugin-minify';
import svgr from 'vite-plugin-svgr';
import {getEnvs, parseBoolean} from './data/utils/env';
import logger from './data/vite/logger';
import viteAppEnv from './data/vite/plugins/vite-plugin-app-env';
import viteMinimizeClassNames from './data/vite/plugins/vite-plugin-minimize-class-names';

export default defineConfig(async ({mode}) => {
  const {appEnv, buildEnv} = getEnvs(mode);

  return {
    mode,
    build: {
      outDir: 'build',
      emptyOutDir: true,
      target: browserslistToEsbuild(),
      modulePreload: true,
    },
    plugins: [
      react(),
      viteAppEnv({appEnv}),
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          exportType: 'named',
          namedExport: 'ReactComponent',
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    cleanupIds: false,
                    removeHiddenElems: false,
                  },
                },
              },
              {
                name: 'prefixIds',
                params: {
                  prefix: false,
                },
              },
            ],
          },
        },
      }),
      viteMinifyHTML(),
      patchCssModules(),
      viteMinimizeClassNames(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@icons': fileURLToPath(
          new URL('./src/assets/medias/icons', import.meta.url)
        ),
        '@fonts': fileURLToPath(
          new URL('./src/assets/styles/fonts', import.meta.url)
        ),
        '@components': fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
        '@constants': fileURLToPath(
          new URL('./src/constants', import.meta.url)
        ),
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
        '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '@i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)),
      },
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/core/mixins.scss" as *;`,
        },
      },
    },
    server: {
      port: buildEnv?.PORT ? Number(buildEnv.PORT) : undefined,
      host: buildEnv?.HOST ? buildEnv.HOST : undefined,
      open:
        buildEnv?.OPEN_BROWSER_ON_START === undefined ||
        parseBoolean(buildEnv?.OPEN_BROWSER_ON_START)
          ? '/'
          : false,
    },
    customLogger: logger,
    clearScreen: false,
  };
});
