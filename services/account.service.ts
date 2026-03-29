import { prismaClient } from "#prisma/prisma";
import { PublicUser } from "#lib/selector/user.selector";
import '#types/account'
import BaseService from "#base/service.base";

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
        
        return { user: publicUser };
    }

}