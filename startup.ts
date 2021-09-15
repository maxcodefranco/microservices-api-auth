import express from 'express';
import { inject, injectable } from 'tsyringe';
import { IRoutes } from './routes';

const { NODE_PORT } = process.env;

@injectable()
export class Startup {

    constructor(
        @inject("IRoutes")
        private routes: IRoutes
    ) {
        process.on('uncaughtException', err => {
            console.error('There was an uncaught error', err)
          })
    }

    registerRoutes(): any {
    }

    start(): void {
        const port = NODE_PORT || 3000;
        this.routes.register().listen(port, () => {
            console.log(`Aplicação iniciada na porta ${port}`);
        });
    }
}
