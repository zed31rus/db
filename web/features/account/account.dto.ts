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
    },
    changeAvatar: {
        Form: z.object({
            avatar: z.instanceof(File)
                .refine((file) => file.size <= 20 * 1024 * 1024, 'Max size is 20MB')
                .refine((file) => file.type.startsWith('image/'), 'Only images are allowed')
        })
    }
}

export default AccountSchemas;