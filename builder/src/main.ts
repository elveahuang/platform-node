import { createApp } from 'vue';
import '@/theme/default.scss';
import App from '@/App';
import { setupApp } from '@/utils';

setupApp(createApp(App)).then(() => {
    console.log(`App has been started.`);
});
