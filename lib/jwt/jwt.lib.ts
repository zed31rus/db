import { PublicUser } from "#lib/selector/user.selector";
import jsonWebToken from "jsonwebtoken";
import { SignOptions } from 'jsonwebtoken';

export default class JWT {
    static async create(payload: PublicUser, expiresIn: SignOptions['expiresIn'], JWT_SECRET: string) {
        return jsonWebToken.sign(payload, JWT_SECRET, {expiresIn: expiresIn})
    }

    static async verify(token: string, JWT_SECRET: string) {
        return jsonWebToken.verify(token, JWT_SECRET) as PublicUser
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
        return (7 * 24 * 60 * 60 * 1000)
    }
}
