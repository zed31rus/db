import z from "zod"

export default class UsersDto {

    GetByUuid = {
        Body: z.object({
            uuid: z.uuid()
        })
    }

    GetByEmail = {
        Body: z.object({
            email: z.email()
        })
    }

    GetByLogin = {
        Body: z.object({
            login: z.string().min(3)
        })
    }
}