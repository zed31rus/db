import baseHandler from "#web/base/handler.base";
import zValidatorWrapper from "#web/wrappers/zValidator.wrapper";
import { ZodObject } from "zod";

export default class FileHandler extends baseHandler {

    public AvatarWithValidForm(schema : ZodObject) { 
        return this.factory().createHandlers( zValidatorWrapper('form', schema));
    }
};
