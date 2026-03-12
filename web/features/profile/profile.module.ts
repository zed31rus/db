import ProfileServices from "#services/profile";
import authPreHandler from "#web/hooks/preHandler/auth.preHandler";
import { FastifyInstanceType } from "#web/webServer";

export default class ProfileModules {

    static async init(app: FastifyInstanceType, root: string | null) {

        app.post(`${root}/get`, {
            preHandler: authPreHandler.authPreHandler
        }, async (request, reply) => {
            const { currentUser } = request;

            const { user } = await ProfileServices.get(currentUser)
            reply.status(201).send({ user })
        })

    }

}