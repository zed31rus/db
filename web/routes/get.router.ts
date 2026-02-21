import validate from "#web/middlewares/validate.middleware";
import { Router } from "express";
import GetSchemas from "#web/dto/get.dto";
import auth from "#web/middlewares/auth.middleware";
import GetControllers from "#web/controllers/get.controller";

const getRouter = Router();

getRouter.post('/me', validate(GetSchemas.meSchema), auth, GetControllers.me)
getRouter.post('/user', validate(GetSchemas.userSchema), auth, GetControllers.user)

export default getRouter;