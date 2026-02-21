import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

export default function validate(schema: ZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: 'validation_error',
                    errors: error.issues.map(e => ({path: e.path, message: e.message}))
                });
            }
            next(error);
        }
    }
}