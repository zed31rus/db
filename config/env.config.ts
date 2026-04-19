import ConfigError from "#errors/config.errors.js";
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const SMTP_API_KEY = process.env.SMTP_API_KEY;
const PORT = process.env.PORT;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USER = process.env.SMTP_USER;
const JWT_SECRET = process.env.JWT_SECRET;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const AVATARS_PUBLIC_DIR_PATH = process.env.AVATARS_PUBLIC_DIR_PATH;
const PUBLIC_DIR_PATH = process.env.PUBLIC_DIR_PATH;
const DISCORD_OAUTH_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_OAUTH_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

if (!DATABASE_URL) throw ConfigError.env('error while loading env Db url');
if (!SMTP_API_KEY) throw ConfigError.env('error while loading env smtp api key');
if (!PORT) throw ConfigError.env('error while loading env port');
if (!SMTP_HOST) throw ConfigError.env('error while loading env smtphost');
if (!SMTP_USER) throw ConfigError.env('error while loading env smtpuser');
if (!JWT_SECRET) throw ConfigError.env('error while loading env jwtsecret');
if (!SMTP_EMAIL) throw ConfigError.env('error while loading env smtp email');
if (!AVATARS_PUBLIC_DIR_PATH) throw ConfigError.env('error while loading env avatars public dir path');
if (!PUBLIC_DIR_PATH) throw ConfigError.env('error while loading env public dir path');
if (!DISCORD_OAUTH_CLIENT_ID) throw ConfigError.env('error while loading env discord oauth clientID');
if (!DISCORD_OAUTH_CLIENT_SECRET) throw ConfigError.env('error while loading env discord oauth client secret');

export default {DATABASE_URL, SMTP_API_KEY, PORT, SMTP_HOST, SMTP_USER, SMTP_EMAIL, JWT_SECRET, AVATARS_PUBLIC_DIR_PATH, PUBLIC_DIR_PATH, DISCORD_OAUTH_CLIENT_ID, DISCORD_OAUTH_CLIENT_SECRET};
