import AuthServices from "#services/auth";
import AuthSchemas from "./auth.dto.ts";
import fastifyInstance from "#web/webServer";
import ApiError from "#lib/errors/api.errors";

async function initAuthModule(root?: string ) {
    fastifyInstance.post(`${root}/register`, {
        schema: {
            body: AuthSchemas.Register.Body,
        }
    }, async (request, reply) => {

        const { login, email, password, nickname } = request.body;

        const { user } = await AuthServices.register(login, email, password, nickname)
        reply.status(201).send({ user })
    })

    fastifyInstance.post(`${root}/login`, {
        schema: {
            body: AuthSchemas.Login.Body
        }
    }, async (request, reply) => {

        const { login, password } = request.body;

        const { user, access, refresh } = await AuthServices.login(login, password)

        reply.status(200).send({ user });
    })

    fastifyInstance.post(`${root}/refresh`, 
        async (request, reply) => {

        const { RefreshToken } = request.cookies;
        if (!RefreshToken) throw ApiError.Unauthorized();

        const { user, access, refresh } = await AuthServices.refresh(RefreshToken)



        reply.status(200).send({ user })
    })

}
