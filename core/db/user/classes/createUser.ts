import DB from "../../db.js";

export default class CreateUsers {

    async createUser(client: DB.TransactionClient,
        nickname: DB.User['nickname'],
        login: DB.User['login'],
        email: DB.User['email'],
        passwordHash: DB.User['passwordHash'],
        emailConfirmed: DB.User['emailConfirmed']
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