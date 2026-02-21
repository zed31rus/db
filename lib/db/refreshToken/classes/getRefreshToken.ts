import { Prisma } from "#prisma/prisma";

export default class GetRefreshToken {
    static async byHashedToken(client: Prisma.TransactionClient, hashedToken: string) {
        return await client.refreshToken.findUniqueOrThrow({
            where: { hashedToken },
            include: { user: true}
        });
    }
}