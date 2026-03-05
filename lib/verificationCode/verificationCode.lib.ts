import { randomBytes } from "node:crypto"

class VerificationCode {
    static async generateVerificationCode(length: number = 6) {
        return randomBytes(length).toString('hex').slice(0, length).toUpperCase();
    }

    static getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        return { time, atTime }
    }

    private static getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime)
    }

    private static getExpiresTime() {
        return (15 * 60 * 1000)
    }

}

const verificationCode = VerificationCode;

export default verificationCode;