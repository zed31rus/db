import { prismaClient } from "#prisma/prisma";
import { PublicUser } from "#lib/selector/user.selector";
import BaseService from "#base/service.base";
import { OtpTypes } from "#types/account.js";

export default class AccountService extends BaseService {

    async emailVerificationSend(user: PublicUser) {
        const rawUser = await this.repository.db.users.get.orThrow.byPublicUser(prismaClient, user);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: personalUser };

        const rawOtp = await this.manager.otp.createOtp(prismaClient, rawUser, OtpTypes.EmailConfirm);

        if (rawOtp) this.lib.mail.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);

        return { user: personalUser };
    }

    async emailVerificationConfirm(user: PublicUser, submitCode: string) {
        const rawUser = await this.repository.db.users.get.orThrow.byPublicUser(prismaClient, user);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: personalUser };

        const { newRawUser, success } = await prismaClient.$transaction(async (tx) => {
            const { success } = await this.manager.otp.confirmOtp(tx, rawUser, submitCode, OtpTypes.EmailConfirm);
            const newRawUser = await this.repository.db.users.update.setEmailConfirmed(tx, rawUser, true)
            return { newRawUser, success };
        });

        if (success) this.lib.mail.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');

        const newPersonalUser = this.lib.userSelector.toPersonalJSON(newRawUser);

        return { user: newPersonalUser };
    }

    async changePasswordRequest(user: PublicUser) {
        const rawUser = await this.repository.db.users.get.orThrow.byPublicUser(prismaClient, user)
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);

        const rawOtp = await this.manager.otp.createOtp(prismaClient, rawUser, OtpTypes.passwordChange);

        if (rawOtp) this.lib.mail.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);

        return { user: personalUser };
    }

    async changePasswordConfirm(user: PublicUser, password: string, submitCode: string) {
        const rawUser = await this.repository.db.users.get.orThrow.byPublicUser(prismaClient, user);
        const hashedPassword = await this.lib.hash.bcrypt.create(password, 10);

        const { newRawUser, success } = await prismaClient.$transaction(async (tx) => {
            const { success } = await this.manager.otp.confirmOtp(tx, rawUser, submitCode, OtpTypes.passwordChange);
            const newRawUser = await this.repository.db.users.update.setPasswordHash(tx, rawUser, hashedPassword);
            return { newRawUser, success };
        })
        if (success) this.lib.mail.sendMail(rawUser.email, 'Ваш пароль успешно изменён', 'Ваш пароль успешно изменён', '<p>Ваш пароль успешно изменён</p>');

        const newPersonalUser = this.lib.userSelector.toPersonalJSON(newRawUser);

        return { user: newPersonalUser };
    }

}