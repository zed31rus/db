import { PublicUser } from "#lib/selector/user.selector";

declare module 'fastify' {
    interface FastifyRequest {
        currentUser: PublicUser
    }
}