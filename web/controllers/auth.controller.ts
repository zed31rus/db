import { Request, Response } from "express";
import AuthServices from "#services/auth.service";
import userSelector from "#lib/selector/user.selector";
import refreshToken from "#lib/refreshToken/refreshToken.lib";
import jwt from "#lib/jwt/jwt.lib";

export default class AuthControllers {

    static async register(req: Request, res: Response) {
        const { login, email, password, nickname} = req.body;

        const { hashedPassword, rawUser, rawOtp, hashedOtp, expiresAt, verificationRecord, mail } = await AuthServices.register(login, email, password, nickname);

        const user = userSelector.toPublicJSON(rawUser);
        res.json({ user, expiresAt })
    }

    static async login(req: Request, res: Response) {
        const {login, password} = req.body;

        const { rawUser, isPasswordCorrect, tokenRecord, userPayload, accessToken, rawRefreshToken } = await AuthServices.login(login, password);
        const user = userSelector.toPublicJSON(rawUser);

        res.cookie('RefreshToken', rawRefreshToken, {
            maxAge: refreshToken.getExpiresTime(),
            sameSite: 'none',
            httpOnly: true,
            path: '/'
        });
        res.cookie('accessToken', accessToken, {
            maxAge: jwt.getExpiresTime(),
            sameSite: 'none',
            httpOnly: true,
            path: '/'
        })

        res.json({user: user})
    }

    static async refresh(req: Request, res: Response) {
        const{ refreshToken } = req.cookies;

        const { accessToken } = await AuthServices.refresh(refreshToken)

        res.cookie('accessToken', accessToken, {
            maxAge: jwt.getExpiresTime(),
            sameSite: 'none',
            httpOnly: true,
            path: '/'
        })
                
    }
}