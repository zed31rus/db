import ApiError from '#errors/api.errors';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import webContainers from '#web/containers/index.web.container'
import { createFactory } from 'hono/factory';
import { logger } from 'hono/logger';
import { UserEnv } from './types/Env.js';
import { PrismaClientKnownRequestError } from '#generated/prisma/internal/prismaNamespace.js';
import { PRISMA_ERRORS } from '#errors/prisma.errors';
import dotenv from 'dotenv';
import ConfigError from '#errors/config.errors';

dotenv.config();

const app = new Hono();

//app.use(
//  cors({
//    origin: (origin) => {
//      if (!origin || origin == 'https://zed31rus.ru' || origin.endsWith(".zed31rus.ru") || origin == "http://localhost:3000") {
//        return origin; 
//      }
//      return null;
//    },
//    credentials: true,
//  })
//);

app.use(cors({
  origin: ['zed31rus.ru',"http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}));

app.use(logger());

app.onError((err, c) => {
  if (err instanceof ApiError) {
    return c.json({
      message: err.message,
      errors: err.errors
    }, err.status as any);
  }

  if (err instanceof ConfigError) {
    console.error(err)
    process.exit(1)
  }

  if (err instanceof PrismaClientKnownRequestError) {
    console.log(err.meta)
    const code = err.code as keyof typeof PRISMA_ERRORS;
    const target = (err.meta?.target as string[])?.join(', ');

    return c.json({
      error: PRISMA_ERRORS[code]
    }, 400);
  }
  
  return c.json({ 
    message: "Internal Server Error",
  }, 500);
});

app.route('/auth', webContainers.modules.auth.router);
app.route('/account', webContainers.modules.account.router)
app.route('/me', webContainers.modules.me.router)
app.route('/user', webContainers.modules.users.router)

serve({
  fetch: app.fetch,
  port: 3100
}, (info) => {
  console.log(`http://localhost:${info.port}`)
})

export default app;
export type AppType = typeof app;