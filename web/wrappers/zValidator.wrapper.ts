import { zValidator } from "@hono/zod-validator";
import { ValidationTargets } from "hono";
import { ZodObject } from "zod";

const zValidatorWrapper = <
  T extends ZodObject, 
  Target extends keyof ValidationTargets
>(
  target: Target, 
  schema: T
) => {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      console.log(result.error); 
      return c.json({
        success: false
      }, 400);
    }
  });
};

export default zValidatorWrapper;