import z from "zod";

export default class AccountDto {
    emailVerificationConfirm = {
        Body: z.object({
            submitCode: z.string().length(6)
        })
    }

    changePasswordConfirm = {
        Body: z.object({
            submitCode: z.string().length(6),
            password: z.string().min(8)
        })
    }
}
