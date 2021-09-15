import { inject, injectable } from "tsyringe";
import { IAuthApplication } from "../../interface/application/auth/iauth.application";
import { SessionConfiguration } from "../../model/configuration/session.configuration";
import { BaseController } from "./base.controller";


@injectable()
export class AuthController extends BaseController {

    static headerToken: string = "x-auth-token";

    constructor(
        @inject("IAuthApplication")
        private authApplication: IAuthApplication,

        @inject("SessionConfiguration")
        private sessionConfiguration: SessionConfiguration
    ) {
     super();   
    }

    signinByCredentials(req: any, res: any) {
        const token = this.authApplication.signinByCredentials("maxcodefranco@gmail.com", "123456", "jdisfniwsdgf");
        res.cookie(this.sessionConfiguration.tokenCookieName, token);
        res.json({
            status: "Max ok",
            token
        });
    }

    verify(req: any, res: any) {

    }

    status(req: any, res: any) {
        if (!req.user) return res.json({status: "error: Invalid session"});
        
        res.json(this.respond(req.user));
    }

}