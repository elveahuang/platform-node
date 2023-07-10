import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { isEmpty, toNumber } from 'lodash';

export default defineConfig(async ({ command, mode }) => {
    const env = loadEnv(mode, process.cwd());
    console.log(`Vite for site. command - ${command}. mode - ${mode}.`);
    console.log(`command - ${command}. mode - ${mode}.`);
    console.log(env);
    return {
        base: !isEmpty(env.VITE_APP_BASE) ? env.VITE_APP_BASE : '/',
        resolve: {
            alias: {
                '~element-plus': 'element-plus',
            },
        },
        plugins: [tsconfigPaths()],
        server: {
            host: !isEmpty(env.VITE_HOST) ? env.VITE_HOST : '0.0.0.0',
            port: !isEmpty(env.VITE_PORT) ? toNumber(env.VITE_PORT) : 8084,
        },
        build: {
            target: 'ES2015',
        },
    };
});
