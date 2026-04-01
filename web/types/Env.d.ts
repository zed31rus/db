import { PublicUser } from "#lib/selector/user.selector";

export type BaseEnv = {
    Variables: {
        user: PublicUser;
    }
};
