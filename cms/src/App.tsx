import React, { Suspense, useState } from 'react';
import { AppIntlProvider } from '@/i18n';
import { AntdConfigProvider } from '@/utils/antd';
import { AppHelmetProvider } from '@/utils/helmet';
import { AppSwrConfigProvider } from '@/utils/swr';
import { AppRouterProvider } from '@/router';
import { Loading } from '@/components';
import { useRootDispatch, useUserSelector } from '@/store';
import { useMount } from 'ahooks';
import { log } from '@/utils';
import { getUserInfoAsync, initializeAsync } from '@/store/actions.ts';

function App() {
    const [loading, setLoading] = useState(true);
    const { accessToken } = useUserSelector();
    const dispatch = useRootDispatch();

    useMount(async () => {
        log(`Component App for admin mount.`);
        await dispatch(await initializeAsync());
        await dispatch(await getUserInfoAsync(accessToken));
        setLoading(false);
    });

    return loading ? (
        <Loading />
    ) : (
        <AppIntlProvider>
            <AppHelmetProvider>
                <AppSwrConfigProvider>
                    <AntdConfigProvider>
                        <Suspense fallback={<Loading />}>
                            <AppRouterProvider />
                        </Suspense>
                    </AntdConfigProvider>
                </AppSwrConfigProvider>
            </AppHelmetProvider>
        </AppIntlProvider>
    );
}

export default App;
