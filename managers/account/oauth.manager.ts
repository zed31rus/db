import BaseManager from "#base/manager.base";
import { User } from "#prisma/prisma";

export default class OauthManager extends BaseManager {
    static async createOauth(user: User, rawOauthData: any) {
        const rawUser = user;
    }
}