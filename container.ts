import { container } from "tsyringe";

import { IRoutes, Routes } from "./routes";

import { AuthApplication } from "./application/auth.application";
import { IAuthApplication } from "./interface/application/auth/iauth.application";

import { ICacheManagerService } from "./interface/services/icache-manager.service";
import { RedisCacheManagerService } from "./services/cache/redis-cache-manager.service";
import { SessionConfiguration } from "./model/configuration/session.configuration";


const sessionConfig: SessionConfiguration = {
    tokenCookieName: 'x-auth-token'
}

container.registerInstance<SessionConfiguration>("SessionConfiguration", sessionConfig);

container.registerSingleton<IRoutes>("IRoutes", Routes);

//Application
container.registerSingleton<IAuthApplication>("IAuthApplication", AuthApplication);

//Services
container.registerSingleton<ICacheManagerService>("ICacheManagerService", RedisCacheManagerService);