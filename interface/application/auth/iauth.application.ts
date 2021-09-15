import express from 'express';
import { SessionPayloadModel } from '../../../model/auth/session-payload.model';

export default interface IAuthApplication {
    getTokenByCredentials(username: string, password: string, captcha: string): string;
}