import { prismaClient, User } from "#prisma/prisma";
import Hash from "#lib/hash/hash.lib";
import db from "#repo/db/db";
import mailer from "#lib/mail/mail.lib";
import VerificationCode from "#lib/verificationCode/verificationCode.lib";
import UserSelector from "#lib/selector/user.selector";

export default class OauthManager {
    static async createOauth(user: User, rawOauthData: any) {
        const rawUser = user;
    }
}