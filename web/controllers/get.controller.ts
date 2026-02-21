import { Request, Response } from "express";
import GetServices from "#services/get.service";
import userSelector from "#lib/selector/user.selector";
import { ApiError } from "#lib/errors/api.errors";

export default class GetControllers {

    static async me(req: Request, res: Response) {
        const { uuid } = req.body;

        const { rawUser } = await GetServices.me(uuid);
        const user = userSelector.toPublicJSON(rawUser);

        res.json({ user })
    }

    static async user(req: Request, res: Response) {
        const { uuid } = req.body;

        const { rawUser }  = await GetServices.user(uuid);
        const user = userSelector.toPublicJSON(rawUser);

        res.json({ user })
    }
    
}