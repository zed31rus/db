import z from "zod";

const SocialSchemas = {
    
    user: { 
        get:{ 
            body: z.object({
                uuid: z.uuid()
            })
        }
    }
}

export default SocialSchemas