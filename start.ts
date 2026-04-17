import { fileURLToPath } from "node:url";
import path from "node:path";
import Servers from "#web/containers/index.web.container"

export const workDir = path.dirname(fileURLToPath(import.meta.url));

Servers.serverContainer.mainServer.configureWebServer();
Servers.serverContainer.mainServer.startWebServer(3100);
