import { prismaClient } from "#prisma/prisma";
import { PublicUser } from "#lib/selector/user.selector";
import '#types/account'
import BaseService from "#base/service.base";
import ApiError from "#errors/api.errors";

export default class AccountService extends BaseService {

    async emailVerificationSend(user: PublicUser) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: publicUser };

        await this.manager.otp.createOtp(rawUser, OtpTypes.EmailConfirm);

        return { user: publicUser };
    }

    async emailVerificationConfirm(user: PublicUser, submitCode: string) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        if (rawUser.emailConfirmed) return { user: publicUser };

        await this.manager.otp.confirmOtp(rawUser, submitCode, OtpTypes.EmailConfirm);
        
        await this.repository.db.users.update.setEmailConfirmed(prismaClient, rawUser, true)
        
        return { user: publicUser };
    }

    async changePasswordRequest(user: PublicUser) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user)
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        await this.manager.otp.createOtp(rawUser, OtpTypes.passwordChange);

        return { user: publicUser };
    }

    async changePasswordConfirm(user: PublicUser, password: string, submitCode: string) {
        const rawUser = await this.repository.db.users.get.byPublicUser(prismaClient, user);
        const publicUser = this.lib.userSelector.toPublicJSON(rawUser);

        await this.manager.otp.confirmOtp(rawUser, submitCode, OtpTypes.passwordChange);

        const hashedPassword = await this.lib.hash.bcrypt.create(password, 10);
        await this.repository.db.users.update.setPasswordHash(prismaClient, rawUser, hashedPassword);

        return { user: publicUser }
    }

}