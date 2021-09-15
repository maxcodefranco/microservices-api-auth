import { inject, injectable } from "tsyringe";
import { IAuthApplication } from "../../interface/application/auth/iauth.application";
import { SessionConfiguration } from "../../model/configuration/session.configuration";

@injectable()
export class SessionMiddleware {

    constructor(
        @inject("IAuthApplication")
        private authApplication: IAuthApplication,

        @inject("SessionConfiguration")
        private sessionConfiguration: SessionConfiguration
    ) {

    }

    isValidSession(req: any, res: any, next: any): void {
        this.authApplication.verify(req.cookies[this.sessionConfiguration.tokenCookieName])
        .then(payload => {
            req.user = payload;
            next();
        })
        .catch(err => {
           next(err); 
        });
    }

}