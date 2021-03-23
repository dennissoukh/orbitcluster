class BaseCommand {
    async exec() {
        const hasRun = typeof this.run === 'function';
        let commandResult;

        try {
            if (typeof this.prepare === 'function') {

            }

            commandResult = await hasRun ? this.run(this.application) : this.handle(this.application);

            return commandResult;
        } catch (error) {
            throw new Error(error);
        }
    }

    setApplicationInstance = (application) => {
        this.application = application;
    }
}

module.exports = BaseCommand;
