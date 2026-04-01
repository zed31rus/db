import z from "zod";

const CookieSchemas = {
    both: z.object({
        refreshToken: z.string(),
        accessToken: z.string()
    }),
    access: z.object({accessToken: z.string()}),
    refresh: z.object({refreshToken: z.string()}),
}


export default CookieSchemas;