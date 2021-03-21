class BaseCommand {
    async exec() {
        const hasRun = typeof this.run === 'function';
        let commandResult;

        try {
            if (typeof this.prepare === 'function') {

            }
        } catch (error) {

        }
    }
}

exports.default = BaseCommand;
