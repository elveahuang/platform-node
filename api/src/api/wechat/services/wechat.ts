import { Wechat, Store } from 'wechat-jssdk';

export type WeChatConfig = {
    mp: { appId: string; appSecret: string };
    ma: { appId: string; appSecret: string };
};

export type WeChatService = {
    client(): Wechat;
    config(): WeChatConfig;
};

export const store = new Store();

export default (): WeChatService => ({
    client(): Wechat {
        return new Wechat({
            wechatRedirectUrl: '',
            wechatToken: strapi.config.api.wx.mp.token,
            appId: strapi.config.api.wx.mp.appId,
            appSecret: strapi.config.api.wx.mp.appSecret,
            card: false,
            payment: false,
            merchantId: '',
            paymentSandBox: false,
            paymentKey: '',
            paymentCertificatePfx: false,
            paymentNotifyUrl: '',
            miniProgram: {
                appId: strapi.config.api.wx.ma.appId,
                appSecret: strapi.config.api.wx.ma.appSecret,
            },
            store: store,
        });
    },
    config(): WeChatConfig {
        return {
            mp: {
                appId: strapi.config.api.wx.mp.appId,
                appSecret: strapi.config.api.wx.mp.appSecret,
            },
            ma: {
                appId: strapi.config.api.wx.ma.appId,
                appSecret: strapi.config.api.wx.ma.appSecret,
            },
        };
    },
});
