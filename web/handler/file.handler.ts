import { PublicUser } from "#lib/selector/user.selector";
import baseHandler from "#web/base/handler.base";
import { AvatarEnv } from "#web/types/Env.d";

export default class FileHandler extends baseHandler {

    public ValidAvatar<T extends AvatarEnv>(params: { user: PublicUser}) { 
        return this.createFactory<T>().createHandlers( this.wrapper.validator.validate('form', this.dto.file.avatarSchema),
        this.middleware.file.withAvatar<T>(params.user));
    }
};
