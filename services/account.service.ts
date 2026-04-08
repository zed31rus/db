import { prismaClient } from "#prisma/prisma";
import { PublicUser } from "#lib/selector/user.selector";
import BaseService from "#base/service.base";
import { OtpTypes } from "#types/account.js";

export default class AccountService extends BaseService {

    async emailVerificationSend(user: PublicUser) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: publicUser };

        await this.manager.otp.createOtp(prismaClient, rawUser, OtpTypes.EmailConfirm);

        return { user: publicUser };
    }

    async emailVerificationConfirm(user: PublicUser, submitCode: string) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: publicUser };

        const { newRawUser, success } = await prismaClient.$transaction(async (tx) => {
            const { success } = await this.manager.otp.confirmOtp(tx, rawUser, submitCode, OtpTypes.EmailConfirm);
            const newRawUser = await this.repository.db.users.update.setEmailConfirmed(tx, rawUser, true)
            return { newRawUser, success };
        });
        success ?? this.lib.mail.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');

        const newPublicUser = this.lib.userSelector.toPublicJSON(newRawUser);

        return { user: newPublicUser };
    }

    async changePasswordRequest(user: PublicUser) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user)
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        await this.manager.otp.createOtp(prismaClient, rawUser, OtpTypes.passwordChange);

        return { user: publicUser };
    }

    async changePasswordConfirm(user: PublicUser, password: string, submitCode: string) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user);
        const hashedPassword = await this.lib.hash.bcrypt.create(password, 10);

        const { newRawUser, success } = await prismaClient.$transaction(async (tx) => {
            const { success } = await this.manager.otp.confirmOtp(tx, rawUser, submitCode, OtpTypes.passwordChange);
            const newRawUser = await this.repository.db.users.update.setPasswordHash(tx, rawUser, hashedPassword);
            return { newRawUser, success };
        })
        success ?? this.lib.mail.sendMail(rawUser.email, 'Ваш пароль успешно изменён', 'Ваш пароль успешно изменён', '<p>Ваш пароль успешно изменён</p>');

        const newPublicUser = this.lib.userSelector.toPublicJSON(newRawUser);

        return { user: newPublicUser };
    }

}