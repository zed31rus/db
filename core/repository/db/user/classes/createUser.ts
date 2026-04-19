import { Prisma, User } from "#core/prisma/prisma.js";

export default class CreateUsers {

    async createUser(client: Prisma.TransactionClient,
        nickname: User['nickname'],
        login: User['login'],
        email: User['email'],
        passwordHash: User['passwordHash'],
        emailConfirmed: User['emailConfirmed']
    ) {
        return await client.user.create({
            data: {
                login,
                email,
                nickname, 
                passwordHash,
                emailConfirmed
            }
        });
    }
}