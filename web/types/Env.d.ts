import { PublicUser } from "#lib/selector/user.selector";

export type AuthEnv = {
    Variables: {
        user: PublicUser;
    }
};

export type AvatarEnv = {
    In: {
        form: {
            image: File | Blob;
        }

    }
}
