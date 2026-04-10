import z from "zod";

export default class OauthDto {
    discord= {
        callback: z.object({
        code: z.number(),
        provider: z.string()
    })
    }
}