import z from "zod"

const UsersSchemas = {

    Get: {
        Body: z.object({
            uuid: z.uuid()
        })
    },
    
}

export default UsersSchemas