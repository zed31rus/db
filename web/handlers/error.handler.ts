import { PrismaClientKnownRequestError } from "#core/prisma/prisma.js";
import ApiError from "#root/errors/api.errors.js";
import ConfigError from "#root/errors/config.errors.js";
import { PRISMA_ERRORS } from "#root/errors/prisma.errors.js";
import baseHandler from "#web/base/handler.base.js";
import { Context } from "hono";
import { HTTPResponseError } from "hono/types";

export default class ErrorHandler extends baseHandler {
    errorHander(err: Error | HTTPResponseError, c: Context) {
      console.log(err)
      if (err instanceof ApiError) {

        if (err.status == 401) this.manager.session.deleteSession(c)

        return c.json({
          message: err.message,
          errors: err.errors
        }, err.status as any);
      }

      if (err instanceof ConfigError) {
        console.error(err)
        process.exit(1)
      }

      if (err instanceof PrismaClientKnownRequestError) {
        console.log(err.meta)
        const code = err.code as keyof typeof PRISMA_ERRORS;
        const target = (err.meta?.target as string[])?.join(', ');

        return c.json({
          error: PRISMA_ERRORS[code]
        }, 400);
      }
      
      return c.json({ 
        message: "Internal Server Error",
      }, 500);
    }
}