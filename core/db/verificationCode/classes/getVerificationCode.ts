import DB from "../../db.js";

export default class GetVerificationCode {
    orThrow = {
        async get(client: DB.TransactionClient, user: DB.User, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: {userUuid: user.uuid, type: type}},
                include: { user: true }
            });
        }
    }
    orNull = {
        async get(client: DB.TransactionClient, user: DB.User, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: {userUuid: user.uuid, type: type}},
                include: { user: true }
            });
        }
    }
}