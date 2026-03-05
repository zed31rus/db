import z from "zod";

const AccountSchemas = {

    confirmEmail: {
        body: z.object({
            submitCode: z.string().length(6),
        })
    }
}

export default AccountSchemas