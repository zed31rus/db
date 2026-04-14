import baseHandler from "#web/base/handler.base";
import { UserEnv } from "#web/types/Env.d";

export default class AuthHandler extends baseHandler {
    public withValidUser<T extends UserEnv>() {
        return this.createFactory<T>().createHandlers( this.wrapper.validator.validate('cookie', this.dto.cookie.both),
        this.middleware.auth.withUser<T>())
    }
}