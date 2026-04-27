import BaseLib from "#core/base/lib.base.js";
import DB from "#core/db/db.js";
import crypto from "node:crypto"

export type RefreshExpires = {
    time: number,
    atTime: Date
}

export default class RefreshToken extends BaseLib {
    create() {
        return crypto.randomBytes(64).toString("hex");
    }

    getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        const expires: RefreshExpires = {
            time,
            atTime
        }
        return expires
    }

    checkExpired(token: DB.RefreshTokenModel) {
        if (new Date() > new Date(token.expiresAt)) {
                return true
            }
        return false
    }
    
    private getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime)
    }

    private getExpiresTime() {
        return (7 * 24 * 60 * 60 * 1000)
    }
}