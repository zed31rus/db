import baseMiddleware from "#web/base/middleware.base";
import z from "zod";
import { AvatarEnv } from "#web/types/Env.d";
import path from "path";
import configEnv from '#config/env.config';
import fs from 'fs';
import { workDir } from "../../start.js";
import { PublicUser } from "#lib/selector/user.selector";

export default class FileMiddleware extends baseMiddleware {

    public withAvatar<T extends AvatarEnv>(user: PublicUser) { 

        const dto = this.dto

        type J = T & {
          out: { form: z.infer<typeof dto.file.avatarSchema> }
        };

        return this.createFactory<J>().createMiddleware<J>( async (c, next) => {
            const { avatar } = c.req.valid('form');
            const { uuid } = user;

            const avatarArrayBuffer = await avatar.arrayBuffer();

            const fileName = `${uuid}${path.extname(avatar.name)}`;
            const publicDirPath = configEnv.PUBLIC_DIR_PATH;
            const avatarsPublicPathDir = configEnv.AVATARS_PUBLIC_DIR_PATH;
            const avatarAbsolutePath = path.join(workDir, publicDirPath, avatarsPublicPathDir, fileName);

            await fs.promises.writeFile(avatarAbsolutePath, Buffer.from(avatarArrayBuffer));

            c.set('avatarPath', fileName);
            await next();
        });
    }
};
