import BaseLib from "#core/base/lib.base.js";
import DB from "#root/core/db/db.js";
import { z } from "@hono/zod-openapi";

const PublicUserFields = ['uuid', 'nickname', 'avatar', 'createdAt'] as const;
const PersonalUserFields = [...PublicUserFields, 'login', 'email', 'allowLoginFind', 'allowEmailFind', 'emailConfirmed', 'isAdmin'] as const;

export type PublicUser = Pick<DB.User, typeof PublicUserFields[number]>;
export type PersonalUser = Pick<DB.User, typeof PersonalUserFields[number]>;

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

    private select<T extends keyof DB.User>(user: DB.User, fields: readonly T[]): Pick<DB.User, T> {
        return fields.reduce((acc, field) => {
            if (field in user) {
                acc[field] = user[field];
            }
            return acc;
        }, {} as Pick<DB.User, T>);
    }

    toPublicJSON(user: DB.User): PublicUser {
        return this.select(user, PublicUserFields) as PublicUser;
    }

    toPersonalJSON(user: DB.User): PersonalUser {
        return this.select(user, PersonalUserFields) as PersonalUser;;
    }
}