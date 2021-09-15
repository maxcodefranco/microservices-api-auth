import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { injectable } from 'tsyringe';
import IAuthApplication from '../interface/application/auth/iauth.application';
import { SessionPayloadModel } from '../model/auth/session-payload.model';


@injectable()
export default class AuthApplication implements IAuthApplication {

    constructor( )
    {

    }

    getTokenByCredentials(username: string, password: string, captcha: string): string {
        var payload: SessionPayloadModel = {
            id: 1,
            name: 'Max Franco'
        };
        const token = jwt.sign(payload, '123456', {
            expiresIn: 300
        });
        return token;
    }

}