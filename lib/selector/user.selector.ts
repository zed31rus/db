import { User } from "#prisma/prisma";

const PublicUserFields = ['uuid', 'nickname', 'avatar', 'createdAt'] as const;
const PersonalUserFields = [...PublicUserFields, 'login', 'email', 'allowLoginFind', 'allowEmailFind', 'emailConfirmed', 'isAdmin'] as const;

export type PublicUser = Pick<User, typeof PublicUserFields[number]>;
export type PersonalUser = Pick<User, typeof PersonalUserFields[number]>;

export default class UserSelector {

    private static select<T extends keyof User>(user: User, fields: readonly T[]): Pick<User, T> {
        return fields.reduce((acc, field) => {
            if (field in user) {
                acc[field] = user[field];
            }
            return acc;
        }, {} as Pick<User, T>);
    }

    static toPublicJSON(user: User): PublicUser {
        return this.select(user, PublicUserFields) as PublicUser;
    }

    static toPersonalJSON(user: User): PersonalUser {
        return this.select(user, PersonalUserFields) as PersonalUser;;
    }
}