import dotenv from 'dotenv';
import ApiError from "#root/errors/api.errors.js";
import ConfigError from "#root/errors/config.errors.js";
import PrismaError from "#root/errors/prisma.errors.js";

dotenv.config();

export default class EnvConfig {
    private getEnv(key: string) {
        const value = process.env[key];
        if (!value) {
            throw this.errors.config.env(`Missing environment variable: ${key}`);
        }
        return value;
    }

    DATABASE_URL = this.getEnv('DATABASE_URL');
    SMTP_API_KEY = this.getEnv('SMTP_API_KEY');
    PORT = this.getEnv('PORT');
    SMTP_HOST = this.getEnv('SMTP_HOST');
    SMTP_USER = this.getEnv('SMTP_USER');
    JWT_SECRET = this.getEnv('JWT_SECRET');
    SMTP_EMAIL = this.getEnv('SMTP_EMAIL');
    
    AVATARS_PUBLIC_DIR_PATH = this.getEnv('AVATARS_PUBLIC_DIR_PATH');
    PUBLIC_DIR_PATH = this.getEnv('PUBLIC_DIR_PATH');
    AMQP_URL = this.getEnv('AMQP_URL')
    DISCORD_OAUTH_CLIENT_ID = this.getEnv('DISCORD_CLIENT_ID');
    DISCORD_OAUTH_CLIENT_SECRET = this.getEnv('DISCORD_CLIENT_SECRET');
    DISCORD_REDIRECT_URL = this.getEnv('DISCORD_REDIRECT_URL');
    SMTP_PORT = this.getEnv('SMTP_PORT')

    constructor(        
        readonly errors: {
            api: ApiError,
            config: ConfigError,
            prisma: PrismaError
        }
    ) {}
}
