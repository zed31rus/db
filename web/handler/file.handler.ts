import baseHandler from "#web/base/handler.base";
import validatorWrapper from "#web/wrappers/validator.wrapper";
import { ZodObject } from "zod";

export default class FileHandler extends baseHandler {

    public AvatarWithValidForm(schema : ZodObject) { 
        return this.createFactory().createHandlers( this.wrapper.validator.validate('form', schema));
    }
};
