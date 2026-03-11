import { Prisma, User } from "#prisma/prisma";

export default class UpdateUsers {
    static async setAllowLoginFind(client: Prisma.TransactionClient, user: User, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowLoginFind: allow }
        });
    }
    
    static async setAllowEmailFind(client: Prisma.TransactionClient, user: User, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowEmailFind: allow }
        });
    }

    static async setNickname(client: Prisma.TransactionClient, user: User, nickname: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { nickname }
        });
    }

    static async setAvatar(client: Prisma.TransactionClient, user: User, avatar: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { avatar }
        });
    }

    static async setPasswordHash(client: Prisma.TransactionClient, user: User, passwordHash: string) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { passwordHash }
        });
    }

    static async setEmailConfirmed(client: Prisma.TransactionClient, user: User, confirmed: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { emailConfirmed: confirmed }
        });
    }
}