import { Prisma } from "#core/prisma/prisma.js";

export default class GetRefreshToken {
    orThrow = {
        async byHashedToken(client: Prisma.TransactionClient, hashedToken: string) {
            return await client.refreshToken.findUniqueOrThrow({
                where: { hashedToken },
                include: { user: true}
            });
        }
    }
 
    orNull = {
        async byHashedToken(client: Prisma.TransactionClient, hashedToken: string) {
            return await client.refreshToken.findUnique({
                where: { hashedToken },
                include: { user: true}
            });
        }
    }
}