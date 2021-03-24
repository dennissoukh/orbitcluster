class BaseCommand {
    async exec() {
        const hasRun = typeof this.run === 'function';
        let result;

        try {
            if (typeof this.prepare === 'function') {
                await this.prepare();
            }

            result = await hasRun ? this.run(this.application) : this.handle(this.application);

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    setApplicationInstance = (application) => {
        this.application = application;
    }
}

module.exports = BaseCommand;
