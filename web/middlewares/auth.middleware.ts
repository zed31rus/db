import { ApiError } from "#lib/errors/api.errors";
import jwt from "#lib/jwt/jwt.lib";
import { NextFunction, Request, Response } from "express";

export default async function auth(req: Request, res: Response, next: NextFunction) {
    const {accessToken, refreshToken} = req.cookies;

    if (!accessToken) {
        throw ApiError.Unauthorized('Unauthorized')
    }

    const payload = await jwt.verify(accessToken, process.env.JWT_SECRET!)

    req.publicUser = payload;
    next();
}