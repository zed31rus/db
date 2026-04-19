import { Prisma, User } from "#core/prisma/prisma.js";

export default class UpdateUsers {
    async setAllowLoginFind(client: Prisma.TransactionClient, user: User, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowLoginFind: allow }
        });
    }
    
    async setAllowEmailFind(client: Prisma.TransactionClient, user: User, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowEmailFind: allow }
        });
    }

    async setNickname(client: Prisma.TransactionClient, user: User, nickname: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { nickname }
        });
    }

    async setAvatar(client: Prisma.TransactionClient, user: User, avatar: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { avatar }
        });
    }

    async setPasswordHash(client: Prisma.TransactionClient, user: User, passwordHash: string) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { passwordHash }
        });
    }

    async setEmailConfirmed(client: Prisma.TransactionClient, user: User, confirmed: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { emailConfirmed: confirmed }
        });
    }
}