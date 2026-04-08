import { PublicUser } from "#lib/selector/user.selector";
import baseHandler from "#web/base/handler.base";
import { AvatarEnv } from "#web/types/Env.d";
import { ZodObject } from "zod";

export default class FileHandler extends baseHandler {

    public AvatarWithValidForm<T extends AvatarEnv>(schema : ZodObject, params: { user: PublicUser}) { 
        return this.createFactory<T>().createHandlers( this.wrapper.validator.validate('form', schema), this.middleware.file.withAvatar<T>(params.user));
    }
};
