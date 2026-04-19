import { PublicUser } from "#core/lib/selector/user.selector.js";
import baseHandler from "#web/base/handler.base.js";
import { AvatarEnv } from "#web/types/Env.d.js";

export default class FileHandler extends baseHandler {

    public ValidAvatar<T extends AvatarEnv>(params: { user: PublicUser}) { 
        return this.createFactory<T>().createHandlers( this.wrapper.validator.validate('form', this.dto.file.avatarSchema),
        this.middleware.file.withAvatar<T>(params.user));
    }
};
