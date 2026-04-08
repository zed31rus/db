import baseMiddleware from "#web/base/middleware.base";
import fileDto from "#web/dto/file.dto";
import z from "zod";
import fs from 'fs';
import { UserEnv } from "#web/types/Env.d";
import path from "path";

type AvatarInput = UserEnv & {
  out: { form: z.infer<typeof fileDto.avatarSchema> }
};
export default class FileMiddleware extends baseMiddleware {

    public withAvatar() { 
        return this.createFactory<AvatarInput>().createMiddleware<AvatarInput>( async (c, next) => {
            const { avatar } = c.req.valid('form');
            const user = c.get('user');

            const avatarArrayBuffer = await avatar.arrayBuffer()

            const fileName = `${user.uuid}${path.extname(avatar.name)}`;

        });
    }
};
