const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const common = require('./lib/common');
const buildURL = require('./lib/url');

const SpaceTrack = class {
    constructor() {
        this.loggedIn = false;
        this.loginInProgress = false;
        this.cookieJar = new tough.CookieJar();
        this.credentials = {
            identity: process.env.SPACETRACK_USERNAME,
            password: process.env.SPACETRACK_PASSWORD,
        };

        axiosCookieJarSupport(axios);
    }

    delay = (ms) => new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })

    get = (options) => this.getRequest(options)
        .catch((err) => {
            if (err.statusCode && err.statusCode === 401) {
                this.loggedIn = false;
                return this.login.call(this).then(this.getRequest.bind(this, options));
            }

            throw err;
        })

    getRequest = (options) => {
        if (this.loginInProgress) {
            return this.delay(350).then(this.getRequest.bind(this, options));
        }

        if (!this.loggedIn) {
            return this.login.call(this).then(this.getRequest.bind(this, options));
        }

        return new Promise((resolve, reject) => {
            const url = buildURL(options);

            axios.get(url, { responseType: 'json', jar: this.cookieJar, withCredentials: true })
                .then((res) => resolve(res.data))
                .catch((err) => {
                    const error = new Error(`HTTP Error ${err.response.status}`);
                    return reject(error);
                });
        });
    }

    login = (credentials) => {
        if (this.loggedIn) {
            return true;
        }

        if (credentials && credentials.identity && credentials.password) {
            this.credentials = credentials;
        }

        if (!(this.credentials && this.credentials.identity && this.credentials.password)) {
            throw new Error('No credentials provided');
        }

        this.loginInProgress = true;

        const loginURL = common.baseURL + common.auth.login;

        return new Promise((resolve, reject) => {
            axios.post(loginURL, this.credentials, { responseType: 'json', jar: this.cookieJar, withCredentials: true })
                .then((res) => {
                    // Login is successful
                    if (res.status === 200 && res.data.Login !== 'Failed') {
                        this.loggedIn = true;
                        this.loginInProgress = false;
                        this.failedLoginAttempts = 0;
                        return resolve(true);
                    }

                    // Login is unsuccessful
                    this.loggedIn = false;
                    this.loginInProgress = false;

                    let err = new Error('Login Failed. Please try again.');

                    if (res.data && res.data.Login === 'Failed') {
                        err = new Error('Login Failed. Credentials are incorrect.');
                    }

                    return reject(err);
                })
                .catch((err) => {
                    this.loggedIn = false;
                    this.loginInProgress = false;

                    if (err.response && err.response.status) {
                        Error(`Login Failed. Received HTTP Error ${err.response.status} from Space-Track`);
                    } else {
                        Error('Login Failed. Please try again.');
                    }

                    return reject(err);
                });
        });
    }
};

module.exports = new SpaceTrack();
