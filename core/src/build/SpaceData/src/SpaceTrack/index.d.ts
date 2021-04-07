import { Options } from "./contracts";
export declare class SpaceTrack {
    private loggedIn;
    private loginInProgress;
    private authCookie;
    private credentials;
    constructor();
    get(options: Options): Promise<any>;
    getRequest(options: Options): Promise<any>;
    login(): Promise<unknown>;
    logout(): Promise<unknown>;
    private sleep;
}
