// import {defineConfig, loadEnv, type ConfigEnv} from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default ({mode}: ConfigEnv) => {
//   const env = loadEnv(mode, process.cwd());

//   return defineConfig({
//     plugins: [react()],

//     server: {
//       host: env.VITE_HOST || 'localhost',
//       port: Number(env.VITE_PORT) || 5173,
//     },

//     resolve: {
// alias: {
//   '@': path.resolve(__dirname, 'src'),
//   '@components': path.resolve(__dirname, 'src/components'),
//   '@modules': path.resolve(__dirname, 'src/modules'),
//   '@types': path.resolve(__dirname, 'src/types'),
//   '@constants': path.resolve(__dirname, 'src/constants'),
//   '@utils': path.resolve(__dirname, 'src/utils'),
//   '@hooks': path.resolve(__dirname, 'src/hooks'),
// },
// },
//   });
// };
//
//

import logger from './data/vite/logger';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import {getEnvs, parseBoolean} from './data/utils/env';
import viteAppEnv from './data/vite/plugins/vite-plugin-app-env';
import viteSvg from 'vite-svg-loader';
import {ViteMinifyPlugin as viteMinifyHTML} from 'vite-plugin-minify';
import {fileURLToPath, URL} from 'node:url';
import {patchCssModules} from 'vite-css-modules';
import {defineConfig} from 'vite';
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
      viteAppEnv({appEnv}),
      viteSvg({
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
