import express from 'express';
import { SessionPayloadModel } from '../../../model/auth/session-payload.model';

export interface IAuthApplication {
    signinByCredentials(username: string, password: string, captcha: string): Promise<string>;
    verify(token: string): Promise<SessionPayloadModel>;
    logout(token: string): Promise<boolean>;
    refreshToken(token: string): Promise<string>;
}