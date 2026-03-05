import { AuthRequest } from "#web/types/user.d";
import { FastifyReply, FastifyRequest } from "fastify";
import { ConfirmEmailFastifyRequest } from "./account";

export default class AccoutControllers {

    static async confirmEmail(request: ConfirmEmailFastifyRequest, reply: FastifyReply) {
        const { submitCode } = request.body as any;
        const { publicUser } = request;
    }

}