import { Prisma } from '#prisma/prisma';
import crypto from 'crypto';

export type RefreshExpires = {
    time: number,
    atTime: Date
}

export default class RefreshToken {
    static create() {
        return crypto.randomBytes(64).toString("hex");
    }

    static getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        const expires: RefreshExpires = {
            time,
            atTime
        }
        return expires
    }

    static checkExpired(refreshToken: Prisma.RefreshTokenModel) {
        if (new Date() > new Date(refreshToken.expiresAt)) {
                return true
            }
        return false
    }
    
    private static getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime)
    }

    private static getExpiresTime() {
        return (7 * 24 * 60 * 60 * 1000)
    }
}