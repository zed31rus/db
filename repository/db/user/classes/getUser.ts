import { PublicUser } from "#lib/selector/user.selector";
import { Prisma, User } from "#prisma/prisma";

export default class GetUser {
    orThrow = {
        async byPublicUser(client: Prisma.TransactionClient, publicUser: PublicUser) {
            return await client.user.findUniqueOrThrow({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: Prisma.TransactionClient, uuid: User['uuid']) {
            return await client.user.findUniqueOrThrow({ where: { uuid } });
        },
        async byLogin(client: Prisma.TransactionClient, login: User['login']) {
            return await client.user.findUniqueOrThrow({ where: { login } });
        },
        async byEmail(client: Prisma.TransactionClient, email: User['email']) { 
            return await client.user.findUniqueOrThrow({ where: { email } });
        },
        async byNick(client: Prisma.TransactionClient, nickname: User['nickname']) { 
            return await client.user.findFirstOrThrow({ where: { nickname } });
        },
    }

    orNull = {
        async byPublicUser(client: Prisma.TransactionClient, publicUser: PublicUser) {
            return await client.user.findUnique({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: Prisma.TransactionClient, uuid: User['uuid']) {
            return await client.user.findUnique({ where: { uuid } });
        },
        async byLogin(client: Prisma.TransactionClient, login: User['login']) {
            return await client.user.findUnique({ where: { login } });
        },
        async byEmail(client: Prisma.TransactionClient, email: User['email']) { 
            return await client.user.findUnique({ where: { email } });
        },
        async byNick(client: Prisma.TransactionClient, nickname: User['nickname']) { 
            return await client.user.findFirst({ where: { nickname } });
        },
    }

    many = {
        async all(client: Prisma.TransactionClient, ) {
            return await client.user.findMany();
        },
        async page(client: Prisma.TransactionClient, page: number, limit: number) {
            return await client.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            });
        }
    }
}