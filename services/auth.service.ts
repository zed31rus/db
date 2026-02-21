import VerificationCode from "#lib/verificationCode/verificationCode.lib";
import hash from "#lib/hash/hash.lib";
import mailer from "#lib/mail/mail.lib";
import RefreshToken from "#lib/refreshToken/refreshToken.lib";
import JWT from "#lib/jwt/jwt.lib"
import { prismaClient, User } from '#prisma/prisma';
import db from '#db/db'
import userSelector from "#lib/selector/user.selector";

export default class AuthServices {

    static async register(login: string, email: string, password: string, nickname: string) {

        const { hashedPassword, rawUser, rawOtp, hashedOtp, expiresAt, verificationRecord } = await prismaClient.$transaction(async (tx) => {

            const hashedPassword = await hash.bcrypt.create(password, 10);
            const rawUser = await db.users.create.createUser(tx, nickname, login, email, hashedPassword);
            const rawOtp = await VerificationCode.generateVerificationCode(6);
            const hashedOtp = await hash.bcrypt.create(rawOtp, 10);
            const expiresAt = await VerificationCode.getExpiresAtTime();
            const verificationRecord = await db.verificationCode.upsert.upsert(tx, rawUser, hashedOtp, 'EMAIL_CONFIRMATION', expiresAt);

            return { hashedPassword, rawUser, rawOtp, hashedOtp, expiresAt, verificationRecord }
        });

        const mail = await mailer.sendMail(email, 'Код подтверждения', `Ваш код подтверждения: ${rawOtp}`, `<p>Ваш код подтверждения: ${rawOtp}</p>`);
        return { hashedPassword, rawUser, rawOtp, hashedOtp, expiresAt, verificationRecord, mail };
    }

    static async login(login: string, password: string) {

        const { rawUser, isPasswordCorrect, tokenRecord, userPayload, accessToken, rawRefreshToken } = await prismaClient.$transaction(async (tx) => {

            const rawUser = await db.users.get.byLogin(tx, login);
            const isPasswordCorrect = await hash.bcrypt.compare(password, rawUser.passwordHash!);
            if (!isPasswordCorrect) throw new Error("Invalid credentials");
            const rawRefreshToken = RefreshToken.create();
            const hashedRefreshToken = await hash.sha256.create(rawRefreshToken)
            const expiresAt = RefreshToken.getExpiresAtTime();
            const tokenRecord = await db.refreshToken.create.createRefreshToken(tx, hashedRefreshToken, expiresAt, rawUser)
            const userPayload = userSelector.toPublicJSON(rawUser)
            const accessToken = await JWT.create(userPayload!, process.env.JWT_SECRET!);

            return { rawUser, isPasswordCorrect, tokenRecord, userPayload, accessToken, rawRefreshToken }
        })

        return { rawUser, isPasswordCorrect, tokenRecord, userPayload, accessToken, rawRefreshToken }
    }

    static async confirmEmail(rawUser: User, submittedCode: string) {
        const { verificationRecord, isCodeValid } = await prismaClient.$transaction(async (tx) => {
            const verificationRecord = await db.verificationCode.get.get(tx, rawUser!, 'EMAIL_CONFIRMATION');
            const isCodeValid = await hash.bcrypt.compare(submittedCode, verificationRecord?.hashedCode!);
            if (!isCodeValid) throw new Error("Login or password does not exist");
            await db.verificationCode.delete.delete(tx, verificationRecord!)
            await db.users.update.setEmailConfirmed(tx, rawUser, true)
            return { rawUser, verificationRecord, isCodeValid }
        })

        const mail = await mailer.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');
        return { rawUser, verificationRecord, isCodeValid }
    }

    static async refresh(incomingToken: string) {
        const hashedIncomingToken = await hash.sha256.create(incomingToken);

        const result = await prismaClient.$transaction(async (tx) => {
            const tokenRecord = await db.refreshToken.get.byHashedToken(tx, hashedIncomingToken);

            if (new Date() > new Date(tokenRecord.expiresAt)) {
                await db.refreshToken.delete.delete(tx, tokenRecord);
                throw new Error("Refresh token expired");
            }

            const rawUser = tokenRecord.user;

            await db.refreshToken.delete.delete(tx, tokenRecord);

            const newRawRefreshToken = RefreshToken.create();
            const newHashedRefreshToken = await hash.sha256.create(newRawRefreshToken);
            const newExpiresAt = RefreshToken.getExpiresAtTime();

            await db.refreshToken.create.createRefreshToken(tx, newHashedRefreshToken, newExpiresAt, rawUser);

            const userPayload = userSelector.toPublicJSON(rawUser);
            const accessToken = await JWT.create(userPayload!, process.env.JWT_SECRET!);

            return { accessToken, newRawRefreshToken, userPayload };
        });

        return result;
    }
}
