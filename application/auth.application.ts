import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';
import { IAuthApplication } from '../interface/application/auth/iauth.application';
import { SessionPayloadModel } from '../model/auth/session-payload.model';
import { ICacheManagerService } from '../interface/services/icache-manager.service';


@injectable()
export class AuthApplication implements IAuthApplication {

    constructor(
        @inject("ICacheManagerService")
        private cacheManager: ICacheManagerService
    )
    {

    }

    signinByCredentials(username: string, password: string, captcha: string): string {
        let token: string = "";
        try {

            var payload: SessionPayloadModel = {
                id: 1,
                name: 'Max Franco'
            };
            token = jwt.sign(payload, '123456', {
                expiresIn: 300
            });

            this.cacheManager.set<boolean>(`session_${token}`, true);

        }
        catch (err) {
         console.log("Erro");
         return "";
        }
        
        return token;
    }

    verify(token: string): Promise<SessionPayloadModel> {
        return new Promise((resolve, reject) => {
            if (!token) return reject("Token não informado");
            jwt.verify(token, '123456', (err: any, decoded: any) => {
                if (err) return reject(err);
                var payload = decoded as SessionPayloadModel;
                resolve(payload);
            });
        })
    }

}