export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    get(key: string): string;
    getInt(key: string): number;
    getBoolean(key: string): boolean;
}
