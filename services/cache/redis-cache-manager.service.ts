import { injectable } from "tsyringe";
import { ICacheManagerService } from "../../interface/services/icache-manager.service";

@injectable()
export class RedisCacheManagerService implements ICacheManagerService {

    set<T>(key: string, data: T, expiresAt?: number): void {
        throw new Error("Method not implemented.");
    }
    get<T>(key: string): T {
        throw new Error("Method not implemented.");
    }

}