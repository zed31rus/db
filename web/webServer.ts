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

serve({
  fetch: app.fetch,
  port: 3100
}, (info) => {
  console.log(`http://localhost:${info.port}`)
})

export default app;
export type AppType = typeof app;