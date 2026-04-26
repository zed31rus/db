import EnvConfig from "#root/config/env.config.js";
import ApiError from "#root/errors/api.errors.js";
import ConfigError from "#root/errors/config.errors.js";
import PrismaError from "#root/errors/prisma.errors.js";

export default abstract class Base {
    constructor(
        readonly config: {
                env: EnvConfig
            },
        readonly errors: {
            api: ApiError,
            config: ConfigError,
            prisma: PrismaError
        }
    ) {

    }
}

export type BaseArgs = ConstructorParameters<typeof Base>