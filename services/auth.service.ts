import VerificationCode from "#lib/verificationCode/verificationCode.lib";
import hash from "#lib/hash/hash.lib";
import mailer from "#lib/mail/mail.lib";
import RefreshToken from "#lib/refreshToken/refreshToken.lib";
import JWT from "#lib/jwt/jwt.lib"
import { prismaClient } from '#prisma/prisma';
import db from '#db/db'
import userSelector from "#lib/selector/user.selector";

export default class AuthServices {

    static async register(login: string, email: string, password: string, nickname: string) {
    const hashedPassword = await hash.bcrypt.create(password, 10);
    const rawOtp = await VerificationCode.generateVerificationCode(6);
    const hashedOtp = await hash.bcrypt.create(rawOtp, 10);
    const otpExpiresAt = await VerificationCode.getExpiresAtTime();

    const { rawUser } = await prismaClient.$transaction(async (tx) => {
        const rawUser = await db.users.create.createUser(tx, nickname, login, email, hashedPassword);
        await db.verificationCode.upsert.upsert(tx, rawUser, hashedOtp, 'EMAIL_CONFIRMATION', otpExpiresAt);
        return { rawUser: rawUser };
    });

    await mailer.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);

    return { rawUser: rawUser };
}

    static async login(login: string, password: string) {

        const { rawUser, accessToken, rawRefreshToken } = await prismaClient.$transaction(async (tx) => {

            const rawUser = await db.users.get.byLogin(tx, login);
            const isPasswordCorrect = await hash.bcrypt.compare(password, rawUser.passwordHash!);
            if (!isPasswordCorrect) throw new Error("Invalid credentials");
            const rawRefreshToken = RefreshToken.create();
            const hashedRefreshToken = await hash.sha256.create(rawRefreshToken)
            const expiresAt = RefreshToken.getExpiresAtTime();
            const tokenRecord = await db.refreshToken.create.create(tx, hashedRefreshToken, expiresAt, rawUser)
            const userPayload = userSelector.toPublicJSON(rawUser)
            const rawAccessToken = await JWT.create(userPayload!, process.env.JWT_SECRET!);

            return { rawUser, accessToken: rawAccessToken, rawRefreshToken }
        })

        return { rawUser, accessToken, rawRefreshToken }
    }

    static async refresh(incomingRefreshToken: string) {
        const hashedIncomingToken = await hash.sha256.create(incomingRefreshToken);

        const { accessToken, newRawRefreshToken, userPayload } = await prismaClient.$transaction(async (tx) => {
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

            await db.refreshToken.create.create(tx, newHashedRefreshToken, newExpiresAt, rawUser);

            const userPayload = userSelector.toPublicJSON(rawUser);
            const accessToken = await JWT.create(userPayload!, process.env.JWT_SECRET!);

            return { accessToken, newRawRefreshToken, userPayload };
        });

        return { accessToken, newRawRefreshToken, userPayload };
    }
}
