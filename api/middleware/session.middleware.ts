import { injectable } from "tsyringe";
import { AuthController } from "../controller/auth.controller";
import jwt from 'jsonwebtoken'
import { SessionPayloadModel } from "../../model/auth/session-payload.model";

@injectable()
export class SessionMiddleware {

    validSession(req: any, res: any, next: any): void {
        var token = req.cookies[AuthController.headerToken];
        if (!token) return next("Não autenticado");

        jwt.verify(token, '123456', (err: any, decoded: any) => {
            if (err) return next(err);
            req.user = decoded;
            next();
        });
    }

}