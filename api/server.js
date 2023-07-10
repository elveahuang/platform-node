const strapi = require('@strapi/strapi');
const app = strapi({ distDir: 'dist' });
app.start().then(() => {
    console.log('Application has been started.');
});
