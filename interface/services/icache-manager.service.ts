export interface ICacheManagerService {
    set<T>(key: string, data: T, expiresAt?: number): void;
    get<T>(key: string): T;
}