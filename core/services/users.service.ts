import BaseService from "#core/base/service.base.js";
import { PersonalUser, PublicUser } from "#core/lib/selector/user.selector.js";

export default class UsersService extends BaseService {
    
    async getByUuid(uuid: PublicUser['uuid']) {
        const rawUser = await this.db.users.get.orThrow.byUuid(this.db.client, uuid);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser)
        return { user: publicUser }
    }

    async getByEmail(email: PersonalUser['email']) {
        const rawUser = await this.db.users.get.orThrow.byEmail(this.db.client, email);
        if (!rawUser.allowEmailFind ) {
            throw this.errors.api.NotFound();
        }
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);
        return { user: publicUser }
    }

    async getByLogin(login: PersonalUser['login']) {
        const rawUser = await this.db.users.get.orThrow.byLogin(this.db.client, login);
        if (!rawUser.allowLoginFind ) {
            throw this.errors.api.NotFound();
        }
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        return { user: publicUser}
    }

    async getByNickname(nickname: PublicUser['nickname'] ) {
        const rawUser = await this.db.users.get.orThrow.byNick(this.db.client, nickname);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);
        return { user: publicUser }
    }

}