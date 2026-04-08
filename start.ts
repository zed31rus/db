import app, { serveWebServer } from "#web/webServer";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const workDir = path.dirname(fileURLToPath(import.meta.url));

//serveWebServer(app, 3010);