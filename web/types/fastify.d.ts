import { PublicUser } from "#lib/selector/user.selector";

declare module 'fastify' {
    interface FastifyRequest {
        currentUser: PublicUser
    }
}

export type sessionType = {
    access: {
        token: string,
        expires: {
            time: number,
            atTime: Date
        }
    },
    refresh: {
        token: string,
        expires: {
            time: number,
            atTime: Date
        }
    }
}