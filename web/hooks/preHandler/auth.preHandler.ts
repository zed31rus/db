import { ApiError } from "#lib/errors/api.errors";
import jwt from "#lib/jwt/jwt.lib";
import { FastifyReply, FastifyRequest } from "fastify";

export default class {
    static async authPreHandler(request: FastifyRequest, reply: FastifyReply) {
        const { accessToken, refreshToken } = request.cookies;
        if (!accessToken) throw ApiError.Unauthorized();
        if (!refreshToken) throw ApiError.Unauthorized();

        const userPayload = await jwt.verify(accessToken, process.env.JWT_SECRET!)

        request.currentUser = userPayload;
    }
}