import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
//
import { getApplicationTitle, getApplicationVersion, log } from '@/utils';
import { store } from '@/store';
import { setupApp } from '@/utils/setup';
import App from '@/App';
//
import '@/theme/default.scss';

setupApp().then((): void => {
    createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
    );
    log(`Application ${getApplicationTitle()} - ${getApplicationVersion()} has been started.`);
});
