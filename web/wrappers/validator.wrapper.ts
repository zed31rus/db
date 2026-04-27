import { zValidator } from "@hono/zod-validator";
import { ValidationTargets } from "hono";
import { ZodObject } from "zod";
import BaseWrapper from "../base/wrapper.base.js";
import { BaseArgs } from "#root/core/base/base.js";

export default class ValidatorWrapper extends BaseWrapper {

  constructor(...baseArgs: BaseArgs) {
    super(...baseArgs)
  }

  validate<
  T extends ZodObject, 
  Target extends keyof ValidationTargets
>(
  target: Target, 
  schema: T
) {
    return zValidator(target, schema, (result, c) => {
      if (!result.success) {
        console.log(result.error); 
        return c.json({
          success: false
        }, 400);
      }
    });
  };
}