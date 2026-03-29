import z from "zod";

const CookieSchemas = {
    both: z.object({
        refreshToken: z.string().length(128),
        accessToken: z.string()
    }),
    access: z.object({accessToken: z.string()}),
    refresh: z.object({refreshToken: z.string().length(128)}),
}


export default CookieSchemas;