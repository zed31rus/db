import { User } from "#prisma/prisma";
import jsonWebToken from "jsonwebtoken";
import { SignOptions } from 'jsonwebtoken';

class JWT {
    static async create(payload: Object, JWT_SECRET: string, expiresIn: SignOptions['expiresIn'] = this.getExpiresTime()) {
        return jsonWebToken.sign(payload, JWT_SECRET, {expiresIn: expiresIn})
    }

    static async verify(token: string, JWT_SECRET: string) {
        return jsonWebToken.verify(token, JWT_SECRET)
    }

    static getExpiresAtTime(expiresTime: number = this.getExpiresTime()) {
        return new Date(Date.now() + expiresTime)
    }

    static getExpiresTime() {
        return (7 * 24 * 60 * 60 * 1000)
    }
}

const jwt = JWT;

export default jwt