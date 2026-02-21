import { ApiError } from "#lib/errors/api.errors";
import { NextFunction, Request, Response } from "express";

export default function errorMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }

    return res.status(500).json({ message: "Internal server error"})
}