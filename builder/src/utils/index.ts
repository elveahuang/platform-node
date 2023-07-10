import { App } from 'vue';
import { ElConfigProvider } from 'element-plus';
import { router, setupRouter } from '@/router';

export const setupApp = async (app: App) => {
    // 设置应用专有配置和组件
    await app.use(ElConfigProvider);
    //
    await setupRouter(app, { base: '/' });
    //
    router.isReady().then(() => {
        app.mount('#app');
    });
};
