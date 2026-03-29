import { SessionType } from "#managers/auth/session.manager";
import { Context } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";

export default class SessionManager {
    static sendSession(c: Context, refresh: SessionType['refresh'], access: SessionType['access']) {

        setCookie(c, 'refreshToken', refresh.token, {
            domain: '.zed31rus.ru',
            path: '/',
            httpOnly: true,
            sameSite: 'Lax',
            secure: true,
            expires: refresh.expires.atTime
        });
        
        setCookie(c, 'accessToken', access.token, {
            domain: '.zed31rus.ru',
            path: '/',
            httpOnly: false,
            sameSite: 'Lax',
            secure: true,
            expires: access.expires.atTime
        });  

    }

    static deleteSession(c: Context) {

        deleteCookie(c, 'refreshToken', {
            domain: '.zed31rus.ru',
            path: '/',
            httpOnly: true,
            sameSite: 'Lax',
            secure: true,
        });

        deleteCookie(c, 'accessToken', {
            domain: '.zed31rus.ru',
            path: '/',
            httpOnly: true,
            sameSite: 'Lax',
            secure: true,
        });
        
    }

}