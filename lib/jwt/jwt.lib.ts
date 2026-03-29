import BaseLib from "#base/lib.base";
import { PublicUser } from "#lib/selector/user.selector";
import jsonWebToken from "jsonwebtoken";
import { SignOptions } from 'jsonwebtoken';

export type AccessExpires = {
    time: number,
    atTime: Date
}

export default class JWT extends BaseLib {
    async create(payload: PublicUser, expiresIn: SignOptions['expiresIn'], JWT_SECRET: string) {
        return jsonWebToken.sign(payload, JWT_SECRET, {expiresIn: expiresIn})
    }

    async verify(token: string, JWT_SECRET: string) {
        return jsonWebToken.verify(token, JWT_SECRET) as PublicUser
    }

    getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        const expires: AccessExpires = {
            time,
            atTime
        }
        return expires
    }

    private getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime)
    }

    private getExpiresTime() {
        return (7 * 24 * 60 * 60 * 1000)
    }
}
