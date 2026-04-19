import { SessionType } from "#core/managers/auth/session.manager.js";
import BaseWebManager from "#web/base/manager.base.js";
import { Context } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";

export default class SessionWebManager extends BaseWebManager {
    sendSession(c: Context, refresh: SessionType['refresh'], access: SessionType['access']) {

        setCookie(c, 'refreshToken', refresh.token, {
            //domain: '.zed31rus.ru',
            path: '/',
            httpOnly: true,
            //sameSite: 'Lax',
            sameSite: "lax",
            //secure: true,
            secure: false,
            expires: refresh.expires.atTime
        });
        
        setCookie(c, 'accessToken', access.token, {
            //domain: '.zed31rus.ru',
            path: '/',
            httpOnly: false,
            //sameSite: 'Lax',
            sameSite: "lax",
            //secure: true,
            secure: false,
            expires: access.expires.atTime
        });  

    }

    deleteSession(c: Context) {

        deleteCookie(c, 'refreshToken', {
            //domain: '.zed31rus.ru',
            path: '/',
            httpOnly: true,
            //sameSite: 'Lax',
            sameSite: "lax",
            //secure: true,
            secure: false,
        });

        deleteCookie(c, 'accessToken', {
            //domain: '.zed31rus.ru',
            path: '/',
            httpOnly: true,
            //sameSite: 'Lax',
            sameSite: "lax",
            //secure: true,
            secure: false,
        });
        
    }

}