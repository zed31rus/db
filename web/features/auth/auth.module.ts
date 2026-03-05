import AuthServices from "#services/auth.service";
import AuthSchemas from "./auth.dto";
import { FastifyInstanceType } from "#web/webServer";
import { ApiError } from "#lib/errors/api.errors";

export default class AuthModules {

    static async init(app: FastifyInstanceType) {


        app.post('/register', {
            schema: {
                body: AuthSchemas.Register.Body,
            }
        }, async (request, reply) => {

            const { login, email, password, nickname } = request.body;

            const { user } = await AuthServices.register(login, email, password, nickname)
            reply.status(201).send({
                user
            })
        })
    

        app.post('/login', {
            schema: {
                body: AuthSchemas.Login.Body
            }
        }, async (request, reply) => {

            const { login, password } = request.body;

            const { user, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires } = await AuthServices.login(login, password)
            reply.setCookie("accessToken", accessToken, {
                sameSite: 'none',
                secure: true,
                httpOnly: false,
                domain: '.zed31rus.ru',
                path: '/',
                expires: accessTokenExpires.atTime
            })
            reply.setCookie("refreshToken", refreshToken, {
                sameSite: 'none',
                secure: true,
                httpOnly: true,
                domain: '.zed31rus.ru',
                path: '/',
                expires: refreshTokenExpires.atTime
            })
            reply.status(200).send({ user })
        })


        app.post('/refresh', 
            async (request, reply) => {

            const { RefreshToken } = request.cookies;
            if (!RefreshToken) throw ApiError.Unauthorized();

            const { user, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires } = await AuthServices.refresh(RefreshToken)

            reply.setCookie("accessToken", accessToken, {
                sameSite: 'none',
                secure: true,
                httpOnly: false,
                domain: '.zed31rus.ru',
                path: '/',
                expires: accessTokenExpires.atTime
            })
            reply.setCookie("refreshToken", refreshToken, {
                sameSite: 'none',
                secure: true,
                httpOnly: true,
                domain: '.zed31rus.ru',
                path: '/',
                expires: refreshTokenExpires.atTime
            })
            reply.status(200).send({ user })
        })


    }
}
