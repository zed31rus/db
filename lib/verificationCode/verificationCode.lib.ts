import { randomBytes } from "node:crypto"

class VerificationCode {
    static async generateVerificationCode(length: number = 6) {
        return randomBytes(length).toString('hex').slice(0, length).toUpperCase();
    }
    static async getExpiresAtTime() {
        return new Date(Date.now() + (15 * 60 * 1000))
    }
}

const verificationCode = VerificationCode;

export default verificationCode;