import { inject, injectable } from "tsyringe";
import { IAuthApplication } from "../../interface/application/auth/iauth.application";
import { SessionConfiguration } from "../../model/configuration/session.configuration";
import { BaseController } from "./base.controller";


@injectable()
export class AuthController extends BaseController {
    constructor(
        @inject("IAuthApplication")
        private authApplication: IAuthApplication,

        @inject("SessionConfiguration")
        private sessionConfiguration: SessionConfiguration
    ) {
     super();   
    }

    async signinByCredentials(req: any, res: any) {
        const token = await this.authApplication.signinByCredentials("maxcodefranco@gmail.com", "123456", "jdisfniwsdgf");
        res.cookie(this.sessionConfiguration.tokenStoreKey, token);
        res.json({
            status: "Max ok",
            token
        });
    }

    signout(req: any, res: any) {

    }

    refreshToken(req: any, res: any) {

    }

    verify(req: any, res: any) {

    }

    status(req: any, res: any) {
        if (!req.user) return res.json({status: "error: Invalid session"});
        
        res.json(this.respond(req.user));
    }

}