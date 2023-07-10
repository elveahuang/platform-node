import { AxiosOptions, setupHttp } from '@/utils/http.ts';
import { setupI18n } from '@/i18n';
import { setupRouter } from '@/router';
import routes from '@/router/routes.tsx';
import { env } from '@/utils/env';
import { message } from 'antd';

export const toast = async (content: string): Promise<void> => {
    message.info(content);
};

export const setupApp = async (): Promise<void> => {
    // 设置国际化
    await setupI18n();
    // 设置路由
    await setupRouter({ routes: routes, base: env.router.base, mode: env.router.mode });
    // 设置网络请求
    await setupHttp({ toast } as AxiosOptions);
};
