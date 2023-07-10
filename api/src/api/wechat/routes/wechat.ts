export default {
    routes: [
        {
            method: 'GET',
            path: '/wechat/callback',
            handler: 'wechat.callback',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/wechat/user',
            handler: 'wechat.user',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'GET',
            path: '/wechat/signature',
            handler: 'wechat.signature',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
