import EnvConfig from "#root/config/env.config.js";
import ApiErrors from "#root/errors/api.errors.js";
import ConfigError from "#root/errors/config.errors.js";
import PrismaError from "#root/errors/prisma.errors.js";

export default abstract class Base {
    constructor(
        readonly config: {
                env: EnvConfig
            },
        readonly errors: {
            api: ApiErrors,
            config: ConfigError,
            prisma: PrismaError
        }
    ) {

    }
}

export type BaseArgs = ConstructorParameters<typeof Base>