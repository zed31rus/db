import validate from "#web/middlewares/validate.middleware";
import { Router } from "express";
import AuthSchemas from "#web/dto/auth.dto";
import AuthControllers from "#web/controllers/auth.controller";
import errorMiddleware from "#web/middlewares/error.middleware";

const authRouter = Router();

authRouter.post('/register', validate(AuthSchemas.RegisterSchema), AuthControllers.register)
authRouter.post('/login', validate(AuthSchemas.LoginScchema), AuthControllers.login)
authRouter.post('/refresh', AuthControllers.refresh)

export default authRouter