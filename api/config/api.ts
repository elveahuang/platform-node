export default ({ env }) => ({
    /**
     *
     */
    rest: {
        defaultLimit: 25,
        maxLimit: 100,
        withCount: true,
    },
    /**
     * 微信公众号
     */
    wx: {
        mp: {
            enabled: env.bool('WX_MP_ENABLED', true),
            appId: env('WX_MP_APP_ID', ''),
            appSecret: env('WX_MP_APP_SECRET', ''),
            callback: env('WX_MP_CALLBACK', ''),
            token: env('WX_MP_TOKEN', ''),
            aesKey: env('WX_MP_ENCODING_AES_KEY', ''),
        },
        ma: {
            enabled: env.bool('WX_MA_ENABLED', true),
            appId: env('WX_MA_APP_ID', ''),
            appSecret: env('WX_MA_APP_SECRET', ''),
        },
    },
});
