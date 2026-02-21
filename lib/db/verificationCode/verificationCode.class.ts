import GetVerificationCode from "./classes/getVerificationCode";
import DeleteVerificationCode from "./classes/deleteVerificationCode";
import UpsertVerificationCode from "./classes/upsertVerificationCode";

const verificationCode =  {
        get:  GetVerificationCode,
        upsert: UpsertVerificationCode,
        delete: DeleteVerificationCode
    }

export default verificationCode