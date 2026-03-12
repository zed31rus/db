import ApiError from "#lib/errors/api.errors";
import { Prisma } from "#prisma/prisma";
import { FastifyInstanceType } from "#web/webServer";
import { FastifyError } from "fastify";

export default class ErrorHandlers {
    static async init(fastifyInstance: FastifyInstanceType) {
        fastifyInstance.setErrorHandler((error: FastifyError, request, reply) => {
            if (error.code == 'P2025') {
                console.log(error)
                reply.status(404).send('Not found');
            }

            if (error.code == "401") {
                console.log(error)
                reply.status(401).send("Unauthorized")
            }

            if (error.code == "400") {
                console.log(error)
                reply.status(400).send(error.message)
            }
        })
    }
}