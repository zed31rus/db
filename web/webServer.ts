import ApiError from '#errors/api.errors';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import Containers from '#containers/index.container';
import WebContainers from '#web/containers/index.web.container';
import AuthModule from '#web/features/auth/auth.module';
import { createFactory } from 'hono/factory';
import AccountModule from '#web/features/account/account.module';
import MeModule from '#web/features/me/me.module';
import UsersModule from '#web/features/users/users.module';
import { logger } from 'hono/logger';
import { BaseEnv } from './types/Env.js';

const app = new Hono()
app.use(logger())
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin || origin == 'https://zed31rus.ru' || origin.endsWith(".zed31rus.ru") || origin == "http://localhost:3000") {
        return origin; 
      }
      return null;
    },
    credentials: true,
  })
);

app.onError((err, c) => {
    if (err instanceof ApiError) {
        return c.json({
            message: err.message,
            errors: err.errors
        }, err.status as any);
    }
    console.error(err);
    return c.json({ message: "Unexpected error"}, 500);
})

const factory = createFactory<BaseEnv>();

const authModule = new AuthModule(factory, Containers.serviceContainer, Containers.libContainer, WebContainers.webManagerContainer);
const accountModule = new AccountModule(factory, Containers.serviceContainer, Containers.libContainer, WebContainers.webManagerContainer);
const meModule = new MeModule(factory, Containers.serviceContainer, Containers.libContainer, WebContainers.webManagerContainer);
const usersModule = new UsersModule(factory, Containers.serviceContainer, Containers.libContainer, WebContainers.webManagerContainer);

app.route('/auth', authModule.router);
app.route('/account', accountModule.router)
app.route('/me', meModule.router)
app.route('/user', usersModule.router)

serve({
  fetch: app.fetch,
  port: 3100
}, (info) => {
  console.log(`http://localhost:${info.port}`)
})

export default app;
export type AppType = typeof app;