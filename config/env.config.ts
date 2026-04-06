import ConfigError from "#errors/config.errors";

const DATABASE_URL = process.env.DATABASE_URL;
const SMTP_API_KEY = process.env.SMTP_API_KEY;
const PORT = process.env.PORT;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USER = process.env.SMTP_USER;
const JWT_SECRET = process.env.JWT_SECRET;
const SMTP_EMAIL = process.env.SMTP_EMAIL;

if (!DATABASE_URL) throw ConfigError.env('error while loading env variables');
if (!SMTP_API_KEY) throw ConfigError.env('error while loading env variables');
if (!PORT) throw ConfigError.env('error while loading env variables');
if (!SMTP_HOST) throw ConfigError.env('error while loading env variables');
if (!SMTP_USER) throw ConfigError.env('error while loading env variables');
if (!JWT_SECRET) throw ConfigError.env('error while loading env variables');
if (!SMTP_EMAIL) throw ConfigError.env('error while loading env variables');

export default {DATABASE_URL, SMTP_API_KEY, PORT, SMTP_HOST, SMTP_USER, SMTP_EMAIL, JWT_SECRET}
