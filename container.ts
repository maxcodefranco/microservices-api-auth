import { container } from "tsyringe";

import { IRoutes, Routes } from "./routes";

import { AuthApplication } from "./application/auth.application";
import { IAuthApplication } from "./interface/application/auth/iauth.application";

import { ICacheManagerService } from "./interface/services/icache-manager.service";
import { RedisCacheManagerService } from "./services/cache/redis-cache-manager.service";
import { SessionConfiguration } from "./model/configuration/session.configuration";
import { RedisConfiguration } from "./model/configuration/redis.configuration";

const { CONFIG_REDIS_HOST } = process.env;

const sessionConfig: SessionConfiguration = {
    tokenStoreKey: 'x-auth-token',
    sessionDurationInSeconds: 300
}

const redisConfig: RedisConfiguration = {
    host: CONFIG_REDIS_HOST || ""
}

container.registerInstance<SessionConfiguration>("SessionConfiguration", sessionConfig);
container.registerInstance<RedisConfiguration>("RedisConfiguration", redisConfig);

container.registerSingleton<IRoutes>("IRoutes", Routes);

//Application
container.registerSingleton<IAuthApplication>("IAuthApplication", AuthApplication);

//Services
container.registerSingleton<ICacheManagerService>("ICacheManagerService", RedisCacheManagerService);