import z from "zod";

export default class CookieDto {
    both = z.object({
        refreshToken: z.string(),
        accessToken: z.string()
    })
    access = z.object({accessToken: z.string()})
    refresh = z.object({refreshToken: z.string()})
}
