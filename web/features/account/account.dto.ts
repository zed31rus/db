import z from "zod";

const AccountSchemas = {
    emailVerificationConfirm: {
        Body: z.object({
            submitCode: z.string().length(6)
        })
    },
    emailVerificationSend: {

    }
}

export default AccountSchemas;