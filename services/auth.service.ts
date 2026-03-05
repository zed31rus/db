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
    const otpExpires = VerificationCode.getExpires();
    const { rawUser } = await prismaClient.$transaction(async (tx) => {
        const rawUser = await db.users.create.createUser(tx, nickname, login, email, hashedPassword);
        await db.verificationCode.upsert.upsert(tx, rawUser, hashedOtp, 'EMAIL_CONFIRMATION', otpExpires.atTime);
        return { rawUser: rawUser };
    });
    const publicUser = userSelector.toPublicJSON(rawUser)

    await mailer.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);

    return { publicUser: publicUser };
}

    static async login(login: string, password: string) {

        const { rawUser, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires } = await prismaClient.$transaction(async (tx) => {

            const rawUser = await db.users.get.byLogin(tx, login);
            const isPasswordCorrect = await hash.bcrypt.compare(password, rawUser.passwordHash!);
            if (!isPasswordCorrect) throw new Error("Invalid credentials");
            const refreshTokenExpires = RefreshToken.getExpires();
            const refreshToken = RefreshToken.create();
            const hashedRefreshToken = await hash.sha256.create(refreshToken)
            const tokenRecord = await db.refreshToken.create.create(tx, hashedRefreshToken, refreshTokenExpires.atTime, rawUser)
            const userPayload = userSelector.toPublicJSON(rawUser)
            const accessTokenExpires = JWT.getExpires();
            const accessToken = await JWT.create(userPayload, accessTokenExpires.time, process.env.JWT_SECRET!);

            return { rawUser, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires }
        })
        const publicUser = userSelector.toPublicJSON(rawUser)

        return { publicUser: publicUser, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires }
    }

    static async refresh(incomingRefreshToken: string) {
        const hashedIncomingToken = await hash.sha256.create(incomingRefreshToken);

        const { rawUser, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires } = await prismaClient.$transaction(async (tx) => {
            const IncomingTokenRecord = await db.refreshToken.get.byHashedToken(tx, hashedIncomingToken);

            if (new Date() > new Date(IncomingTokenRecord.expiresAt)) {
                await db.refreshToken.delete.delete(tx, IncomingTokenRecord);
                throw new Error("Refresh token expired");
            }

            const rawUser = IncomingTokenRecord.user;

            await db.refreshToken.delete.delete(tx, IncomingTokenRecord);

            const refreshTokenExpires = RefreshToken.getExpires();
            const refreshToken = RefreshToken.create();
            const hashedRefreshToken = await hash.sha256.create(refreshToken);

            await db.refreshToken.create.create(tx, hashedRefreshToken, refreshTokenExpires.atTime, rawUser);

            const accessTokenExpires = JWT.getExpires();
            const userPayload = userSelector.toPublicJSON(rawUser);
            const accessToken = await JWT.create(userPayload, accessTokenExpires.time, process.env.JWT_SECRET!);

            return { rawUser, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires };
        });
        const publicUser = userSelector.toPublicJSON(rawUser);

        return { publicUser: publicUser, accessToken, accessTokenExpires, refreshToken, refreshTokenExpires };
    }
}
