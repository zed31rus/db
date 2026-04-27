import BaseService from "#core/base/service.base.js";
import { PublicUser } from "#core/lib/selector/user.selector.js";

export default class MeService extends BaseService {

    async get(publicUser: PublicUser) {
        const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser)
        return { user: personalUser }
    }

}