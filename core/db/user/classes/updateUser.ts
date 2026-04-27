import DB from "../../db.js";

export default class UpdateUsers {
    async setAllowLoginFind(client: DB.TransactionClient, user: DB.User, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowLoginFind: allow }
        });
    }
    
    async setAllowEmailFind(client: DB.TransactionClient, user: DB.User, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowEmailFind: allow }
        });
    }

    async setNickname(client: DB.TransactionClient, user: DB.User, nickname: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { nickname }
        });
    }

    async setAvatar(client: DB.TransactionClient, user: DB.User, avatar: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { avatar }
        });
    }

    async setPasswordHash(client: DB.TransactionClient, user: DB.User, passwordHash: string) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { passwordHash }
        });
    }

    async setEmailConfirmed(client: DB.TransactionClient, user: DB.User, confirmed: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { emailConfirmed: confirmed }
        });
    }
}