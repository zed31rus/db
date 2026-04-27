import { PublicUser } from "#core/lib/selector/user.selector.js";
import DB from "../../db.js";

export default class GetUser {
    orThrow = {
        async byPublicUser(client: DB.TransactionClient, publicUser: PublicUser) {
            return await client.user.findUniqueOrThrow({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: DB.TransactionClient, uuid: DB.User['uuid']) {
            return await client.user.findUniqueOrThrow({ where: { uuid } });
        },
        async byLogin(client: DB.TransactionClient, login: DB.User['login']) {
            return await client.user.findUniqueOrThrow({ where: { login } });
        },
        async byEmail(client: DB.TransactionClient, email: DB.User['email']) { 
            return await client.user.findUniqueOrThrow({ where: { email } });
        },
        async byNick(client: DB.TransactionClient, nickname: DB.User['nickname']) { 
            return await client.user.findFirstOrThrow({ where: { nickname } });
        },
    }

    orNull = {
        async byPublicUser(client: DB.TransactionClient, publicUser: PublicUser) {
            return await client.user.findUnique({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: DB.TransactionClient, uuid: DB.User['uuid']) {
            return await client.user.findUnique({ where: { uuid } });
        },
        async byLogin(client: DB.TransactionClient, login: DB.User['login']) {
            return await client.user.findUnique({ where: { login } });
        },
        async byEmail(client: DB.TransactionClient, email: DB.User['email']) { 
            return await client.user.findUnique({ where: { email } });
        },
        async byNick(client: DB.TransactionClient, nickname: DB.User['nickname']) { 
            return await client.user.findFirst({ where: { nickname } });
        },
    }

    many = {
        async all(client: DB.TransactionClient, ) {
            return await client.user.findMany();
        },
        async page(client: DB.TransactionClient, page: number, limit: number) {
            return await client.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            });
        }
    }
}