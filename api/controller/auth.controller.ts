import { inject, injectable } from "tsyringe";
import IAuthApplication from "../../interface/application/auth/iauth.application";
import { BaseController } from "./base.controller";


@injectable()
export class AuthController extends BaseController {

    static headerToken: string = "x-auth-token";

    constructor(
        @inject("IAuthApplication")
        private authApplication: IAuthApplication
    ) {
     super();   
    }

    signinByCredentials(req: any, res: any) {
        const token = this.authApplication.getTokenByCredentials("maxcodefranco@gmail.com", "123456", "jdisfniwsdgf");
        res.cookie(AuthController.headerToken, token);
        res.json({
            status: "Max ok",
            token
        });
    }

    status(req: any, res: any) {
        if (!req.user) return res.json({status: "error: Invalid session"});
        
        res.json(this.respond(req.user));
    }

}