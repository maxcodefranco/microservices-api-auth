import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';
import { IAuthApplication } from '../interface/application/auth/iauth.application';
import { SessionPayloadModel } from '../model/auth/session-payload.model';
import { ICacheManagerService } from '../interface/services/icache-manager.service';
import { SessionConfiguration } from '../model/configuration/session.configuration';


@injectable()
export class AuthApplication implements IAuthApplication {

    constructor(
        @inject("ICacheManagerService")
        private cacheManager: ICacheManagerService,

        @inject("SessionConfiguration")
        private sessionConfiguration: SessionConfiguration
    )
    {

    }

    async signinByCredentials(username: string, password: string, captcha: string): Promise<string> {
        let token: string = "";
        try {

            var payload: SessionPayloadModel = {
                id: 1,
                name: 'Max Franco'
            };

            token = await this.assign(payload);

        }
        catch (err) {
        }
        
        return token;
    }

    verify(token: string): Promise<SessionPayloadModel> {
        return new Promise(async (resolve, reject) => {
            var cacheData = await this.cacheManager.get(`session_${token}`);
            console.log(cacheData, "Consultou", token)
            if (!cacheData) return reject("Not logged");

            if (!token) return reject("Token não informado");
            jwt.verify(token, '123456', (err: any, decoded: any) => {
                if (err) return reject(err);
                var payload = decoded as SessionPayloadModel;
                resolve(payload);
            });
        })
    }

    private async assign(payload: SessionPayloadModel): Promise<string> {
        const token = jwt.sign(payload, '123456', {
            expiresIn: this.sessionConfiguration.sessionDurationInSeconds
        });

        await this.cacheManager.set(`session_${token}`, "true", this.sessionConfiguration.sessionDurationInSeconds);
        console.log("Valor foi inserido", token);
        return token;
    }

    async logout(token: string): Promise<boolean> {
        return await this.cacheManager.remove(`session_${token}`);
    }
    refreshToken(token: string): Promise<string> {
        return new Promise((resolve, reject) => {
            throw new Error('Method not implemented.');
        });
    }

}