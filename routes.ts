import express from 'express';
import cookieParser from 'cookie-parser';
import { injectable } from "tsyringe";
import { AuthController } from './api/controller/auth.controller';
import { SessionMiddleware } from './api/middleware/session.middleware';


export interface IRoutes {
    register(): any;
}

@injectable()
export class Routes implements IRoutes {

    constructor(
        private authController: AuthController,

        // Middlewares
        private sessionMiddleware: SessionMiddleware
    )
    { }

    register(): any {
        const app = express();
        app.use(cookieParser());
        app.use('/auth', this.auth());
        app.use('/profile', this.profile());

        app.use((err: any, req: any, res: any, next: any) => {
            res.json({status: 0, error: err});
        });
        return app;
    };

    auth(): any {
        const app = express();
        app.get('/signin', this.authController.signinByCredentials.bind(this.authController));
        app.get('/signout', this.authController.signout.bind(this.authController));
        app.get('/status', this.sessionMiddleware.isValidSession.bind(this.sessionMiddleware), this.authController.status.bind(this.authController));
        // app.use('/oauth');
        return app;
    }

    profile(): any {
        const app = express();
        // app.use('/me', )
        return app;
    }


}