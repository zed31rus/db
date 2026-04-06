export default class ConfigError extends Error {
    constructor(
        public status: number,
        public message: string,
        public errors: any[] = []
    ) {
        super(message);
        Object.setPrototypeOf(this, ConfigError.prototype);
    }

    static env(message = "not Authorized") {
        return new ConfigError(1, message);
    }

}