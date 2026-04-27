import BaseService from "#core/base/service.base.js";
import { PublicUser } from "#core/lib/selector/user.selector.js";
import { OtpTypes } from "#core/types/account.js";

export default class AccountService extends BaseService {

    async emailVerificationSend(user: PublicUser) {
        const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: personalUser };

        const rawOtp = await this.manager.otp.createOtp(this.db.client, rawUser, OtpTypes.EmailConfirm);

        if (rawOtp) this.lib.mail.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);

        return { user: personalUser };
    }

    async emailVerificationConfirm(user: PublicUser, submitCode: string) {
        const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user);
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: personalUser };

        const { newRawUser, success } = await this.db.client.$transaction(async (tx) => {
            const { success } = await this.manager.otp.confirmOtp(tx, rawUser, submitCode, OtpTypes.EmailConfirm);
            const newRawUser = await this.db.users.update.setEmailConfirmed(tx, rawUser, true)
            return { newRawUser, success };
        });

        if (success) this.lib.mail.sendMail(rawUser.email, 'Ваш адрес электронной почты подтверждён', 'Ваш адрес электронной почты подтверждён', '<p>Ваш адрес электронной почты подтверждён</p>');

        const newPersonalUser = this.lib.userSelector.toPersonalJSON(newRawUser);

        return { user: newPersonalUser };
    }

    async changePasswordRequest(user: PublicUser) {
        const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user)
        const personalUser = this.lib.userSelector.toPersonalJSON(rawUser);

        const rawOtp = await this.manager.otp.createOtp(this.db.client, rawUser, OtpTypes.passwordChange);

        if (rawOtp) this.lib.mail.sendMail(rawUser.email, 'Код подтверждения', `<p>Ваш код подтверждения: ${rawOtp}</p>`, `Ваш код подтверждения: ${rawOtp}`);

        return { user: personalUser };
    }

    async changePasswordConfirm(user: PublicUser, password: string, submitCode: string) {
        const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user);
        const hashedPassword = await this.lib.hash.bcrypt.create(password, 10);

        const { newRawUser, success } = await this.db.client.$transaction(async (tx) => {
            const { success } = await this.manager.otp.confirmOtp(tx, rawUser, submitCode, OtpTypes.passwordChange);
            const newRawUser = await this.db.users.update.setPasswordHash(tx, rawUser, hashedPassword);
            return { newRawUser, success };
        })
        if (success) this.lib.mail.sendMail(rawUser.email, 'Ваш пароль успешно изменён', 'Ваш пароль успешно изменён', '<p>Ваш пароль успешно изменён</p>');

        const newPersonalUser = this.lib.userSelector.toPersonalJSON(newRawUser);

        return { user: newPersonalUser };
    }

}