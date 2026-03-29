import GetVerificationCode from "./classes/getVerificationCode";
import DeleteVerificationCode from "./classes/deleteVerificationCode";
import UpsertVerificationCode from "./classes/upsertVerificationCode";

export default class verificationCode {
    get = new GetVerificationCode();
    upsert = new UpsertVerificationCode();
    delete = new DeleteVerificationCode();
}