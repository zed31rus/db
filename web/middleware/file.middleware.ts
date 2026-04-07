import baseMiddleware from "#web/base/middleware.base";
import fileDto from "#web/dto/file.dto";
import z from "zod";
import fs from 'fs';

type AvatarInput = {
  out: { form: z.infer<typeof fileDto.avatarSchema> }
};
export default class FileMiddleware extends baseMiddleware {

    public withAvatar() { 
        return this.createFactory().createMiddleware<AvatarInput>( async (c, next) => {
            const { avatar } = c.req.valid('form');

            
        });
    }
};
