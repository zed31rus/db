import app, { serveWebServer } from "#web/webServer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import envConfig from "#config/env.config";

export const workDir = path.dirname(fileURLToPath(import.meta.url));

serveWebServer(app, +envConfig.PORT);