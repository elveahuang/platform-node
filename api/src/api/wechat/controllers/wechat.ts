import { WeChatService } from '@/api/wechat/services/wechat';
import jsSHA from 'jssha';
import isEqual from 'lodash/isEqual';

export default {
    /**
     *
     */
    signature: async (ctx, next) => {
        try {
            console.log(`signature...`);
            strapi.log.debug(`signature...`);
            const client = strapi.service<WeChatService>('api::wechat.wechat').client();
            ctx.body = await client.jssdk.getSignature(ctx.request.query.url);
        } catch (e) {
            ctx.body = e;
        }
    },
    /**
     *
     */
    user: async (ctx, next) => {
        try {
            console.log(`user...`);
            strapi.log.debug(`user...`);
            const client = strapi.service<WeChatService>('api::wechat.wechat').client();
            ctx.body = await client.oauth.getUserInfo(ctx.request.query.code);
        } catch (e) {
            ctx.body = e;
        }
    },
    /**
     *
     */
    callback: async (ctx, next) => {
        try {
            console.log(`callback...`);
            console.log(ctx.request.query);
            strapi.log.debug(`callback...`);
            const echostr = ctx.request.query.echostr;
            const signature = ctx.request.query.signature;

            const arr = [];
            arr[0] = ctx.request.query.nonce;
            arr[1] = ctx.request.query.timestamp;
            arr[2] = strapi.config.api.wx.mp.token;
            arr.sort();
            const sha = new jsSHA('SHA-1', 'TEXT');
            sha.update(arr.join(''));
            const hash = sha.getHash('HEX');
            if (isEqual(hash, signature)) {
                ctx.body = echostr;
            } else {
                ctx.body = false;
            }
        } catch (err) {
            ctx.body = false;
        }
    },
};
