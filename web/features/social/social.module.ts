import SocialService from "#services/social.service";
import authPreHandler from "#web/hooks/preHandler/auth.preHandler";
import { FastifyInstanceType } from "#web/webServer";
import SocialSchemas from "./social.dto";

export default class SocialModules {

    static async init(app: FastifyInstanceType) {

        app.post('/get', {
            schema: {
                body: SocialSchemas.user.get.body
            },
            preHandler: authPreHandler.authPreHandler
        }, async (request, reply) => {
            const { uuid } = request.body;
            const { currentUser } = request;

            const { targetUser } = await SocialService.get(uuid)
            reply.status(201).send({ targetUser })
        })

    }

}