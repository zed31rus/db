import { serve } from '@hono/node-server'
import { logger } from 'hono/logger';
import BaseServer from '../base/server.base.js';

export default class MainServer extends BaseServer {
  configureWebServer() {

    this.server.use(this.wrapper.cors.cors());

    this.server.use(logger());

    this.server.onError(this.handler.error.errorHander);

    this.server.route('/auth', this.module.auth.router);
    this.server.route('/account', this.module.account.router)
    this.server.route('/me', this.module.me.router)
    this.server.route('/user', this.module.users.router)
    this.server.route('/oauth2/discord', this.module.oauth.discord.router)
  };

  startWebServer(port: number) {
    return serve({
      fetch: this.server.fetch,
      port: port
    }, (info) => {
      console.log(`http://localhost:${info.port}`)
    })
  }
}