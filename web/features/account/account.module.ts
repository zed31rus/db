import '#web/types/fastify.d'
import AccoutService from "#services/account"
import authPreHandler from "#web/hooks/preHandler/auth.preHandler";
import { FastifyInstanceType } from "#web/webServer";
import AccountSchemas from './account.dto'

export default class AccountModules {

    static async init(app: FastifyInstanceType) {

        app.post('/confirmEmail', {
            schema: {
                body: AccountSchemas.confirmEmail.body
            },
            preHandler: authPreHandler.authPreHandler
        }, async (request, reply) => {
            const { submitCode } = request.body;
            const { currentUser } = request;

            const { user } = await AccoutService.emailVerificationConfirm(currentUser, submitCode)
            reply.status(201).send({ user })
        })

    }

}