import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    verify(req: any, payload: any, done: any): Promise<void>;
}
export {};
