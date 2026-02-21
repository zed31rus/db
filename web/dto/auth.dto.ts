import { z } from "zod";

export default class AuthSchemas {

    static RegisterSchema = z.object({
        login: z.string().min(3).max(20),
        email: z.email(),
        password: z.string().min(8),
        nickname: z.string().min(2).max(30).nullable().optional(),
    });

    static LoginScchema = z.object({
        login: z.string().min(3),
        password: z.string().min(8)
    });
}