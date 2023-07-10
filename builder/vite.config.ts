import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { isEmpty, toNumber } from 'lodash';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(async ({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());
    console.log(`command - ${command}. mode - ${mode}.`);
    console.log(env);
    return {
        base: env.VITE_APP_BASE ?? '/',
        server: {
            port: !isEmpty(env.VITE_APP_PORT) ? toNumber(env.VITE_APP_PORT) : 8082,
        },
        build: {
            target: 'ES2015',
            modulePreload: true,
        },
        resolve: {
            alias: {
                '~element-plus': 'element-plus',
                '~video.js': 'video.js',
                '~icons': 'video.js',
            },
        },
        plugins: [
            vue(),
            vueJsx(),
            tsconfigPaths(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(),
                    IconsResolver({
                        prefix: 'Icon',
                        extension: 'jsx',
                        enabledCollections: ['mdi'],
                    }),
                ],
                dts: resolve(__dirname, 'src/types/auto-imports.d.ts'),
            }),
            Icons({
                autoInstall: true,
                compiler: 'jsx',
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                    }),
                ],
                dts: resolve(__dirname, 'src/types/components.d.ts'),
            }),
        ],
    };
});
