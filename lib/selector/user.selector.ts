import { User } from "#prisma/prisma";

export default class userSelector {
    PUBLIC_SELECT = {
        uuid: true,
        nickname: true,
        avatar: true,
        createdAt: true,
    };

    static toPublicJSON(user: User) {
        const {uuid, nickname, avatar, createdAt} = user
        const safeUser = {uuid, nickname, avatar, createdAt}
        return safeUser
    }
}

