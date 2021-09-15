import express from 'express';
import { inject, injectable } from 'tsyringe';
import { IRoutes } from './routes';

const   env = process.env;

@injectable()
export class Startup {

    constructor(
        @inject("IRoutes")
        private routes: IRoutes
    ) {

    }

    registerRoutes(): any {
    }

    start(): void {
        const port = env.NODE_PORT || 3000;
        this.routes.register().listen(port, () => {
            console.log(`Aplicação iniciada na porta ${port}`);
        });
    }
}
