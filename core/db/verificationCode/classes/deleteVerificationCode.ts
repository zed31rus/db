import DB from "../../db.js";

export default class DeleteVerificationCode {
    async delete(client: DB.TransactionClient, code: DB.VerificationCode) {
        return await client.verificationCode.delete({
            where: {userUuid_type: {userUuid: code.userUuid, type: code.type}}
        })
    }
}