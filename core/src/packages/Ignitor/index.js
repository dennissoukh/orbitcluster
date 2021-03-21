class Ignitor {
    constructor(appRoot) {
        this.appRoot = appRoot;
    }

    close() {
        return this.appRoot.close();
    }
}

module.exports = Ignitor;
