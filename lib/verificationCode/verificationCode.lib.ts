import BaseLib from "#base/lib.base";
import { randomBytes } from "node:crypto"

export default class VerificationCode extends BaseLib {
    async generateVerificationCode(length: number = 6) {
        return randomBytes(length).toString('hex').slice(0, length).toUpperCase();
    }

    getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        return { time, atTime }
    }

    private getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime)
    }

    private getExpiresTime() {
        return (15 * 60 * 1000)
    }

}