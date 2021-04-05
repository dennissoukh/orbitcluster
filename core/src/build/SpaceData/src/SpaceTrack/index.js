"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceTrack = void 0;
const https_1 = __importDefault(require("https"));
const common_1 = require("./common");
const url_1 = require("./url");
class SpaceTrack {
    constructor() {
        this.loggedIn = false;
        this.loginInProgress = false;
        this.credentials = {
            identity: process.env.SPACETRACK_USERNAME,
            password: process.env.SPACETRACK_PASSWORD
        };
    }
    async get(options) {
        try {
            const request = await this.getRequest(options);
            return request;
        }
        catch (error) {
            if (error.statusCode && error.statusCode === 401) {
                this.loggedIn = false;
                return this.login.call(this).then(this.getRequest.bind(this, options));
            }
            throw error;
        }
    }
    async getRequest(options) {
        if (this.loginInProgress) {
            return this.sleep(350).then(this.getRequest.bind(this, options));
        }
        if (!this.loggedIn) {
            return this.login.call(this).then(this.getRequest.bind(this, options));
        }
        return new Promise((resolve, reject) => {
            const urlPath = url_1.buildURL(options);
            const reqOptions = {
                method: 'GET',
                host: common_1.common.baseURL,
                path: urlPath,
                headers: {
                    'Cookie': this.authCookie
                }
            };
            let chunks = [];
            const req = https_1.default.request(reqOptions, (res) => {
                res.on('data', d => {
                    chunks.push(d);
                });
                req.on('close', () => {
                    let data = Buffer.concat(chunks).toString();
                    data = JSON.parse(data);
                    return resolve(data);
                });
            });
            req.on('error', (error) => {
                const err = new Error(`HTTP Error ${error.response.status}`);
                return reject(err);
            });
            req.end();
        });
    }
    async login() {
        if (this.loggedIn) {
            return true;
        }
        if (!(this.credentials && this.credentials.identity && this.credentials.password)) {
            throw new Error('No credentials provided');
        }
        this.loginInProgress = true;
        const reqOptions = {
            hostname: common_1.common.baseURL,
            path: common_1.common.auth.login,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(this.credentials).length
            }
        };
        return new Promise((resolve, reject) => {
            const req = https_1.default.request(reqOptions, (res) => {
                res.on('data', (d) => {
                    // Login is successful
                    if (res.statusCode === 200 && d.Login !== 'Failed') {
                        if (res.headers['set-cookie']) {
                            this.authCookie = res.headers['set-cookie'][0];
                            this.loggedIn = true;
                            this.loginInProgress = false;
                        }
                        return resolve(true);
                    }
                    // Login is unsuccessful
                    this.loggedIn = false;
                    this.loginInProgress = false;
                    let err = new Error('Login Failed. Please try again.');
                    if (d && d.Login === 'Failed') {
                        err = new Error('Login Failed. Credentials are incorrect');
                    }
                    return reject(err);
                });
            });
            req.on('error', error => {
                this.loggedIn = false;
                this.loginInProgress = false;
                Error('Login failed. Please try again.');
                return reject(error);
            });
            req.write(JSON.stringify(this.credentials));
            req.end();
        });
    }
    async logout() {
        if (!this.loggedIn) {
            return;
        }
        const reqOptions = {
            hostname: common_1.common.baseURL,
            path: common_1.common.auth.logout,
            headers: {
                'Cookie': this.authCookie
            }
        };
        return new Promise((resolve, reject) => {
            const req = https_1.default.request(reqOptions, (res) => {
                // Logout is successful
                res.on('data', () => {
                    if (res.statusCode === 200) {
                        this.loggedIn = false;
                        this.authCookie = '';
                    }
                    return resolve(true);
                });
                let err = new Error('Logout Failed.');
                return reject(err);
            });
            req.on('error', error => {
                return reject(error);
            });
            req.end();
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.SpaceTrack = SpaceTrack;
