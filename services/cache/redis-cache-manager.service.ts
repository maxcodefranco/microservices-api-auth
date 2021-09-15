import { inject, injectable } from "tsyringe";
import redis from 'redis'
import { ICacheManagerService } from "../../interface/services/icache-manager.service";
import { RedisConfiguration } from "../../model/configuration/redis.configuration";

@injectable()
export class RedisCacheManagerService implements ICacheManagerService {

    private client: redis.RedisClient;

    constructor(
        @inject("RedisConfiguration")
        private redisConfiguration: RedisConfiguration
    ){
        this.client = redis.createClient({
            host: redisConfiguration.host
        });
    }

    set(key: string, value: string, expiresAt?: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err) => {
                if (err) return reject(false);
                this.client.expire(key, expiresAt || 300);
                resolve(true);
            });
        });
    }

    get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) return reject(err);
                resolve(value as string);
            });
        });
    }
    
    remove(key: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            throw new Error("Method not implemented.");
        });
    }

}