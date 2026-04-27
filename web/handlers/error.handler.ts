import DB from "#root/core/db/db.js";
import ApiErrors, { ApiError } from "#root/errors/api.errors.js";
import ConfigError from "#root/errors/config.errors.js";
import baseHandler from "#web/base/handler.base.js";
import { Context } from "hono";
import { HTTPResponseError } from "hono/types";
import jsonwebtoken from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken;

export default class ErrorHandler extends baseHandler {

    errorHander(err: Error | HTTPResponseError, c: Context) {

      if (err instanceof ApiError) {
        if (err.status == 401) this.manager.session.deleteSession(c)

        return c.json({
          message: err.message,
          errors: err.errors
        }, err.status as any);
      }

      if (err instanceof TokenExpiredError) {
        this.manager.session.deleteSession(c)
        return c.json({ message: "Token expired" }, 401);
      }

      if (err instanceof JsonWebTokenError) {
        return c.json({ message: "Invalid token" }, 401);
      }

      if (err instanceof ConfigError) {
        console.error(err)
        process.exit(1)
      }

      if (err instanceof DB.prisma.PrismaClientKnownRequestError) {
        const code = err.code as keyof typeof this.errors.prisma;

        return c.json({
          error: this.errors.prisma[code].message
        }, this.errors.prisma[code].status as any);
      }

      if (err instanceof DB.prisma.PrismaClientValidationError) {
        return c.json({
          description: 'Bad request'
        }, 400);
      }
      
      console.log(err)
      return c.json({ 
        message: "Internal Server Error",
      }, 500);
    }
}