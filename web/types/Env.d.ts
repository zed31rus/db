import { PublicUser } from "#lib/selector/user.selector";

export type UserEnv = {
    Variables: {
        user: PublicUser;
    }
};

export type AvatarEnv = {
    Variables: {
        avatarPath: string
    }
}

