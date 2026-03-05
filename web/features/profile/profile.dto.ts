import { z } from "zod";

const ProfileSchemas =  {

    me: {
        body: z.object({
            uuid: z.uuid()
        })
    }
    
}

export default ProfileSchemas