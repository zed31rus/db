import z from "zod";

const AccountSchemas = {
    emailVerificationConfirm: {
        Body: z.object({
            submitCode: z.string().length(6)
        })
    },
    emailVerificationSend: {

    },
    passwordChangeRequest: {

    },
    changePasswordConfirm: {
        Body: z.object({
            submitCode: z.string().length(6),
            password: z.string().min(8)
        })
    }
}

export default AccountSchemas;