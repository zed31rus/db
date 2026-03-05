import AccountSchemas from "#web/account/account.dto";
import { AuthRequest } from "#web/types/user.d";
import { FastifyRequest } from "fastify";
import z from "zod";

type ConfirmEmailFastifyRequest = AuthRequest<{
    Body: z.infer<typeof AccountSchemas.confirmEmail.body>
}>