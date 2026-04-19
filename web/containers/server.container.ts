import MainServer from "#web/servers/main.server.js";

export default class ServerContainer {
    constructor(
        public mainServer: MainServer
    ) {}
}