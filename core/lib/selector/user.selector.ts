import BaseLib from "#core/base/lib.base.js";
import { User } from "#core/prisma/prisma.js";
import { z } from "@hono/zod-openapi";

const PublicUserFields = ['uuid', 'nickname', 'avatar', 'createdAt'] as const;
const PersonalUserFields = [...PublicUserFields, 'login', 'email', 'allowLoginFind', 'allowEmailFind', 'emailConfirmed', 'isAdmin'] as const;

export type PublicUser = Pick<User, typeof PublicUserFields[number]>;
export type PersonalUser = Pick<User, typeof PersonalUserFields[number]>;

export const PublicUserSchema = z.object({
    uuid: z.string(),
    nickname: z.string(),
    avatar: z.string().nullable(),
    createdAt: z.date(),
});

export const PersonalUserSchema = PublicUserSchema.extend({
    login: z.string(),
    email: z.email(),
    allowLoginFind: z.boolean(),
    allowEmailFind: z.boolean(),
    emailConfirmed: z.boolean(),
    isAdmin: z.boolean(),
});

export default class UserSelector extends BaseLib {

    private select<T extends keyof User>(user: User, fields: readonly T[]): Pick<User, T> {
        return fields.reduce((acc, field) => {
            if (field in user) {
                acc[field] = user[field];
            }
            return acc;
        }, {} as Pick<User, T>);
    }

    toPublicJSON(user: User): PublicUser {
        return this.select(user, PublicUserFields) as PublicUser;
    }

    toPersonalJSON(user: User): PersonalUser {
        return this.select(user, PersonalUserFields) as PersonalUser;;
    }
}