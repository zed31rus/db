import { z } from "zod";

export default class GetSchemas {

    static meSchema = z.object({
        uuid: z.uuid()
    })

    static userSchema = z.object({
        uuid: z.uuid()
    })

}