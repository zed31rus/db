import { z } from "zod";

const AuthSchemas = {

    Register: {
        Body: z.object({
            login: z.string().min(3).max(20),
            email: z.email(),
            password: z.string().min(8),
            nickname: z.string().min(2).max(30)
        }),
    },

    Login: {
        Body: z.object({
            login: z.string().min(3),
            password: z.string().min(8),
        }),
    },

    Refresh: {
    }
    
}

export default AuthSchemas