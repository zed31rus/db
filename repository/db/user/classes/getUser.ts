import { PublicUser } from "#lib/selector/user.selector";
import { Prisma, User } from "#prisma/prisma";

export default class GetUser {
    static async byPublicUser(client: Prisma.TransactionClient, publicUser: PublicUser) {
        return await client.user.findUniqueOrThrow({ where: { uuid: publicUser.uuid } });
    }
    static async byUuid(client: Prisma.TransactionClient, uuid: User['uuid']) {
        return await client.user.findUniqueOrThrow({ where: { uuid } });
    }
    static async byLogin(client: Prisma.TransactionClient, login: User['login']) {
        return await client.user.findUniqueOrThrow({ where: { login } });
    }
    static async byEmail(client: Prisma.TransactionClient, email: User['email']) { 
        return await client.user.findUniqueOrThrow({ where: { email } });
    }
    static async byNick(client: Prisma.TransactionClient, nickname: User['nickname']) { 
        return await client.user.findFirstOrThrow({ where: { nickname } });
    }
    static async all(client: Prisma.TransactionClient, ) {
        return await client.user.findMany();
    } 
    static async page(client: Prisma.TransactionClient, page: number, limit: number) {
        return await client.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
    }
}