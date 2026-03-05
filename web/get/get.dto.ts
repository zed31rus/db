import { z } from "zod";

const GetSchemas =  {

    me: {
        body: z.object({
            uuid: z.uuid()
        })
    }
    
}

export default GetSchemas