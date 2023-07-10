import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { isEmpty, toNumber } from 'lodash';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());
    console.log(`command - ${command}. mode - ${mode}.`);
    console.log(env);
    return {
        base: env.VITE_APP_BASE ?? '/',
        server: {
            port: !isEmpty(env.VITE_APP_PORT) ? toNumber(env.VITE_APP_PORT) : 8081,
        },
        build: {
            target: 'ES2015',
            modulePreload: false,
        },
        resolve: {
            alias: {
                '~antd': 'antd',
                '~antd-mobile': 'antd-mobile',
                '~video.js': 'video.js',
                '~icons': 'video.js',
            },
        },
        plugins: [
            react(),
            tsconfigPaths(),
            AutoImport({
                resolvers: [
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
        ],
    };
});
