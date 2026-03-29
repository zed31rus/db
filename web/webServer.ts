import ApiError from '../errors/api.errors';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';

const app = new Hono()

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin || origin == 'zed31rus.ru' || origin.endsWith(".zed31rus.ru")) {
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

serve({
  fetch: app.fetch,
  port: 3100
}, (info) => {
  console.log(`http://localhost:${info.port}`)
})

export default app;
export type AppType = typeof app;