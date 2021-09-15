export interface ICacheManagerService {
    set(key: string, data: string, expiresAt?: number): Promise<boolean>;
    get(key: string): Promise<string>;
    remove(key: string): Promise<boolean>;
}