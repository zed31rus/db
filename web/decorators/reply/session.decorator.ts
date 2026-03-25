import { sessionType } from "#web/types/fastify.d";
import fastifyInstance from "#web/webServer";

fastifyInstance.decorateReply('sendSession', function (refresh: sessionType['refresh'], access: sessionType['access']) {
    this.setCookie("accessToken", access.token, {
        sameSite: 'lax',
        secure: true,
        httpOnly: false,
        domain: '.zed31rus.ru',
        path: '/',
        expires: access.expires.atTime
    });

    this.setCookie("refreshToken", refresh.token, {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
        domain: '.zed31rus.ru',
        path: '/',
        expires: refresh.expires.atTime
    });
});

fastifyInstance.decorateReply('clearSession', function () {
    this.clearCookie("accessToken", {
        sameSite: 'lax',
        secure: true,
        httpOnly: false,
        domain: '.zed31rus.ru',
        path: '/'
    });

    this.clearCookie("refreshToken", {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
        domain: '.zed31rus.ru',
        path: '/'
    });
});