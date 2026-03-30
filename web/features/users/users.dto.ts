import z from "zod"

const UsersSchemas = {

    GetByUuid: {
        Body: z.object({
            uuid: z.uuid()
        })
    },
    GetByEmail: {
        Body: z.object({
            email: z.email()
        })
    },
    GetByLogin: {
        Body: z.object({
            login: z.string().min(3)
        })
    }
    
}

export default UsersSchemas