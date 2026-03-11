import { Prisma, User } from "#prisma/prisma";

export default class CreateUsers {

    static async createUser(client: Prisma.TransactionClient, nickname: User['nickname'], login: User['login'], email: User['email'], passwordHash: User['passwordHash']) {
        return await client.user.create({
            data: {
                login,
                email,
                nickname, 
                passwordHash
            }
        });
    }
}